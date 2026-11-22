# ESLint dependency locking — status

ESLint and eslint-config-expo have been added to devDependencies and recorded in package-lock.json. The CI temporary install step has been removed. The lockfile is based on npm-generated dependency entries pushed by the user; only the root dependency classification was changed to match package.json.

## Validation

- Windows user-reported before dependency classification correction: npm ci, npx tsc --noEmit, npm run lint passed (2026-11-22).
- GitHub Actions after correction: check PR status; do not assume success until confirmed.
- npm audit reported three moderate findings; run npm audit and assess separately. Do not use npm audit fix --force without review.
- ESLint 9.39.5 emitted a deprecation warning; review upgrade compatibility separately.

## Done when

- package.json and lockfile both list ESLint tools in devDependencies.
- CI runs npm ci, typecheck, and lint without temporary npm install.
- PR quality checks pass. No UI or design files changed.
