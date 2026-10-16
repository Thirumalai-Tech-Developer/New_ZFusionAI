// Generates disposable local-only seed SQL, without real customer data.
const fs = require('node:fs');
const { createHash } = require('node:crypto');
const fixture = process.argv[2];
if (!fixture || !fixture.endsWith('trial-fixtures.sql')) throw new Error('Expected local fixture output path');
const users = [['a','trial',1000,17],['b','trial',1000,0],['paid','paid',10000,10],['exhausted','trial',1000,1000]];
const statements = ['DELETE FROM trial_claims;', "DELETE FROM users WHERE id LIKE 'trial-test-%';"];
for (const [suffix,plan,limit,used] of users) {
  const id = `trial-test-${suffix}`;
  const tokenHash = createHash('sha256').update(id).digest('hex');
  statements.push(`INSERT INTO users(id,email,plan,message_limit,messages_used) VALUES ('${id}','${id}@example.invalid','${plan}',${limit},${used});`);
  if (suffix === 'exhausted') statements.push(`UPDATE users SET trial_activated_at = 1 WHERE id = '${id}';`);
  statements.push(`INSERT INTO sessions(id,user_id,expires_at) VALUES ('${tokenHash}','${id}',${Date.now()+3600_000});`);
}
fs.writeFileSync(fixture, statements.join('\n'));
