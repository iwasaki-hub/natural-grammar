# Foundation 1 — 品質チェック基盤

## 目的

Expo SDK 58 / TypeScript プロジェクトの型チェックと ESLint を GitHub Actions で自動実行する。\`docs/design/\` のデザイン原案と画面モックは変更しない。

## 実行方法

\`\`\`bash
npm ci
npx tsc --noEmit
npm run lint
\`\`\`

\`npm run lint\` は `expo lint` を実行する。GitHub Actions は `main` への push、PR、手動実行でチェックする。

## ESLint依存関係

\`eslint\` と `eslint-config-expo\` を `devDependencies\` に追加し、`package-lock.json\` に解決済みバージョンを記録した。CIは追加インストールを行わず、`npm ci\` のみで依存関係を再現する。

## 検証記録

- Windows PowerShell実行結果（ユーザー報告、2026-11-22）: `npm ci\`、`npx tsc --noEmit\`、`npm run lint\` 成功。
- npm監査結果（ユーザー報告）: moderate 3件。原因・影響は未調査。`npm audit fix --force\` は未実行。
- ESLint 9.39.5の非推奨警告あり。SDK互換性と更新先は別途検討する。
- GitHub Actionsによる更新後のCI結果: 未確認。PRチェックで確認する。
- CIの成功とiPhone Expo Go実機動作は別々に確認する。
