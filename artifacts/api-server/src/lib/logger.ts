/** Structured JSON logs; visible in `wrangler tail` and Workers Logs. */
function log(level: "info" | "warn" | "error", data: Record<string, unknown>, msg: string) {
  const entry: Record<string, unknown> = { level, msg, ...data };
  if (data["err"] instanceof Error) {
    entry["err"] = { message: data["err"].message, stack: data["err"].stack };
  }
  console[level === "info" ? "log" : level](JSON.stringify(entry));
}

export const logger = {
  info: (data: Record<string, unknown>, msg: string) => log("info", data, msg),
  warn: (data: Record<string, unknown>, msg: string) => log("warn", data, msg),
  error: (data: Record<string, unknown>, msg: string) => log("error", data, msg),
};
