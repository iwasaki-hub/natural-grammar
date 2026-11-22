# Natural Grammar — 開発引き継ぎ

最終更新: 2026-11-22
基準: main（PR #3 マージ後）。新しい作業の開始前に GitHub の最新 main と PR を再確認すること。

## プロジェクトの目的

- 社会人の英文法初学者向け iPhone アプリ「Natural Grammar」。
- アメリカ英語の基礎を、1日約10分・30日間の順序で学ぶ。
- 初期デザインは [「今日の一歩」](../design/first-step.md)。画面モックは `docs/design/images/` に3枚。
- 技術構成: Expo SDK 58 / React Native / TypeScript / Expo Router。具体的なバージョンは `package.json` を正とする。

## 現在の実装状態

- `src/app/index.tsx` はExpoのプレースホルダー。デザイン済みのホーム画面は**まだ実装されていない**。
- `AGENTS.md` にExpoのバージョン別ドキュメント確認、Expo Router、検証の基本ルールがある。
- Foundation 1: PR #1で品質チェック基盤を導入。PR #2でESLint依存関係をロックファイルに記録し、CIの一時インストールを削除した。
- `.github/workflows/quality.yml` はPR、mainへのpush、手動実行で `npm ci` → `npx tsc --noEmit` → `npm run lint` を実行する。
- GitHub PR #2 のチェック `1/1` 成功はユーザーのスクリーンショットで確認した。iPhone実機検証とは別。

## 次に行うこと — Foundation 2

**「今日の一歩」ホーム画面を1PRで実装する。** 詳細な範囲・検証条件は [Foundation 2](foundation-2.md) を参照する。

1. `docs/design/first-step.md` と `docs/design/images/home.png` を確認し、実装範囲と変更しない画面を定義する。
2. コース進捗、今日のレッスン、直近の成長記録、主要CTAの表示をホーム画面に実装する。
3. まだ未実装の解説・練習・AIヒント等を動作するものと誤認させない。画面遷移の扱いを先に明示する。
4. Safe Area、狭いiPhone幅、文字拡大、押しやすさ、スクリーンリーダーのラベルを確認する。
5. featureブランチで最小差分を作成し、型チェック・Lint・必要なUI確認を実施。PRを作成し、マージは別途指示を待つ。

## 未確認・継続課題

- npm installのユーザーログで moderate 3件の監査結果が報告された。パッケージ・到達可能性・対処方法は未調査。`npm audit fix --force` は自動実行しない。
- ESLint 9.39.5にサポート終了警告が出た。Expo SDK 58との互換性を確認してから更新を検討する。
- Foundation 2のiPhone実機表示、文字拡大、VoiceOver、ネイティブビルドは未確認。
- VS Code/Codexのローカル設定、ブランチ保護ルールはGitHubのソースコードだけでは確認できない。

## 開発を再開する手順

1. GitHubで最新main・未マージPR・`AGENTS.md`・本書を確認する。
2. `docs/design/first-step.md` を読み、次の作業を1機能・1PRに絞る。
3. featureブランチを切り、最小限の変更を実装する。
4. `npm ci`、`npx tsc --noEmit`、`npm run lint` を実行する。実施できなければ未実施と記録する。
5. PRに変更点・検証結果・リスク・未確認事項を記載する。mainへの直接push・自動マージはしない。

## 参照先

- [作業履歴](WORKLOG.md)
- [Foundation 1](foundation-1.md)
- [Foundation 2](foundation-2.md)
- [ESLintの残課題](eslint-lock-followup.md)
- [初期デザイン](../design/first-step.md)
- [品質チェックWorkflow](../../.github/workflows/quality.yml)
- [AGENTS.md](../../AGENTS.md)
