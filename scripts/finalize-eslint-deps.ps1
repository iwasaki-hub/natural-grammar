# Run from the repository root on Windows PowerShell with npm registry access.
# Expo resolves SDK-compatible ESLint packages and updates package-lock.json.
$ErrorActionPreference = "Stop"
if (-not (Test-Path "package.json") -or -not (Test-Path "package-lock.json")) {
  throw "Run this script from the natural-grammar repository root."
}
npx expo install eslint eslint-config-expo "--" --dev
if ($LASTEXITCODE -ne 0) { throw "Expo dependency installation failed" }
npm ci
if ($LASTEXITCODE -ne 0) { throw "npm ci failed: inspect package-lock.json" }
npx tsc --noEmit
if ($LASTEXITCODE -ne 0) { throw "TypeScript check failed" }
npm run lint
if ($LASTEXITCODE -ne 0) { throw "ESLint check failed" }
Write-Host "Validation passed. Review and commit package.json and package-lock.json."
