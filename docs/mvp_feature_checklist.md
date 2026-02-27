# SpellPod MVP Feature Checklist

## How To Use This Checklist
- `Must Have` items are required before MVP release.
- `Nice To Have` items can ship after MVP without blocking release.
- `Out of MVP` items are explicitly deferred.

## Must Have

### Foundation and Delivery
- [ ] Monorepo/workspace structure for web + API.
- [ ] Environment config for Dev/Staging and Prod.
- [ ] CI pipeline running lint, typecheck, and tests.
- [ ] Basic deployment process documented and repeatable.

### Auth and Access
- [ ] Firebase Auth login/logout flow.
- [ ] Protected routes and backend token verification.
- [ ] User profile bootstrap on first login.

### Collection Management
- [ ] Add/update/remove cards in personal collection.
- [ ] Quantity tracking per collection entry.
- [ ] Optional print metadata: set, language, selected print/version.
- [ ] Collection summary total card count.
- [ ] In-use indicator when a card is used in any deck.

### Card Search and Filtering
- [ ] Global Scryfall search (default mode).
- [ ] Clear UI for Global vs Collection-only search context.
- [ ] Filters:
  - [ ] Type line
  - [ ] Mana cost
  - [ ] Oracle text
  - [ ] Power/Toughness
  - [ ] Color modes (exact/includes/commander identity)
  - [ ] Set
  - [ ] Rarity
  - [ ] Layout variants (split/flip/transform/MDFC/adventure/meld/leveler/saga)
  - [ ] Collection flags (only in collection/in use/not in use)

### Deck Builder (Commander)
- [ ] Create/edit Commander decks.
- [ ] Commander validation and warning system (non-blocking).
- [ ] Save intentionally illegal decks with visible warnings.
- [ ] Support Partner, Background, and Companion handling.
- [ ] Deck visibility controls with explicit state:
  - [ ] Public (default)
  - [ ] Private
  - [ ] Playgroup

### Playgroups
- [ ] Create and manage playgroups.
- [ ] Role model: owner/admin/player.
- [ ] Share decks with playgroup visibility rules enforced.
- [ ] Playgroup house rules storage/display.
- [ ] Basic match result tracking.

### AI Assistant (MVP Cut)
- [ ] AI is off by default and explicitly opt-in.
- [ ] Commander/theme/playstyle recommendation flow.
- [ ] Deck composition guidance (lands/ramp/removal/interaction/protection).
- [ ] Response validation against known card data (no fabricated cards surfaced).

### Security and Abuse Prevention
- [ ] Owner-only defaults for account and collection data.
- [ ] Explicit access controls for shared/public decks.
- [ ] Rate limiting on high-cost/sensitive endpoints.
- [ ] Basic bot mitigation.
- [ ] Audit logs for sensitive actions (delete, sharing changes, AI usage).
- [ ] Log retention policy at 60 days.

### Observability
- [ ] Error monitoring in web and API.
- [ ] Basic analytics events for key user actions.
- [ ] Health/operational visibility for API.

## Nice To Have (Post-MVP Candidate)
- [ ] Additional import/export formats beyond text/CSV/Moxfield.
- [ ] Saved filter presets.
- [ ] Reusable deck-role filter tags/presets.
- [ ] AI mode toggle for exploratory vs deterministic behavior.
- [ ] Enhanced playgroup analytics dashboards.
- [ ] Advanced moderation workflows and tooling.

## Out of MVP (Explicitly Deferred)
- [ ] Full compliance workflows (GDPR/export/legal lifecycle).
- [ ] Price tracking and collection valuation.
- [ ] Offline support.
- [ ] Real-time multiplayer game state service.
- [ ] In-browser video gameplay.
- [ ] Spectator mode and public matchmaking.

## MVP Exit Criteria
- [ ] All `Must Have` items complete.
- [ ] Critical and high-severity defects closed.
- [ ] CI green on default branch.
- [ ] Monitoring and alerting validated in live environment.
- [ ] Basic runbook exists for deploy, rollback, and incident response.
