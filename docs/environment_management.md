# Environment Management

## Scope
- `apps/web`: public client config (`VITE_*` only)
- `apps/api`: server-only config and secrets

## Environment Groups
- Dev/Staging
- Production

## Rules
- Commit only `.env.example` files.
- Never commit `.env`, `.env.local`, or secret values.
- Keep secrets in managed secret stores for deployed environments.

## Required Files
- `/.env.example`
- `apps/web/.env.example`
- `apps/api/.env.example`

## Local Setup
1. Copy each `.env.example` to `.env.local` in the same folder.
2. Populate values.
3. Run `npm run typecheck` and `npm run lint`.

## Rotation
- Rotate compromised or stale secrets immediately.
- Track secret changes in deployment notes.