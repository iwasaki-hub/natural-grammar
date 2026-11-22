# Run from the repository root on Windows PowerShell with npm registry access.
$ErrorActionPreference = "Stop"
if (-not (Test-Path "package.json") -or -not (Test-Path "package-lock.json")) {
  throw "Run this script from the natural-grammar repository root."
}
# Use explicit dev dependency installation: Expo's -- --dev argument did not
# place these packages in devDependencies on the first run.
npm install --save-dev eslint@^9 eslint-config-expo@~58.0.4
if ($LASTEXITCODE -ne 0) { throw "Dependency installation failed" }
npm ci
if ($LASTEXITCODE -ne 0) { throw "npm ci failed: inspect package-lock.json" }
npx tsc --noEmit
if ($LASTEXITCODE -ne 0) { throw "TypeScript check failed" }
npm run lint
if ($LASTEXITCODE -ne 0) { throw "ESLint check failed" }
Write-Host "Validation passed. Review and commit package.json and package-lock.json."
