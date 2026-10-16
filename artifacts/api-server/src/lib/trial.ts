import { parsePhoneNumberWithError } from "libphonenumber-js/max";
import { HttpError } from "./errors";

export function trialPhone(input: string): string {
  // Require an explicit country calling code; never guess using IP location.
  const value = input.trim().replace(/^00/, "+");
  if (!value.startsWith("+") || value.length > 60) {
    throw new HttpError(400, "Include your country code, for example +971 50 123 4567.", "invalid_phone");
  }
  try {
    const phone = parsePhoneNumberWithError(value, { extract: false });
    if (!phone.isValid() || phone.ext) throw new Error("invalid");
    return phone.number;
  } catch {
    throw new HttpError(400, "Enter a valid phone number with its country code.", "invalid_phone");
  }
}

// Shared with integration tests. Both statements run in one D1 transaction.
export const CLAIM_PHONE_SQL = `INSERT INTO trial_claims (phone, user_id)
  SELECT ?, id FROM users WHERE id = ? AND plan = 'trial' AND trial_activated_at IS NULL
  ON CONFLICT DO NOTHING`;
export const ACTIVATE_TRIAL_SQL = `UPDATE users SET
  message_limit = 1000, trial_activated_at = ?, updated_at = ?
  WHERE id = ? AND plan = 'trial' AND trial_activated_at IS NULL
  AND EXISTS (SELECT 1 FROM trial_claims WHERE phone = ? AND user_id = users.id)
  RETURNING id`;
