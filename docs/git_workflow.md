# Git Workflow

## Branch Strategy
- Default branch: `main`
- Work only on story branches.
- Merge to `main` via pull request only.

## Branch Naming
Use one of these patterns:
- `story/<epic>.<story>-short-name`
- `chore/<short-name>`
- `fix/<short-name>`

Examples:
- `story/1.2-env-management`
- `story/3.1-scryfall-search-ui`

## Story Workflow
1. Sync main:
   - `git checkout main`
   - `git pull`
2. Create story branch from main:
   - `git checkout -b story/1.2-env-management`
3. Implement changes and commit in small logical commits.
4. Push branch to GitHub:
   - `git push -u origin story/1.2-env-management`
5. Open PR from story branch into `main`.
6. Merge only after checks pass.

## Commit Message Guidance
- `feat: ...` for new features
- `fix: ...` for bug fixes
- `chore: ...` for maintenance/tooling
- `docs: ...` for documentation

## Protection Rules (GitHub)
Recommended for `main`:
- Require pull request before merge
- Require status checks to pass
- Block force pushes
- Require linear history (optional)

## Required Branch Protection (GitHub)

Apply to branch: `main`

1. Go to: `Settings -> Branches -> Branch protection rules -> Add rule`
2. Branch name pattern: `main`
3. Enable:
   - Require a pull request before merging
   - Require status checks to pass before merging
   - Require branches to be up to date before merging
   - Block force pushes
4. Required status checks:
   - `CI / validate` (from `.github/workflows/ci.yml`)
   