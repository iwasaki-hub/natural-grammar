# Natural Grammar — 作業履歴

記録方針: 完了した事実、根拠、検証結果、未確認事項を区別する。詳細な技術判断は各Foundation文書を参照し、ここでは時系列の要点だけ記録する。

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
