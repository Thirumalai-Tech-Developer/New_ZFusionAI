# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

- `artifacts/zfusionai`: marketing site + dashboard (React 19, Vite, Tailwind). The build prerenders per-route SEO `<head>` tags, crawler fallback HTML and `sitemap.xml` (`seo-prerender.ts`, data in `src/seo/`).
- `artifacts/api-server`: Cloudflare Worker (Hono) serving `/api/*` and the built site as static assets.
- `lib/db`: Drizzle schema for Cloudflare D1 (SQLite) + SQL migrations in `lib/db/migrations`.

## Products (shared free trial: 1,000 messages per account)

- **Agentic AI**: agents with instructions and HTTPS webhook tools. REST `POST /api/v1/agents/:id/runs` and OpenAI-compatible `POST /api/v1/chat/completions` (`model: "agent:<id>"`).
- **Web App**: embeddable chat widget `public/widget.js` → `/api/public/agents/:publicId/*`.
- **WhatsApp**: Meta Cloud API connection, AI auto-replies via `/api/webhooks/whatsapp/:id`, `POST /api/v1/messages`.

Auth: Google/GitHub OAuth (PKCE + state) → DB-backed session cookie. API: `Authorization: Bearer zf_live_...` keys (SHA-256 hashed).

## Stack

- **Runtime**: Cloudflare Workers (Hono 4), Workers Rate Limiting bindings
- **Database**: Cloudflare D1 + Drizzle ORM
- **AI**: any OpenAI-compatible gateway (`AI_GATEWAY_URL`, `AI_GATEWAY_API_KEY`)
- **Validation**: Zod
- **Frontend**: React 19, Vite 7, TanStack Query, wouter

## Setup

```bash
pnpm install
cp artifacts/api-server/.env.example artifacts/api-server/.env   # set AI_GATEWAY_URL + AI_GATEWAY_API_KEY
pnpm --filter @workspace/api-server run db:migrate:local
pnpm --filter @workspace/zfusionai run build                    # the Worker serves dist/public
pnpm --filter @workspace/api-server run dev                     # http://localhost:8787
pnpm --filter @workspace/zfusionai run dev                      # http://localhost:5173 (proxies /api → 8787)
```

## Deploy (Cloudflare)

```bash
cd artifacts/api-server
pnpm exec wrangler d1 create zfusionai          # paste database_id into wrangler.toml
pnpm run db:migrate:remote
pnpm exec wrangler secret put AI_GATEWAY_URL    # also: AI_GATEWAY_API_KEY, SESSION_SECRET (32+ chars),
                                                #       GOOGLE_CLIENT_ID/SECRET, GITHUB_CLIENT_ID/SECRET
pnpm run deploy                                 # builds the site, then wrangler deploy
```

OAuth redirect URIs: `https://zfusionai.com/api/auth/google/callback` and `https://zfusionai.com/api/auth/github/callback`.

## Key Commands

- `pnpm run typecheck`: full typecheck across all packages
- `pnpm --filter @workspace/db run generate`: generate a D1 migration after schema changes
- `pnpm --filter @workspace/api-server run db:migrate:local` / `db:migrate:remote`: apply migrations
