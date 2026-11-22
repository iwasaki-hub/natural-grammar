# Foundation 1 — 品質チェック基盤

## 目的

Expo SDK 58 / TypeScript プロジェクトの型チェックと ESLint を GitHub Actions で自動実行する。`docs/design/` のデザイン原案と画面モックは変更しない。

## 実行方法

```bash
npm ci
npx tsc --noEmit
npm install --no-save --package-lock=false eslint@^9 eslint-config-expo
npm run lint
```

`npm run lint` は `expo lint` を実行する。GitHub Actions は `main` への push、PR、手動実行でチェックする。

## 既知の制約と次の作業

- 現時点ではネットワーク制限で ESLint の依存関係をローカルで取得できず、lint の実行結果は未検証。
- CI では一時的に ESLint ツールを追加インストールしているため、バージョンが完全固定されていない。
- 通信可能な環境で `npx expo lint` に必要な `eslint` と `eslint-config-expo` を `devDependencies` に追加し、`package-lock.json` を更新してコミットする。その後 CI の一時インストール手順を削除し、`npm ci` のみで実行できる状態にする。
- CI の緑判定と iPhone Expo Go の実機動作は別々に確認する。
