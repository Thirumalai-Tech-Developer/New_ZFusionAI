Trial regression checks (local only)
====================================

From the repository root, prefix commands with `rtk proxy` in this workspace.

1. `pnpm --filter @workspace/zfusionai run build`
2. `pnpm --filter @workspace/api-server exec wrangler d1 migrations apply zfusionai --local --persist-to .wrangler/trial-tests`
3. `node scripts/tests/trial-fixtures.cjs artifacts/api-server/.wrangler/trial-fixtures.sql`
4. `pnpm --filter @workspace/api-server exec wrangler d1 execute zfusionai --local --persist-to .wrangler/trial-tests --file .wrangler/trial-fixtures.sql`
5. Start a separate terminal: `pnpm --filter @workspace/api-server exec wrangler dev --port 8790 --persist-to .wrangler/trial-tests --var ENVIRONMENT:development --var APP_URL:http://localhost:8790 --var SESSION_SECRET:local-test-only-not-for-production-1234567890`
6. PowerShell: `$env:TRIAL_TEST_URL="http://localhost:8790"; pnpm --filter @workspace/scripts exec tsx --test tests/trial.test.ts`

Fixtures contain disposable accounts and wipe the trial ledger in this isolated
local database. Never use them with `--remote` or another database persistence
directory. Unit checks run without TRIAL_TEST_URL; the HTTP integration test
then skips explicitly. No authentication bypass or test route exists in the app.

Email-and-password registration works with the existing SESSION_SECRET and D1.
Passwords use salted, peppered PBKDF2; keep SESSION_SECRET stable because it also
protects stored credentials and encrypted agent/WhatsApp secrets. Password and
phone ownership are not verified by email or SMS. Do not automatically merge
Google identities into password accounts by email alone. Self-service password
recovery is not enabled.

Optional Google production login needs a Web application OAuth client with callback
`https://zfusionai.com/api/auth/google/callback`. Store GOOGLE_CLIENT_ID and
GOOGLE_CLIENT_SECRET in Cloudflare Worker secrets (and the ignored local .env
for development). Basic login requests only openid, email and profile scopes.
The Google consent app must allow external customers, not just test users.

Phone checks validate and normalize international numbers and enforce a unique
D1 claim. They do not verify ownership; SMS OTP needs a separate provider.
