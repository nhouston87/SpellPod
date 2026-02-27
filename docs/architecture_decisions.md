# SpellPod Architecture Decisions (ADR)

## ADR-001: System Architecture
- Status: Accepted
- Decision: Use a hybrid architecture with React frontend + Node/Express backend API + Firebase services.
- Context:
  - Need fast MVP delivery.
  - Need secure server-side orchestration for Scryfall, AI, and protected business logic.
- Consequences:
  - Slightly more setup than Firebase-only.
  - Stronger long-term flexibility for growth and non-Firebase workloads.

## ADR-002: Frontend Stack
- Status: Accepted
- Decision: Vite + React + TypeScript + Tailwind CSS.
- Context:
  - Team preference and rapid iteration requirements.
- Consequences:
  - Good developer velocity.
  - Need clear component and state conventions early.

## ADR-003: Authentication and Identity
- Status: Accepted
- Decision: Firebase Auth as identity provider and OAuth surface.
- Context:
  - Managed auth reduces complexity for MVP.
- Consequences:
  - Tight integration with Firebase ecosystem.
  - Backend must verify Firebase tokens for protected APIs.

## ADR-004: Data Persistence Boundaries
- Status: Accepted
- Decision:
  - Firebase data/storage for user-centric app data and assets.
  - Node/Express API handles domain logic and third-party integrations.
- Context:
  - Need simple managed storage while retaining backend control.
- Consequences:
  - Shared schema/contracts required between web and API.

## ADR-005: Card Data Strategy
- Status: Accepted
- Decision:
  - Scryfall remains canonical source of card truth.
  - Store only minimal card metadata needed for app behavior.
  - Use on-demand fetch initially.
- Context:
  - Avoid heavy storage and sync burden early.
- Consequences:
  - Must add caching/rate management if usage scales.
  - Potential future migration to local card dataset mirror if needed.

## ADR-006: Commander Validation Policy
- Status: Accepted
- Decision:
  - Implement legality checks and warnings.
  - Do not hard-block saving illegal decks.
- Context:
  - Different playgroups enforce house rules differently.
- Consequences:
  - Validation must be transparent and explain exceptions.
  - Ban-list source/versioning must be auditable.

## ADR-007: Deck Visibility and Sharing
- Status: Accepted
- Decision:
  - Deck visibility modes: Public (default), Private, Playgroup.
- Context:
  - Users want social sharing by default with privacy controls.
- Consequences:
  - Security rules and API authorization paths must handle visibility transitions safely.

## ADR-008: Playgroup Model
- Status: Accepted
- Decision:
  - Support playgroups in MVP with roles (owner/admin/player), deck sharing, and house rules.
- Context:
  - Collaboration and custom rules are core to target audience behavior.
- Consequences:
  - Requires permission matrix and role mutation audit logging.

## ADR-009: AI Assistant Operating Mode
- Status: Accepted
- Decision:
  - AI features are opt-in and disabled by default.
  - MVP emphasizes exploratory recommendations.
- Context:
  - User preference for exploratory ideation while reducing accidental AI dependency.
- Consequences:
  - Need clear UX consent and entry points.
  - Need output validation to reduce hallucinations.

## ADR-010: Security Baseline
- Status: Accepted
- Decision:
  - Owner-only defaults for private data.
  - Explicit share/public flags for deck access.
  - Rate limiting and bot mitigation in MVP.
  - Audit logs retained for 60 days.
- Context:
  - Early abuse protection and accountability are required.
- Consequences:
  - Add request throttling, abuse signals, and log lifecycle jobs.

## ADR-011: Environment Strategy
- Status: Accepted
- Decision:
  - Two Firebase projects: Dev/Staging and Prod.
- Context:
  - Balance environment separation with low operational overhead.
- Consequences:
  - Staging realism is lower than fully separate dev/stage.
  - Need strict deployment controls to protect prod.

## ADR-012: Secrets Management
- Status: Accepted
- Decision:
  - Centralize secrets in managed secret storage tied to runtime services.
  - Never commit secrets to repo.
- Context:
  - API keys and tokens required for integrations and AI.
- Consequences:
  - CI/CD must provision secrets per environment.
  - Local development requires explicit secrets bootstrap process.

## ADR-013: Observability and Quality
- Status: Accepted
- Decision:
  - Include automated tests, monitoring, and analytics from MVP start.
- Context:
  - Need quality guardrails despite small initial audience.
- Consequences:
  - Slightly slower initial delivery, lower long-term regression risk.

## ADR-014: Multiplayer Expansion Boundary
- Status: Accepted
- Decision:
  - Defer 8-player real-time contract design until after deck-builder MVP.
  - Treat multiplayer as a likely separate app/service boundary.
- Context:
  - Multiplayer adds major complexity and different scaling profile.
- Consequences:
  - Keep current models extensible but avoid premature over-design.

## Open Questions
- Moderation stack: tooling, workflow, and escalation model.
- Scryfall caching trigger thresholds and cache invalidation policy.
- AI provider selection, cost controls, and response validation pipeline.
- CI/CD platform choice aligned with self-hosted runtime.
- Hosting hardening for publicly exposed personal server.
