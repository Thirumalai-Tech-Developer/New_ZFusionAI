import { and, eq } from "drizzle-orm";
import { agentsTable, type Agent } from "@workspace/db";
import type { Deps } from "../types";
import { chatCompletion, type ChatMessage, type ToolDefinition } from "./ai";
import { decrypt, hmacSha256Hex } from "./crypto";
import { HttpError } from "./errors";
import { logger } from "./logger";
import { postToTool } from "./safeFetch";

const MAX_STEPS = 5;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export type AgentRunResult = {
  reply: string;
  steps: { tool: string; arguments: string; result: string }[];
};

export async function getAgent({ db }: Deps, userId: string, agentId: string): Promise<Agent> {
  if (!UUID_RE.test(agentId)) throw new HttpError(404, "Agent not found.", "agent_not_found");
  const [agent] = await db
    .select()
    .from(agentsTable)
    .where(and(eq(agentsTable.id, agentId), eq(agentsTable.userId, userId)))
    .limit(1);
  if (!agent) throw new HttpError(404, "Agent not found.", "agent_not_found");
  return agent;
}

function toolDefinitions(agent: Agent): ToolDefinition[] {
  return agent.tools.map((t) => ({
    type: "function",
    function: { name: t.name, description: t.description, parameters: t.parameters },
  }));
}

async function executeTool(deps: Deps, agent: Agent, name: string, args: string): Promise<string> {
  const tool = agent.tools.find((t) => t.name === name);
  if (!tool) return JSON.stringify({ error: `Unknown tool "${name}"` });

  let parsed: unknown;
  try {
    parsed = JSON.parse(args || "{}");
  } catch {
    return JSON.stringify({ error: "Arguments were not valid JSON." });
  }

  const body = JSON.stringify({ tool: name, arguments: parsed, agent_id: agent.id });
  const secret = await decrypt(deps.config.sessionSecret, agent.toolSecret);
  try {
    return await postToTool(tool.url, body, {
      "X-ZFusion-Signature": `sha256=${await hmacSha256Hex(secret, body)}`,
      "X-ZFusion-Agent": agent.id,
    });
  } catch (err) {
    logger.warn({ err, agentId: agent.id, tool: name }, "Agent tool call failed");
    return JSON.stringify({ error: err instanceof Error ? err.message : "Tool call failed" });
  }
}

/**
 * Runs the agent loop: the model may call webhook tools up to MAX_STEPS times
 * before producing a final answer. Billing (one message per run) is the
 * caller's responsibility.
 */
export async function runAgent(
  deps: Deps,
  agent: Agent,
  conversation: ChatMessage[],
  opts: { extraInstructions?: string } = {},
): Promise<AgentRunResult> {
  const messages: ChatMessage[] = [
    {
      role: "system",
      content: [agent.instructions, opts.extraInstructions].filter(Boolean).join("\n\n"),
    },
    ...conversation.filter((m) => m.role !== "system"),
  ];
  const tools = toolDefinitions(agent);
  const steps: AgentRunResult["steps"] = [];

  for (let step = 0; step < MAX_STEPS; step++) {
    const result = await chatCompletion(deps.config, messages, { tools, maxTokens: 600 });
    if (result.toolCalls.length === 0) {
      return { reply: result.content ?? "", steps };
    }

    messages.push({ role: "assistant", content: result.content, tool_calls: result.toolCalls });
    for (const call of result.toolCalls) {
      const output = await executeTool(deps, agent, call.function.name, call.function.arguments);
      steps.push({ tool: call.function.name, arguments: call.function.arguments, result: output });
      messages.push({ role: "tool", tool_call_id: call.id, content: output });
    }
  }

  // Out of steps: ask for a final answer without tools.
  const final = await chatCompletion(
    deps.config,
    [...messages, { role: "user", content: "Give your final answer now without calling tools." }],
    { maxTokens: 500 },
  );
  return { reply: final.content ?? "", steps };
}
