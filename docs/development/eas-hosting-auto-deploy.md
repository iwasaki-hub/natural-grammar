# Expo Hosting 自動プレビューデプロイ

- Expo: [@masa-practice/natural-grammar](https://expo.dev/accounts/masa-practice/projects/natural-grammar)
- EAS project ID: `efa59e21-db3f-4725-aa0b-d713d08fc946`（`app.json` に保存済み）
- 初回手動プレビュー（2026-11-22）: https://natural-grammar--s4ju7efgcr.expo.app/
- Workflow: `.github/workflows/deploy-preview.yml`

## 初回だけ必要な設定

1. Expo ダッシュボードのアカウント設定から **Expo access token** を発行する。トークンはチャットやリポジトリに貼らない。
2. GitHub リポジトリの **Settings → Secrets and variables → Actions → New repository secret** に、名前 `EXPO_TOKEN` で保存する。
3. PRをレビュー・マージする（自動マージしない）。
4. GitHub Actions の **Deploy Expo Hosting preview** を確認する。トークン未設定なら失敗するので、設定後に再実行する。

## 動作

- `main` への push または手動実行で起動する。PR段階ではデプロイしない。
- `npm ci` → TypeScript → ESLint → Web export → `eas deploy --non-interactive`。
- `--prod` を付けないため本番デプロイは行わない。
- Expo Hosting の既存プレビュー用サブドメイン `natural-grammar` が設定済みであることを前提とする。設定されていない場合はローカルから `npx eas-cli@latest deploy --non-interactive --dev-domain natural-grammar` で初期設定する。
- 各実行の固有プレビューURLは Actions のデプロイログで確認する。URLは毎回変わる可能性がある。
- GitHubとExpoのリポジトリ連携は、このGitHub Actions方式には必須ではない。
- 公開プレビューなので、秘密情報・実ユーザーデータを含めない。

## 検証と注意

- GitHub Actionsでの初回実行・公開URLの到達性は、PRマージ後に確認する。
- `EXPO_TOKEN` はユーザーによる設定が必要。未設定では明示的に失敗する。
- `npm audit` のmoderate 3件とESLint警告は別途調査する。強制更新しない。
