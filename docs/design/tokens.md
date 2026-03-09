# SpellPod Theme Tokens

## Token Usage Rules
- Use semantic tokens in UI code.
- Do not hardcode raw hex values in feature components.
- Light mode is baseline; dark mode must maintain equivalent readability.

## Light Theme Tokens (Default)
- `--bg`: `#f6f3ee`
- `--surface`: `#ffffff`
- `--surface-elevated`: `#fdfbf8`
- `--text`: `#1e1a16`
- `--text-muted`: `#5f554a`
- `--border`: `#d8cfc3`
- `--accent`: `#8c5a2b`
- `--accent-strong`: `#6f451f`
- `--success`: `#2b7a44`
- `--warning`: `#a86e1f`
- `--danger`: `#a33737`
- `--focus-ring`: `#3b82f6`

## Dark Theme Tokens
- `--bg`: `#14110f`
- `--surface`: `#1d1916`
- `--surface-elevated`: `#26211d`
- `--text`: `#f3eee7`
- `--text-muted`: `#c2b7aa`
- `--border`: `#3a322b`
- `--accent`: `#c08a4a`
- `--accent-strong`: `#d9a567`
- `--success`: `#58b578`
- `--warning`: `#d3a35a`
- `--danger`: `#d36b6b`
- `--focus-ring`: `#60a5fa`

## Typography Tokens
- `--font-display`: `Cinzel, Georgia, serif`
- `--font-body`: `Inter, Segoe UI, sans-serif`

## Scale Tokens
- Spacing: `4, 8, 12, 16, 24, 32, 40, 48`
- Radius: `6, 10, 14`
- Border width: `1`, emphasis `2`
- Content max width: `1200px`

## Interaction Rules
- Focus-visible ring uses `--focus-ring`.
- Status states use both color and text/icon.
- Shadows are minimal; rely on spacing and borders for structure.
