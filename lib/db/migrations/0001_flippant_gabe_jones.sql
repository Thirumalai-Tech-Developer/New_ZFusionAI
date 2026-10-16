CREATE TABLE trial_claims (
  phone text PRIMARY KEY NOT NULL,
  user_id text NOT NULL,
  created_at integer DEFAULT (unixepoch() * 1000) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX trial_claims_user_id_unique ON trial_claims (user_id);
--> statement-breakpoint
ALTER TABLE users ADD trial_activated_at integer;
