# SpellPod Monorepo

## Workspace Layout
- `apps/web`: React frontend application.
- `apps/api`: Node/Express backend API.
- `packages/config`: Shared workspace-level config package space.
- `docs`: Product and planning documentation.

## Root Commands
- `npm run typecheck`
- `npm run lint`
- `npm run format:check`
- `npm run format:write`

## Environment Setup

This repo uses app-specific environment files. Do not commit real secrets.

### 1) Copy templates

From repo root:

```bash
cp .env.example .env.local
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env.local

Design docs live in:
docs/design/brand.md
docs/design/tokens.md