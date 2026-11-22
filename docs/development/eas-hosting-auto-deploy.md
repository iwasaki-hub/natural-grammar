# Expo Hosting 自動デプロイ（PR Preview / main Production）

- Expo project: [@masa-practice/natural-grammar](https://expo.dev/accounts/masa-practice/projects/natural-grammar)
- EAS project ID: `efa59e21-db3f-4725-aa0b-d713d08fc946`
- 初回手動Preview: https://natural-grammar--s4ju7efgcr.expo.app/
- Workflow: `.github/workflows/deploy-preview.yml`

## トリガーと配信先

| イベント | 実行内容 |
| --- | --- |
| 同一リポジトリ内のPR作成・更新・再オープン | 品質チェック → Web export → `eas deploy --non-interactive`（Preview） |
| `main` へのpush（PRマージ含む） | 品質チェック → Web export → `eas deploy --prod --non-interactive`（Production） |
| 手動 `workflow_dispatch` | 現状デプロイしない（品質チェック・exportのみ） |
| フォークからのPR | シークレット保護のためデプロイをスキップ |

各実行は `npm ci`、TypeScript、ESLint、Web exportが成功した場合だけデプロイする。PRごとに一意の固定プレビューURLを割り当てる設定ではなく、各実行のPreview URLをActionsログで確認する。既存のPreview設定はExpo側に保持される。PRプレビューは外部からアクセス可能なため、秘密情報や本番データを含めない。

## 初回設定と確認

1. GitHub ActionsのRepository secret `EXPO_TOKEN` にExpoアクセストークンを設定（設定済みとユーザー報告、実値は非表示）。
2. Expo HostingでProductionドメインの設定・公開状態を確認する。未設定の場合はExpo側の設定が必要な可能性がある。
3. PRを開いてPreviewデプロイが成功するか確認する。PRのコードをExpoトークン付きジョブで実行するため、信頼できる同一リポジトリのブランチだけを対象にする。
4. 承認後にマージし、Productionデプロイが成功したことと実際のProduction URLを確認する。マージするまでは本番配信しない。

## 注意事項

- Productionデプロイは実際の公開先を更新する。PRのマージ前に変更内容をレビューする。
- `main` への直接pushもProductionデプロイの対象になる。必要に応じてブランチ保護でPR必須にする。
- PreviewはPRごとに専用の独立環境を作成するわけではない。並行するPR間で共有Preview設定の影響を受ける可能性がある。
- Workflowの実行とProduction URLの到達性はマージ後に検証する。
- npm audit moderate 3件とESLint警告は別途調査する。強制更新しない。
