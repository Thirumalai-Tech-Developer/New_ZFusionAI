import { fromBase64Url, safeEqual, toBase64Url } from "./crypto";

const iterations = 100_000; // Workers Web Crypto's supported PBKDF2 ceiling.
const encoder = new TextEncoder();
async function derive(password: string, salt: Uint8Array, pepper: string) {
  // A database leak alone cannot be used to test password guesses: the pepper
  // lives in the existing Worker session secret, outside D1. Keep it stable.
  const pepperKey = await crypto.subtle.importKey("raw", encoder.encode(pepper), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const material = await crypto.subtle.sign("HMAC", pepperKey, encoder.encode(password));
  const key = await crypto.subtle.importKey("raw", material, "PBKDF2", false, ["deriveBits"]);
  return toBase64Url(new Uint8Array(await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", iterations, salt: salt as Uint8Array<ArrayBuffer> }, key, 256)));
}
export async function hashPassword(password: string, pepper: string) {
  const salt = crypto.getRandomValues(new Uint8Array(32));
  return `pbkdf2-sha256-v1$${toBase64Url(salt)}$${await derive(password, salt, pepper)}`;
}
export async function verifyPassword(password: string, stored: string | undefined, pepper: string) {
  const [version, salt, expected] = (stored ?? "").split("$");
  const valid = version === "pbkdf2-sha256-v1" && Boolean(salt && expected);
  // Do the expensive operation for unknown emails too, limiting timing leaks.
  const actual = await derive(password, valid ? fromBase64Url(salt!) : new Uint8Array(32), pepper);
  return valid && safeEqual(actual, expected!);
}
