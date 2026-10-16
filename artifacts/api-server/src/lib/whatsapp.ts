import { eq } from "drizzle-orm";
import { whatsappConnectionsTable, type WhatsappConnection } from "@workspace/db";
import type { Deps } from "../types";
import { decrypt } from "./crypto";
import { HttpError } from "./errors";

export type OutboundPayload =
  | { type: "text"; text: string }
  | {
      type: "template";
      template: { name: string; language: string; components?: unknown[] };
    };

/** Normalises a phone number to the digits-only E.164 form Meta expects. */
export function normalizePhone(raw: string): string {
  const digits = raw.replace(/[^\d]/g, "");
  if (digits.length < 8 || digits.length > 15) {
    throw new HttpError(
      400,
      "Phone number must be in international format, e.g. +971500000000.",
      "invalid_phone",
    );
  }
  return digits;
}

export async function getConnection(
  { db }: Deps,
  userId: string,
): Promise<WhatsappConnection | undefined> {
  const [row] = await db
    .select()
    .from(whatsappConnectionsTable)
    .where(eq(whatsappConnectionsTable.userId, userId))
    .limit(1);
  return row;
}

/** Sends a message through Meta's WhatsApp Cloud API and returns its message id. */
export async function sendWhatsAppMessage(
  { config }: Deps,
  conn: WhatsappConnection,
  to: string,
  payload: OutboundPayload,
): Promise<string> {
  const body =
    payload.type === "text"
      ? {
          messaging_product: "whatsapp",
          to,
          type: "text",
          text: { body: payload.text, preview_url: true },
        }
      : {
          messaging_product: "whatsapp",
          to,
          type: "template",
          template: {
            name: payload.template.name,
            language: { code: payload.template.language },
            ...(payload.template.components ? { components: payload.template.components } : {}),
          },
        };

  const res = await fetch(
    `https://graph.facebook.com/${config.whatsapp.graphVersion}/${encodeURIComponent(conn.phoneNumberId)}/messages`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await decrypt(config.sessionSecret, conn.accessTokenEnc)}`,
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(15_000),
    },
  );

  const data = (await res.json().catch(() => ({}))) as {
    messages?: { id: string }[];
    error?: { message?: string };
  };
  const id = data.messages?.[0]?.id;
  if (!res.ok || !id) {
    throw new HttpError(
      502,
      `WhatsApp Cloud API error: ${data.error?.message ?? res.statusText}`,
      "whatsapp_error",
    );
  }
  return id;
}
