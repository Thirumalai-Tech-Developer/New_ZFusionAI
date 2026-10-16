// The API server is always mounted at the domain root, independent of BASE_PATH.
const API_BASE = "/api";

export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
  ) {
    super(message);
  }
}

export async function api<T>(
  path: string,
  init: Omit<RequestInit, "body"> & { body?: unknown } = {},
): Promise<T> {
  const { body, headers, ...rest } = init;
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    ...rest,
    headers: {
      ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new ApiError(
      res.status,
      data.error ?? "error",
      data.message ?? `Request failed (${res.status})`,
    );
  }
  return data as T;
}

/** Full-page navigation URL for starting an OAuth flow. */
export function oauthUrl(provider: "google" | "github", next = "/dashboard") {
  return `${API_BASE}/auth/${provider}?next=${encodeURIComponent(next)}`;
}

export type Usage = { used: number; limit: number; remaining: number };

export type PublicUser = {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  plan: string;
  usage: Usage;
  createdAt: string;
};

export type ApiKeySummary = {
  id: string;
  name: string;
  prefix: string;
  lastUsedAt: string | null;
  createdAt: string;
};

export type WhatsAppConnection = {
  id: string;
  phoneNumberId: string;
  businessAccountId: string | null;
  verifyToken: string;
  hasAppSecret: boolean;
  autoReplyEnabled: boolean;
  agentId: string | null;
  systemPrompt: string;
  webhookUrl: string;
  updatedAt: string;
};

export type AgentTool = {
  name: string;
  description: string;
  url: string;
  parameters: Record<string, unknown>;
};

export type Agent = {
  id: string;
  name: string;
  instructions: string;
  tools: AgentTool[];
  toolSecret: string;
  publicId: string;
  widgetEnabled: boolean;
  widgetAllowedOrigins: string[];
  widgetWelcome: string;
  widgetColor: string;
  embedSnippet: string;
  createdAt: string;
  updatedAt: string;
};

export type AgentInput = Pick<
  Agent,
  "name" | "instructions" | "tools" | "widgetEnabled" | "widgetAllowedOrigins" | "widgetWelcome" | "widgetColor"
>;

export type MessageLog = {
  id: string;
  channel: "whatsapp" | "agent" | "web";
  direction: "inbound" | "outbound";
  source: string;
  peer: string;
  body: string;
  status: "received" | "sent" | "failed";
  error: string | null;
  createdAt: string;
};
