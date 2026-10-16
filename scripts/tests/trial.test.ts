import { test } from "node:test";
import assert from "node:assert/strict";
import { trialPhone } from "../../artifacts/api-server/src/lib/trial";
import { currencyForCountry } from "../../artifacts/api-server/src/routes/locale";

test("phone variants resolve to one international identity", () => {
  assert.equal(trialPhone("+971 50 123 4567"), "+971501234567");
  assert.equal(trialPhone("00971 50 123 4567"), "+971501234567");
  assert.equal(trialPhone("+91 98765 43210"), "+919876543210");
  for (const invalid of ["0501234567", "+00012345", "+971501234567 ext. 2", "call +971501234567", "+97112"]) {
    assert.throws(() => trialPhone(invalid));
  }
});

test("country currency and safe fallback", () => {
  assert.equal(currencyForCountry("AE"), "AED");
  assert.equal(currencyForCountry("in"), "INR");
  assert.equal(currencyForCountry("US"), "USD");
  assert.equal(currencyForCountry("DE"), "EUR");
  assert.equal(currencyForCountry(undefined), "AED");
  assert.equal(currencyForCountry("XX"), "USD");
});

// Run against a separate local Wrangler D1 instance seeded by trial-fixtures.cjs.
// Never run these fixtures against a remote or production database.
const base = process.env.TRIAL_TEST_URL;
test("registration, saved workspace, session revocation and login isolation", { skip: !base }, async () => {
  const email = `trial-test-${crypto.randomUUID()}@example.invalid`;
  const password = "Local disposable test passphrase 79!";
  async function request(path: string, body?: unknown, cookie?: string) {
    return fetch(`${base}/api${path}`, {
      method: body ? "POST" : "GET",
      headers: { "Content-Type": "application/json", ...(cookie ? { Cookie: cookie } : {}) },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
  }
  const weak = await request("/auth/register", { name: "Test User", email, password: "short" });
  assert.equal(weak.status, 400);
  const signup = await request("/auth/register", { name: "Saved Workspace", email, password });
  assert.equal(signup.status, 201);
  const cookie = signup.headers.get("set-cookie")!.split(";")[0]!;
  assert.match(signup.headers.get("set-cookie")!, /HttpOnly/i);
  assert.match(signup.headers.get("cache-control")!, /no-store/);
  const created = await signup.json();
  assert.equal(created.user.name, "Saved Workspace");
  assert.equal(created.user.trialActivated, false);
  assert.ok(!JSON.stringify(created).includes("passwordHash"));
  assert.equal((await request("/auth/register", { name: "Intruder", email: email.toUpperCase(), password })).status, 409);
  assert.equal((await request("/auth/login", { email, password: "Wrong password value" })).status, 401);
  const activated = await request("/account/trial", { phone: "+44 7911 123456" }, cookie);
  assert.equal(activated.status, 200);
  const agent = await request("/account/agents", {
    name: "Persisted agent", instructions: "Answer customer support questions helpfully.", tools: [],
    widgetEnabled: false, widgetAllowedOrigins: [], widgetWelcome: "Hello", widgetColor: "#25D366",
  }, cookie);
  assert.equal(agent.status, 201);
  const saved = await agent.json();
  await request("/auth/logout", {}, cookie);
  assert.equal((await request("/auth/me", undefined, cookie)).status, 401);
  const login = await request("/auth/login", { email: email.toUpperCase(), password });
  assert.equal(login.status, 200);
  const session = login.headers.get("set-cookie")!.split(";")[0]!;
  const signedIn = await login.json();
  assert.equal(signedIn.user.id, created.user.id);
  assert.equal(signedIn.user.trialActivated, true);
  const agents = await (await request("/account/agents", undefined, session)).json();
  assert.equal(agents.agents[0].id, saved.agent.id);
  const other = await (await request("/account/agents", undefined, "zf_session=trial-test-paid")).json();
  assert.ok(!other.agents.some((a: { id: string }) => a.id === saved.agent.id));
  const crossOrigin = await fetch(`${base}/api/auth/login`, { method: "POST",
    headers: { Origin: "https://evil.example", "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
  assert.equal(crossOrigin.status, 403);
});
test("D1 trial activation is authenticated, unique, idempotent and preserves usage", { skip: !base }, async () => {
  async function request(path: string, token?: string, body?: unknown) {
    return fetch(`${base}/api${path}`, {
      method: body ? "POST" : "GET",
      headers: { ...(token ? { Cookie: `zf_session=${token}` } : {}), "Content-Type": "application/json" },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
  }
  assert.equal((await request("/account/trial", undefined, { phone: "+971501234567" })).status, 401);
  assert.equal((await request("/account/api-keys", "trial-test-a", { name: "blocked" })).status, 403);
  assert.equal((await request("/account/agents", "trial-test-a", {})).status, 403);
  assert.equal((await request("/account/trial", "trial-test-a", { phone: "0501234567" })).status, 400);
  const pending = await (await request("/auth/me", "trial-test-a")).json();
  assert.equal(pending.user.usage.limit, 0);
  assert.equal(pending.user.trialActivated, false);
  const attempts = await Promise.all([
    request("/account/trial", "trial-test-a", { phone: "+971 50 123 4567" }),
    request("/account/trial", "trial-test-b", { phone: "00971 50 123 4567" }),
  ]);
  assert.deepEqual(attempts.map((r) => r.status).sort(), [200, 409]);
  const winnerIndex = attempts.findIndex((r) => r.status === 200);
  const winner = winnerIndex === 0 ? "trial-test-a" : "trial-test-b";
  const loser = winnerIndex === 0 ? "trial-test-b" : "trial-test-a";
  const activated = await attempts[winnerIndex].json();
  assert.equal(activated.user.usage.limit, 1000);
  assert.equal(activated.user.trialActivated, true);
  assert.equal(activated.user.usage.used, winnerIndex === 0 ? 17 : 0);
  const retry = await (await request("/account/trial", winner, { phone: "+971501234567" })).json();
  assert.deepEqual(retry.user.usage, activated.user.usage);
  assert.equal((await request("/account/trial", loser, { phone: "+971501234567" })).status, 409);
  assert.equal((await request("/account/api-keys", winner, { name: "test key" })).status, 201);
  // A second phone must not let the winner reserve two identities.
  assert.equal((await request("/account/trial", winner, { phone: "+919876543210" })).status, 200);
  assert.equal((await request("/account/trial", loser, { phone: "+919876543210" })).status, 200);
  const paid = await (await request("/auth/me", "trial-test-paid")).json();
  assert.equal(paid.user.usage.limit, 10000);
  assert.equal(paid.user.trialActivated, true);
  const exhausted = await request("/account/ai/playground", "trial-test-exhausted", { messages: [{ role: "user", content: "hello" }] });
  assert.equal(exhausted.status, 402);
  const locale = await request("/locale");
  assert.match(locale.headers.get("cache-control") ?? "", /private.*no-store/);
});
