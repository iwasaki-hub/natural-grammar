# Natural Grammar — 開発引き継ぎ

最終更新: 2026-11-22。最新のmain・PRと照合すること。

## 目的
- 社会人の英文法初学者向け、1日約10分・30日間のアメリカ英語基礎学習。
- Expo SDK 58 / React Native / TypeScript / Expo Router。
- 初期デザイン: [今日の一歩](../design/first-step.md)。

## 実装状態
- Foundation 1: TypeScript / ESLintのCI。
- Foundation 2-1: Day 4サンプルのホーム画面を実装（PR #4マージ）。
- Foundation 2-2: ホームから解説への画面遷移と現在形の解説画面を実装（PR #8マージ済み）。
- Foundation 2-3: 解説から練習への遷移と3問のサンプル練習、誤答時ヒント・再挑戦を実装（PR #9マージ済み）。
- Foundation 2-4: 3問正解後のまとめ、完了ボタン、ホームの3/30→4/30と成長記録の更新をfeatureブランチで実装。PRの検証・マージは別途確認。
- EAS Hosting: PR作成・更新でPreview、mainへのpushでProduction（PR #7マージ済み）。EXPO_TOKENはGitHub Repository secret。公開URLはActionsログで確認。

## 対象外・注意
- AIヒントは未実装。練習とまとめはDay 4サンプルのみ。
- 完了処理と進捗はReact Contextの一時状態のみ。再読み込みでリセット。永続化、認証、API連携なし。
- npm audit moderate 3件、ESLint 9.39.5警告は未調査。
- iPhoneの文字拡大・VoiceOver・ネイティブ動作は未確認。
- [Foundation 2-4の範囲・検証](foundation-2-4.md)、[作業履歴](WORKLOG.md)を参照。

## 再開手順
1. 最新main・未マージPR・AGENTS.mdを確認。
2. 1機能ずつfeatureブランチで変更。
3. npm ci、TypeScript、ESLint、GitHub Actionsの実結果を確認。
4. PR PreviewをiPhoneで確認し、マージは明示指示を待つ。
5. マージ後にProductionデプロイ結果を確認する。
