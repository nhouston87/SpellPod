# SpellPod Trello Epics and Stories (MVP)

## Board Lists (Suggested)
- Backlog
- Ready
- In Progress
- Blocked
- Review/QA
- Done
- Future

## Epic 1: Project Foundation
### Story 1.1: Initialize monorepo/workspace structure
- Acceptance Criteria:
  - Project has clear folders for web app, API, and docs.
  - TypeScript configs are consistent across packages.
  - Shared lint/format configs are defined.

### Story 1.2: Configure environment management
- Acceptance Criteria:
  - Separate config for Dev/Staging and Prod.
  - No secrets committed to repository.
  - Local `.env` templates documented.

### Story 1.3: CI pipeline baseline
- Acceptance Criteria:
  - PR pipeline runs install, lint, typecheck, and tests.
  - Main branch requires passing checks.

## Epic 2: Authentication and User Profiles
### Story 2.1: Firebase Auth integration
- Acceptance Criteria:
  - Users can sign in/out via configured auth providers.
  - Session persists across refresh.

### Story 2.2: User profile bootstrap
- Acceptance Criteria:
  - First login creates user profile record.
  - Profile data is owner-readable/writable only by default.

### Story 2.3: Protected route/API access
- Acceptance Criteria:
  - Unauthenticated users cannot access protected screens/APIs.
  - Backend verifies Firebase tokens.

## Epic 3: Card Search (Global and Collection)
### Story 3.1: Global Scryfall card search UI
- Acceptance Criteria:
  - Users can query Scryfall cards from search bar.
  - Results render key card details.

### Story 3.2: Search context toggle
- Acceptance Criteria:
  - UI clearly shows Global vs Collection-only search mode.
  - Default mode is Global.

### Story 3.3: Core filter system
- Acceptance Criteria:
  - Filters implemented: type line, mana cost, oracle text, power, toughness, colors modes, set, rarity, layout.
  - Collection filters implemented: only in collection, in use, not in use.

## Epic 4: Collection Management
### Story 4.1: Add/update/remove collection entries
- Acceptance Criteria:
  - User can add card quantities to collection.
  - User can edit and remove entries.

### Story 4.2: Print metadata support
- Acceptance Criteria:
  - Collection entry can store set, language, selected print/version.
  - Default print behavior is defined.

### Story 4.3: Import and export (v1)
- Acceptance Criteria:
  - Import supports text, CSV, and Moxfield formats.
  - Export supports text and CSV at minimum.
  - Invalid rows are reported with actionable errors.

### Story 4.4: Collection summary and in-use flags
- Acceptance Criteria:
  - Total card count shown.
  - Card entry shows whether used in at least one deck.

## Epic 5: Commander Deck Builder
### Story 5.1: Create and edit commander deck
- Acceptance Criteria:
  - User can create deck with commander and card list.
  - User can add/remove cards and save draft state.

### Story 5.2: Legality analysis with warnings
- Acceptance Criteria:
  - System checks Commander legality and surfaces warnings.
  - Illegal decks can still be saved intentionally.

### Story 5.3: Commander variants support
- Acceptance Criteria:
  - Partner, Background, and Companion handling is supported in model and UI.

### Story 5.4: Deck visibility controls
- Acceptance Criteria:
  - Visibility options are Public, Private, Playgroup.
  - Public is default on create.
  - Visibility state is clearly displayed in deck UI.

## Epic 6: Playgroups and Sharing
### Story 6.1: Create and manage playgroups
- Acceptance Criteria:
  - Users can create a playgroup and invite members.
  - Role model supports owner/admin/player.

### Story 6.2: Deck sharing to playgroup
- Acceptance Criteria:
  - Deck with Playgroup visibility is visible to permitted members only.
  - Access checks enforce membership and role rules.

### Story 6.3: House rules configuration
- Acceptance Criteria:
  - Playgroup owner/admin can define house rules.
  - House rules are visible in relevant deck/match contexts.

### Story 6.4: Basic match tracking
- Acceptance Criteria:
  - Playgroup can log match outcomes.
  - Basic deck performance metrics are visible.

## Epic 7: AI Assistant (Opt-In)
### Story 7.1: AI feature gate and consent
- Acceptance Criteria:
  - AI is disabled by default.
  - User can opt in from clear UI entry point.

### Story 7.2: Commander synergy recommendations
- Acceptance Criteria:
  - User provides commander/theme/playstyle inputs.
  - System returns ranked card suggestions with reasoning.

### Story 7.3: Deck composition guidance
- Acceptance Criteria:
  - AI suggests category balance targets (lands/ramp/removal/etc.).
  - Suggestions are tied to current deck composition.

### Story 7.4: AI safety and validation
- Acceptance Criteria:
  - Responses are validated against known card data (no fabricated cards).
  - AI request/response metadata is logged for audit.

## Epic 8: Security, Abuse Prevention, and Audit
### Story 8.1: Authorization matrix enforcement
- Acceptance Criteria:
  - Owner-only defaults for private account/collection data.
  - Deck visibility rules enforced consistently in API and DB rules.

### Story 8.2: API rate limiting and bot mitigation
- Acceptance Criteria:
  - Rate limits are enforced on sensitive/high-cost endpoints.
  - Basic bot mitigation controls are active.

### Story 8.3: Audit logging
- Acceptance Criteria:
  - Log sensitive actions (deletes, sharing changes, AI usage).
  - Retain logs for 60 days with automated expiration.

## Epic 9: Observability and Analytics
### Story 9.1: Application monitoring
- Acceptance Criteria:
  - Error tracking and basic uptime/health monitoring configured.

### Story 9.2: Product analytics baseline
- Acceptance Criteria:
  - Core events tracked (search, add card, create deck, share deck, AI use).
  - Event schema documented.

### Story 9.3: Operational dashboards
- Acceptance Criteria:
  - Basic dashboard for API errors, latency, and key product events exists.

## Epic 10: Deployment and Self-Hosted Operations
### Story 10.1: Deployment automation
- Acceptance Criteria:
  - One-command or pipeline-based deploy for web and API.
  - Environment-specific deploy targets documented.

### Story 10.2: Self-host hardening baseline
- Acceptance Criteria:
  - Reverse proxy/TLS configuration documented.
  - Backup and restore steps documented.
  - Firewall/port exposure checklist completed.

### Story 10.3: Secrets management setup
- Acceptance Criteria:
  - Runtime secrets loaded from managed secret store.
  - Rotation process documented.

## Future Epics (Post-MVP)
- Real-time multiplayer service (WebSockets)
- In-browser video play experience
- Spectator mode
- Public matchmaking
- Advanced moderation workflows
- Offline-capable mobile app

## Label Mapping: First 20 Priority Stories
Use this for fast bulk labeling in Trello. Every story includes `mvp` plus domain and implementation labels.

| Priority | Story | Labels |
|---|---|---|
| 1 | Story 1.1: Initialize monorepo/workspace structure | `mvp`, `devops`, `ci-cd`, `backend` |
| 2 | Story 1.2: Configure environment management | `mvp`, `devops`, `backend`, `firebase` |
| 3 | Story 1.3: CI pipeline baseline | `mvp`, `ci-cd`, `devops` |
| 4 | Story 2.1: Firebase Auth integration | `mvp`, `firebase`, `backend`, `frontend` |
| 5 | Story 2.2: User profile bootstrap | `mvp`, `firebase`, `data-model`, `backend` |
| 6 | Story 2.3: Protected route/API access | `mvp`, `security`, `api`, `frontend`, `backend` |
| 7 | Story 3.1: Global Scryfall card search UI | `mvp`, `search`, `frontend`, `api` |
| 8 | Story 3.2: Search context toggle | `mvp`, `search`, `frontend`, `collection` |
| 9 | Story 3.3: Core filter system | `mvp`, `search`, `collection`, `frontend`, `api` |
| 10 | Story 4.1: Add/update/remove collection entries | `mvp`, `collection`, `frontend`, `backend`, `data-model` |
| 11 | Story 4.2: Print metadata support | `mvp`, `collection`, `data-model`, `backend` |
| 12 | Story 4.3: Import and export (v1) | `mvp`, `collection`, `api`, `backend` |
| 13 | Story 4.4: Collection summary and in-use flags | `mvp`, `collection`, `deck-builder`, `frontend`, `backend` |
| 14 | Story 5.1: Create and edit commander deck | `mvp`, `deck-builder`, `frontend`, `backend`, `data-model` |
| 15 | Story 5.2: Legality analysis with warnings | `mvp`, `deck-builder`, `api`, `backend` |
| 16 | Story 5.3: Commander variants support | `mvp`, `deck-builder`, `data-model`, `backend`, `frontend` |
| 17 | Story 5.4: Deck visibility controls | `mvp`, `deck-builder`, `security`, `frontend`, `backend` |
| 18 | Story 6.1: Create and manage playgroups | `mvp`, `playgroup`, `frontend`, `backend`, `data-model` |
| 19 | Story 6.2: Deck sharing to playgroup | `mvp`, `playgroup`, `security`, `backend`, `api` |
| 20 | Story 6.3: House rules configuration | `mvp`, `playgroup`, `frontend`, `backend` |

## Optional Labels For Active Work States
- Use `blocked` only while actively blocked.
- Use `needs-decision` when product/technical direction is unresolved.

## Label Mapping: Remaining Stories (Complete Coverage)
Use this to finish labeling all current MVP stories in Trello.

| Priority | Story | Labels |
|---|---|---|
| 21 | Story 6.4: Basic match tracking | `mvp`, `playgroup`, `analytics`, `backend`, `frontend` |
| 22 | Story 7.1: AI feature gate and consent | `mvp`, `ai`, `frontend`, `backend`, `security` |
| 23 | Story 7.2: Commander synergy recommendations | `mvp`, `ai`, `deck-builder`, `api`, `backend` |
| 24 | Story 7.3: Deck composition guidance | `mvp`, `ai`, `deck-builder`, `backend`, `frontend` |
| 25 | Story 7.4: AI safety and validation | `mvp`, `ai`, `security`, `backend`, `api` |
| 26 | Story 8.1: Authorization matrix enforcement | `mvp`, `security`, `backend`, `firebase`, `api` |
| 27 | Story 8.2: API rate limiting and bot mitigation | `mvp`, `security`, `api`, `backend` |
| 28 | Story 8.3: Audit logging | `mvp`, `security`, `backend`, `observability` |
| 29 | Story 9.1: Application monitoring | `mvp`, `observability`, `devops`, `backend`, `frontend` |
| 30 | Story 9.2: Product analytics baseline | `mvp`, `analytics`, `frontend`, `backend` |
| 31 | Story 9.3: Operational dashboards | `mvp`, `observability`, `analytics`, `devops` |
| 32 | Story 10.1: Deployment automation | `mvp`, `ci-cd`, `devops`, `backend`, `frontend` |
| 33 | Story 10.2: Self-host hardening baseline | `mvp`, `security`, `devops`, `backend` |
| 34 | Story 10.3: Secrets management setup | `mvp`, `security`, `devops`, `backend`, `firebase` |

## Labeling Notes
- Keep `mvp` on all current stories listed above.
- Add `post-mvp` only when you intentionally move a card out of MVP scope.
- For cards awaiting unresolved architecture/product decisions, add `needs-decision` temporarily.
