import type { Config } from "./config";
import { HttpError } from "./errors";

export type ToolCall = {
  id: string;
  type: "function";
  function: { name: string; arguments: string };
};

export type ChatMessage =
  | { role: "system" | "user"; content: string }
  | { role: "assistant"; content: string | null; tool_calls?: ToolCall[] }
  | { role: "tool"; tool_call_id: string; content: string };

export type ToolDefinition = {
  type: "function";
  function: {
    name: string;
    description: string;
    parameters: Record<string, unknown>;
  };
};

export type CompletionResult = {
  content: string | null;
  toolCalls: ToolCall[];
  usage?: { prompt_tokens?: number; completion_tokens?: number; total_tokens?: number };
};

export function isAiConfigured(config: Config): boolean {
  return Boolean(config.ai.gatewayUrl && config.ai.apiKey);
}

/**
 * Calls an OpenAI-compatible `/chat/completions` endpoint on the configured
 * AI gateway. Supports OpenAI-style function calling via `tools`.
 */
export async function chatCompletion(
  config: Config,
  messages: ChatMessage[],
  opts: { maxTokens?: number; temperature?: number; tools?: ToolDefinition[] } = {},
): Promise<CompletionResult> {
  if (!isAiConfigured(config)) {
    throw new HttpError(503, "AI gateway is not configured.", "ai_not_configured");
  }

  const res = await fetch(`${config.ai.gatewayUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.ai.apiKey}`,
    },
    body: JSON.stringify({
      model: config.ai.model,
      messages,
      max_tokens: opts.maxTokens ?? 500,
      temperature: opts.temperature ?? 0.4,
      ...(opts.tools?.length ? { tools: opts.tools, tool_choice: "auto" } : {}),
    }),
    signal: AbortSignal.timeout(45_000),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new HttpError(
      502,
      `AI gateway error (${res.status}): ${detail.slice(0, 300)}`,
      "ai_gateway_error",
    );
  }

  const data = (await res.json()) as {
    choices?: {
      message?: { content?: string | null; tool_calls?: ToolCall[] };
    }[];
    usage?: CompletionResult["usage"];
  };
  const message = data.choices?.[0]?.message;
  const content = message?.content?.trim() || null;
  const toolCalls = message?.tool_calls ?? [];
  if (!content && toolCalls.length === 0) {
    throw new HttpError(502, "AI gateway returned an empty response.", "ai_empty_response");
  }
  return { content, toolCalls, usage: data.usage };
}

/** Plain text completion (no tools). */
export async function createChatCompletion(
  config: Config,
  messages: ChatMessage[],
  opts: { maxTokens?: number; temperature?: number } = {},
): Promise<string> {
  const { content } = await chatCompletion(config, messages, opts);
  if (!content) {
    throw new HttpError(502, "AI gateway returned an empty response.", "ai_empty_response");
  }
  return content;
}
