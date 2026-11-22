# Natural Grammar — 作業履歴

## 2026-11-22 — ガラススライドの視認性を改善

- ユーザーの追加要望に合わせて、選択ピルの白い透過面を0.76へ、枠を2pxへ強調。背景バーは薄いミント色へ変更し、選択面との差を拡大。
- ぼかしを24px、影をティール系に強化。移動時間を280msから420msへ変更し、横に滑る様子を追いやすくした。
- 既存4タブのレイアウト、下部Safe Area、画面遷移は維持。iPhone Safariでの見え方はPreview実機確認が必要。

## 2026-11-22 — スライドする透明ガラスタブ（Web版）

- 参考画像の「半透明の角丸ピルが選択タブへ滑る」動きを、iPhone Safari向けの4タブに反映。
- React Navigationの既存タブ画面・遷移を維持し、WebのみカスタムTabBarを使用。280msのアニメーション、透過白・ぼかし・白い縁・控えめな影を設定。
- 既存の下部Safe Area余白、タブのアクセシビリティラベルと選択状態を維持し、Expo Routerの型付き遷移を利用。ネイティブのタブ表示は変更なし。
- 初回CIの型チェックで `BottomTabBarProps` に `navigation` がないTS2339が発生。Expo Routerの `router.navigate` を使う実装へ修正。
- 2回目CIでは型チェック成功後、React Hooks lintの `react-hooks/refs` が失敗。`useRef(...).current` のrender中参照を `useState(() => new Animated.Value(...))` に変更。
- PR品質チェックとPreviewを確認し、iPhone Safari実機でタブの位置・動き・ラベル切れを確認すること。自動マージは行わない。

## 2026-11-22 — URL共有用OGP対応

- Expo Routerの`src/app/+html.tsx`にOGP title/description/image/url、画像サイズ、X large image card、descriptionを追加。
- `scripts/generate-brand-assets.cjs`に1200×630のOGP画像生成処理を追加。Node標準機能のみで`public/og-image.png`を生成し、`postinstall`とWeb exportで配信。
- Production URLをOGPの正規URLと画像URLに設定。SNSキャッシュ・LINE等での表示はマージ後の実地確認が必要。
- 品質チェック・Preview成功後、ユーザーの明示承認に従いSquashマージする。

## 2026-11-22 — iPhoneホーム画面用Webアイコン

- `src/app/+html.tsx` にApple Touch Icon、Web App Manifest、iOSホーム画面向けメタタグを追加。Expo SDK 58の`useServerDocumentContext()`で生成されたhead/bodyノードを維持。
- `public/manifest.webmanifest` を追加。`standalone`、アプリ名、テーマ色、192px/512pxアイコンを設定。
- 既存のブランドPNG生成スクリプトに180px Apple Touch IconとWeb用192px/512pxアイコンを追加。`npm ci` のpostinstallで`public/`に生成しExpo Web Exportに含める。
- iPhone Safariの「ホーム画面に追加」で表示確認すること。既存ショートカットは再追加が必要な場合がある。
- PRのTypeScript/ESLint/Expo Hosting Preview成功後にユーザーの事前承認に従いSquashマージする。

## 2026-11-22 — コバルトブルーのブランド画像案を保存

- 生成したアイコンとスプラッシュ画面の原本を `docs/design/images/` に追加し、[設計資料](../design/first-step.md#ブランド画像案)から参照できるようにした。
- アプリは引き続き既存のブランド画像を `postinstall` で生成して使用する。
- `npm ci`、`npx tsc --noEmit`、`npm run lint` はローカルで成功。

## 2026-11-22 — iPhone Safari下部タブの切れを修正

- iPhone Safariで下部タブのアイコンとラベルが下端に切れるスクリーンショットを確認。
- `src/app/(tabs)/_layout.tsx` のタブバーに明示的な高さとSafe Area下部余白を追加。ラベル行高、アイコン領域、アイテム内余白も調整。
- Expo RouterのTabs設定に限定した最小修正。ホーム→解説→練習→まとめの画面構成は変更なし。
- CIのTypeScript/ESLint/Expo Hosting Preview、iPhone Safariでの実機再確認が必要。

## 2026-11-22 — Natural Grammar専用アイコンとスプラッシュ（PR #12へ追加）

- ティール・クリーム・ピーチ・ミント・ゴールドの配色で、本・若葉・星を組み合わせたオリジナルのブランドマークを追加。
- `scripts/generate-brand-assets.cjs` がNode.js標準機能のみでPNG（iOS/一般アイコン、Android adaptive icon、スプラッシュ、favicon）を生成。`npm ci` の `postinstall` で自動生成。
- `app.json` のアイコン・スプラッシュ・faviconを新しい画像パスへ設定。生成物は `.gitignore` で除外。
- 実機iOSのホームアイコン・起動スプラッシュは開発ビルド/配布ビルドでの検証が必要。Expo Goではアプリ固有アイコンの反映を確認できない。
- PRのTypeScript/ESLint/Expo Hosting Previewを再実行し、結果を確認する。

## 2026-11-22 — 下部4タブ（PR作成前）

- `docs/design/first-step.md` を根拠として、ホーム / 復習 / 成長記録 / 設定の4タブを追加。
- ホームを `(tabs)/index.tsx` に移し、ルートStackにタブナビゲーターを組み込み。既存の `/lesson`, `/practice`, `/summary` のURLは維持。
- 復習タブはサンプル3問へ再挑戦。成長記録はDay 4の完了状態を表示。設定ではテーマ案を説明し、未実装の切り替え操作は追加しない。
- ローカルlint / TypeScript / iPhone実機テストは未実施。PR #12の最初の品質チェックで `tabBarIcon` の `ColorValue` 型エラー4件が発生し、TabIconの引数型を修正。再実行結果を確認する。
- 詳細: [ホーム下部タブ](home-tabs.md)。

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
