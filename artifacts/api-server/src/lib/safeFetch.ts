import { HttpError } from "./errors";

const IPV4_RE = /^\d{1,3}(\.\d{1,3}){3}$/;

/**
 * Validates that a user-supplied tool URL is public HTTPS on a hostname.
 * Workers can't reach private networks, and Cloudflare rejects direct-IP
 * fetches, but we still refuse obvious internal targets up front.
 */
export function assertToolUrl(raw: string): URL {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new HttpError(400, `Invalid tool URL: ${raw}`, "invalid_tool_url");
  }
  if (url.protocol !== "https:") {
    throw new HttpError(400, "Tool URLs must use https://", "invalid_tool_url");
  }
  if (url.username || url.password) {
    throw new HttpError(400, "Tool URLs must not contain credentials.", "invalid_tool_url");
  }
  const host = url.hostname;
  if (
    host === "localhost" ||
    host.endsWith(".localhost") ||
    host.endsWith(".local") ||
    host.endsWith(".internal") ||
    IPV4_RE.test(host) ||
    host.startsWith("[")
  ) {
    throw new HttpError(400, "Tool URLs must use a public hostname.", "invalid_tool_url");
  }
  return url;
}

/**
 * POSTs JSON to a user-defined tool endpoint (no redirects, 10s timeout) and
 * returns the response, truncated so it fits in the model context.
 */
export async function postToTool(
  rawUrl: string,
  body: string,
  headers: Record<string, string>,
): Promise<string> {
  const url = assertToolUrl(rawUrl);
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "User-Agent": "ZFusionAI-Agent/1.0", ...headers },
    body,
    redirect: "manual",
    signal: AbortSignal.timeout(10_000),
  });
  if (res.status >= 300 && res.status < 400) {
    throw new HttpError(502, "Tool endpoint redirects are not followed.", "tool_redirect");
  }
  const text = await res.text();
  return JSON.stringify({ status: res.status, body: text.slice(0, 4000) });
}
