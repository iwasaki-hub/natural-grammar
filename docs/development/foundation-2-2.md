# Foundation 2-2 — 解説画面と画面遷移

## 実装
- ホームの「レッスンを始める」を押せるCTAに変更し、Expo Routerで `/lesson` へ移動。
- Day 4「一般動詞の現在形」の短い日本語解説、日常例文、I drink / She drinksの比較を表示。
- 解説からホームに戻る操作を用意。iPhoneのSafe Area、スクロール、最低48ptの戻るタップ領域を考慮。
- 練習・まとめ・AIヒント・実際の進捗記録は対象外。サンプル教材であることを明記。

## 自動デプロイ確認
- PR作成・更新時: `Deploy Expo Hosting` がPreviewを生成する想定。
- mainマージ時: Productionへ自動デプロイする想定。**本PRは明示指示なしでマージしない。**
- 実行URLと成否はGitHub Actionsログで確認する。CIとiPhone実機検証を区別する。

## 検証
- [ ] GitHub Actions: TypeScript / ESLint
- [ ] GitHub Actions: Preview deploy
- [ ] iPhone Safariでホーム→解説→ホームを確認
- [ ] 375pt程度の幅、文字サイズ拡大、VoiceOverを確認
- [ ] マージ後のProduction deploy（承認後）
