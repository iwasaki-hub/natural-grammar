# Natural Grammar — 作業履歴

## 2026-11-22 — Expo Router構成と初期テンプレート整理

- 公式Expo Router notationに従い、学習3画面を `(learning)` ルートグループへ移動。URL `/lesson`, `/practice`, `/summary` は維持。
- `+not-found.tsx` を追加し、Expo標準の不明URL表示を置き換え。
- `README.md` の create-expo-app 初期文言をNatural Grammar向けに全面更新。
- `app.json` の初期スプラッシュ画像・初期アイコン参照を削除し、スプラッシュ背景をブランド色に変更。専用画像アセットは未制作。
- GitHub Actionsの品質チェック・Previewデプロイ結果はPR作成後に確認。iPhone実機未確認。

## 2026-11-22 — Foundation 2-4

- Day 4練習3問の正解後にまとめ画面へ遷移し、学習ポイントを表示。
- 完了ボタンでメモリ内のDay 4完了状態を更新。ホームのデモ進捗を3/30→4/30、成長記録を更新。
- 練習未完了時のまとめ画面ガード、二重完了防止を追加。再読み込みで状態がリセットされることを明示。
- ローカルnpm ci / TypeScript / ESLint / iPhone実機テストは未実施。PRのCI・Previewで別途確認する。
- 詳細: [Foundation 2-4](foundation-2-4.md)。

## 2026-11-22 — Foundation 2-3

- Day 4「一般動詞の現在形」の練習3問を追加。解説から遷移し、誤答時は固定ヒントを表示して同じ問題で再挑戦可能。
- 全問正答後の練習終了画面、もう一度練習、ホームへ戻る操作を追加。
- 進捗保存、まとめ、AIヒントは未実装。PRの品質チェックとPreviewデプロイは作成後に確認する。
- 詳細: [Foundation 2-3](foundation-2-3.md)。

## 2026-11-22 — Foundation 2-2

- ホームのレッスンCTAを有効化し、Expo Routerの /lesson に遷移する解説画面を追加。
- Day 4の一般動詞の現在形を短い例文と日本語で説明。練習・完了記録は未実装。
- PRのPreview自動デプロイと品質チェック、iPhoneでの画面確認はPR作成後に実施する。未実施を成功扱いしない。
- 詳細: [Foundation 2-2](foundation-2-2.md)。

## 2026-11-22 — PR Preview / main Productionへの変更

- GitHub ActionsをPR作成・更新時のPreviewと、main push時のProductionに分岐。品質チェックとWeb exportを両方の前提にする。
- フォークPRはEXPO_TOKENを渡さないようスキップ。手動実行ではデプロイしない。
- 実際のActions実行・Production URLは未検証。featureブランチでPRを作成し、マージは承認待ち。
- 詳細: [EAS Hosting自動デプロイ](eas-hosting-auto-deploy.md)。

## 2026-11-22 — Expo Hosting 自動デプロイ設定（PR作成前）

- main の `app.json` に EAS project ID `efa59e21-db3f-4725-aa0b-d713d08fc946` と owner `masa-practice` が反映済みであることを確認。
- `main` push / 手動起動のWebプレビュー自動デプロイWorkflowをfeatureブランチに追加。品質チェック・Web exportを通過してから `eas deploy --non-interactive` を実行する。
- 必要なGitHub Actions secret `EXPO_TOKEN` は未確認。ユーザー側設定が必要。
- GitHub Actions実行・実際の自動デプロイは未検証。PRを作成し、明示的なマージ指示を待つ。
- 手順: [Expo Hosting 自動デプロイ](eas-hosting-auto-deploy.md)。

記録方針: 完了した事実、根拠、検証結果、未確認事項を区別する。詳細な技術判断は各Foundation文書を参照し、ここでは時系列の要点だけ記録する。

## 2026-11-22 — EAS プロジェクト設定

- 変更: `app.json` に EAS のプロジェクト ID と所有者、Expo Router の Web 向け `asyncRoutes` 設定を追加。
- ローカル検証: `npx tsc --noEmit` と `npm run lint` は終了コード 0。PowerShell の npm / npx ランチャーはユーザー領域へのアクセス警告を出力した。

## 2026-11-22 — Foundation 1: ESLint依存関係の固定

- PR: [#2](https://github.com/iwasaki-hub/natural-grammar/pull/2)
- 結果: Squash Mergeでmainに反映。マージコミット `898f0051bb73570bccdc6d26b9bfbb7a3cf23eeb`。
- 変更: ESLintツールを `devDependencies` と `package-lock.json` に記録。CIの暫定インストールを削除。
- ローカル検証: ユーザー提供のPowerShellログで `npm ci`、`npx tsc --noEmit`、`npm run lint` が成功（GitHub側での最終依存分類調整より前）。
- CI検証: PR #2に `1/1` の成功表示をユーザーのスクリーンショットで確認。
- 残課題: `npm audit` moderate 3件の詳細未調査、ESLint 9.39.5のサポート終了警告。実機検証は未実施。
- 詳細: [Foundation 1](foundation-1.md)、[ESLint残課題](eslint-lock-followup.md)。

## Foundation 1 — 品質チェック基盤

- PR: [#1](https://github.com/iwasaki-hub/natural-grammar/pull/1)
- 結果: mainへマージ。GitHub Actionsで型チェックとLintを行う基盤を導入。
- 当時の制約: ESLint依存は暫定インストール。後続のPR #2で解消。
- 詳細: [Foundation 1](foundation-1.md)。

## 初期デザイン — 「今日の一歩」

- 成果物: [デザイン仕様](../design/first-step.md)、ホーム・誤答直後・AIヒントの静的モック3枚。
- 状態: 設計資料を保存済み。ホーム画面の実装は未着手。
- 次工程: Foundation 2でホーム画面を実装する。

## 2026-11-22 — 改善案②: 引き継ぎ文書整備

- 変更: `HANDOFF.md`、`WORKLOG.md` を新設し、`AGENTS.md` から参照できるようにする。
- 検証: GitHub上で文書の配置・リンク・内容の整合を確認。アプリコードは変更しない。
- PR: 本変更のPRで追跡。マージまではmainへ未反映。
