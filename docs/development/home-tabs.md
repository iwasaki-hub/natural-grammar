# ホーム下部タブの実装（2026-11-22）

## 設計根拠
[「今日の一歩」](../design/first-step.md)の「タブと初期版の方針」に合わせ、ホーム / 復習 / 成長記録 / 設定の4タブを追加した。

## 画面構成
- `src/app/(tabs)/_layout.tsx`: Expo Router JavaScript Tabs。下部に4項目表示。
- `src/app/(tabs)/index.tsx`: 従来のホーム（`/`）。レッスンを始める操作を維持。
- `src/app/(tabs)/review.tsx`: `/review`。Day 4のサンプル3問を最初から練習し直せる。
- `src/app/(tabs)/achievements.tsx`: `/achievements`。Day 4完了後に「毎日の習慣を英語で言える」を表示。
- `src/app/(tabs)/settings.tsx`: `/settings`。ポップ/シンプルのデザイン方針と実装状況を案内。
- `src/app/_layout.tsx`: ルートStackの中にTabsを配置し、画面間の学習状態をProviderで共有。
- `src/app/(learning)/`: 解説・練習・まとめ。従来のURL `/lesson`, `/practice`, `/summary` を維持。

## 制約
- 練習の誤答履歴は保存されていないため、復習タブは現時点で3問の再挑戦入口のみ。
- 成長記録はDay 4のメモリ内完了状態に対応。過去の記録は保存しない。
- 設定の外観切り替えは設計のみで、誤動作を避けるため切り替え操作は置いていない。
- 再読み込みやアプリ再起動で完了状態はリセットされる。

## テスト
- [ ] TypeScriptチェック
- [ ] ESLintチェック
- [ ] PR Previewデプロイ
- [ ] iPhone幅で下部4タブの表示・切り替え（SafariとExpo Go）
- [ ] `/`, `/review`, `/achievements`, `/settings` の直アクセス
- [ ] ホーム → 解説 → 練習 → まとめ → 完了 → ホーム
- [ ] Day 4完了後、成長記録の表示が更新されること
- [ ] 復習タブから練習に再挑戦できること
- [ ] iPhoneのSafe Area、長い文字、VoiceOverの確認

参考:
- https://docs.expo.dev/router/advanced/tabs/
- https://docs.expo.dev/router/basics/notation/
