# Copilot instructions for this repository

This repository is a Playwright automation project. The canonical project guidance lives in [AGENTS.md](../AGENTS.md).

## Preferred workflow

- Favor Playwright-native patterns and existing helper utilities in `tests/A_Utils/`.
- Keep changes narrow and consistent with the surrounding test files.
- Prefer the repo's JS conventions unless the task specifically targets the TypeScript examples.
- Use the smallest relevant test command to validate behavior.

## Main areas

- Browser tests: `tests/`
- Page objects: `tests/PageObjects/`
- Cucumber tests: `features/`
- Config: `playwright.config.ts` and related files

See [AGENTS.md](../AGENTS.md) for commands, conventions, and project structure.
