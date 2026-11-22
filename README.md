# Natural Grammar

社会人の英文法初学者向けの英語学習アプリ。1日約10分、30日間でアメリカ英語の基礎を学ぶことを目指します。

## 現在できること
- Day 4「一般動詞の現在形」の解説
- 3問の練習、誤答時のヒントと再挑戦
- レッスンまとめと完了フロー
- ホームのサンプル進捗表示（3/30 → 4/30）
- 下部4タブ（ホーム、復習、成長記録、設定）

**現時点の学習進捗はメモリ内のみです。** ブラウザの再読み込みやアプリ再起動でリセットされます。認証、永続保存、AIヒントは未実装です。

## 開発環境
Expo SDK 58 / React Native / TypeScript / Expo Router

```bash
npm ci
npx expo start
```

品質チェック:

```bash
npx tsc --noEmit
npm run lint
```

## 画面構成

```text
src/
  app/
    _layout.tsx             # ルートStack・学習状態Provider
    (tabs)/
      _layout.tsx           # 下部タブ
      index.tsx             # ホーム (/)
      review.tsx            # 復習 (/review)
      achievements.tsx      # 成長記録 (/achievements)
      settings.tsx          # 設定 (/settings)
    +not-found.tsx          # 不明なURL
    (learning)/             # URLに含まれない学習画面グループ
      lesson.tsx            # /lesson
      practice.tsx          # /practice
      summary.tsx           # /summary
  components/
    TabPage.tsx             # 共通タブ画面レイアウト
  context/
    LessonProgressContext.tsx  # 起動中だけ保持する学習状態
```

Expo Routerの括弧付きグループはURLに影響しないため、既存の画面URLを維持しています。動的な日別ルートは複数日の教材が実装される段階で検討します。

## ドキュメント
- [UI設計「今日の一歩」](docs/design/first-step.md)
- [開発引き継ぎ](docs/development/HANDOFF.md)
- [作業履歴](docs/development/WORKLOG.md)
- [Expo Router notation](https://docs.expo.dev/router/basics/notation/)

## ブランド画像

`npm ci` / `npm install` 後の `postinstall` で `node scripts/generate-brand-assets.cjs` が実行され、`assets/branding/` にアプリアイコン（1024×1024）、スプラッシュ画像（1200×1200）、Android adaptive icon、favicon（64×64）のPNGを生成します。ソースは `scripts/generate-brand-assets.cjs` で、生成PNGはGit管理対象外です。Expo設定は `app.json` にあります。インストールスクリプトを無効にした場合は、Expo起動前に生成コマンドを手動実行してください。

Web版のiPhoneホーム画面用アイコンも自動生成します。`public/apple-touch-icon.png`（180×180）、`public/icon-192.png`、`public/icon-512.png` と `public/manifest.webmanifest` を使い、`src/app/+html.tsx` でSafari用メタタグを出力します。iPhone Safariでサイトを開き、共有 →「ホーム画面に追加」でアイコンを確認できます。古いショートカットは削除して追加し直してください。

## URL共有時のプレビュー（OGP）

`src/app/+html.tsx` のサーバー描画HTMLにOGP / X Cardメタタグを設定しています。`npm ci` 後の `postinstall` が `public/og-image.png`（1200×630）を生成します。Production URL `https://natural-grammar.expo.app/og-image.png` から画像が取得できることを確認してください。LINE、X、Slackなどのプレビュー表示は各サービスの取得・キャッシュ状況に依存します。画像の原本は生成スクリプトです。

## デプロイ
GitHub Pull RequestでExpo Hosting Preview、`main`へのマージでProductionデプロイ。マージは明示的な承認後に実施します。

## 今後の予定
学習進捗と誤答履歴の永続化、複数日カリキュラム、AIヒント、復習履歴一覧、外観切り替え。Natural Grammar専用アイコン・スプラッシュ・faviconは生成スクリプトで設定済み。
