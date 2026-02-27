# SpellPod Scope v1

## Purpose
Build a full-stack web application for MTG collection management and Commander deck building, using Scryfall as the primary card data source.

## Product Goals
- Help users manage personal MTG card collections.
- Enable Commander deck creation, validation, and iteration.
- Provide strong card discovery/filtering across global cards and owned cards.
- Support social deck sharing via playgroups.
- Introduce an optional AI assistant for deck ideation and refinement.

## In Scope (MVP)

### Users and Access
- Single-user collections and decks at launch.
- Deck visibility modes:
  - Public (default)
  - Private
  - Playgroup
- Visibility must be explicit and obvious in the deck UI.

### Card Data and Sync
- Scryfall is the canonical card data source.
- Always-online web app for MVP.
- On-demand card fetch for MVP.
- Minimal local persistence of card metadata for app features.
- Revisit cache/full dataset strategy after usage and rate-limit observations.

### Collection Management
- Track card quantities in user collection.
- Optional print metadata support:
  - Set
  - Language
  - Selected print/version
- No card pricing or valuation tracking in MVP.
- No condition tracking in MVP.
- Track whether cards are currently used in any deck.
- Show aggregate collection count.
- Import/export support targets:
  - Plain text
  - CSV
  - Moxfield format
  - Additional easy-to-support popular formats

### Commander Deck Builder
- Commander-focused deck builder.
- Legality checks as warnings/filters, not hard blockers.
- Allow intentionally illegal decks.
- Include support for Commander-related mechanics from start:
  - Partner
  - Background
  - Companion
- Store or fetch Commander ban list for validation workflows.

### Search and Filters
Required MVP filters:
- Type line
- Mana cost
- Oracle text
- Power
- Toughness
- Colors:
  - Exactly these colors
  - Includes these colors
  - Commander color identity
- Set
- Rarity
- Layout/type variants:
  - Split
  - Flip
  - Transform
  - MDFC
  - Adventure
  - Meld
  - Leveler
  - Saga
- Collection state filters:
  - Only in collection
  - In use
  - Not in use

Search behavior:
- Default to global search.
- Make global vs collection-only context very clear.

Out of scope for MVP in this area:
- Saved filter presets
- Reusable deck-role preset tags

### Playgroups
- Users can form playgroups.
- Deck sharing with playgroup members.
- Playgroup-level house rules.
- Role model in playgroup (owner/admin/player).
- Basic match tracking and deck performance analytics.

### AI Assistant
- AI is opt-in and off by default.
- User-accessible via clear UI entry points.
- Core MVP use cases:
  - Commander synergy suggestions
  - Theme/playstyle-aware recommendations
  - Deck composition guidance (lands, ramp, removal, interaction, protection, etc.)
- Emphasize exploratory suggestions.
- Future option for stricter/more deterministic mode.

### Security and Operations
- Owner-only defaults for account and collection data.
- Explicit sharing/public controls for decks and playgroups.
- Rate limiting and bot mitigation for MVP.
- Audit logs for sensitive actions:
  - Deletes
  - Sharing/permission changes
  - AI usage
- Log retention target: 60 days.

### Environments
- Two Firebase projects:
  - Dev/Staging
  - Production

### Quality Bar
- Automated testing required.
- Monitoring required.
- Analytics required.
- CI/CD pipeline required.

## Out of Scope (MVP)
- Full compliance program (GDPR/data portability/legal workflows).
- Price tracking and portfolio valuation.
- Offline mode.
- Multiplayer real-time game client.
- In-browser video gameplay.
- Spectator/public matchmaking systems.

## Post-MVP Direction
- SpellTable-like expansion with in-browser video.
- Real-time game state/counters via WebSockets.
- Potential separate React app/service for multiplayer features.
- Spectator mode and public matches in later phases.

## Target Audience and Delivery
- Initial audience: friends/invite-only alpha.
- No hard launch date; Trello-driven iterative delivery.
- Initial deployment: self-hosted on personal machine.
