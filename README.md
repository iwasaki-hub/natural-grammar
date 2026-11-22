# Natural Grammar

社会人の英文法初学者向けの英語学習アプリ。1日約10分、30日間でアメリカ英語の基礎を学ぶことを目指します。

## 現在できること
- Day 4「一般動詞の現在形」の解説
- 3問の練習、誤答時のヒントと再挑戦
- レッスンまとめと完了フロー
- ホームのサンプル進捗表示（3/30 → 4/30）

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
    index.tsx               # ホーム (/)
    +not-found.tsx          # 不明なURL
    (learning)/             # URLに含まれない学習画面グループ
      lesson.tsx            # /lesson
      practice.tsx          # /practice
      summary.tsx           # /summary
  context/
    LessonProgressContext.tsx  # 起動中だけ保持する学習状態
```

Expo Routerの括弧付きグループはURLに影響しないため、既存の画面URLを維持しています。動的な日別ルートは複数日の教材が実装される段階で検討します。

## ドキュメント
- [UI設計「今日の一歩」](docs/design/first-step.md)
- [開発引き継ぎ](docs/development/HANDOFF.md)
- [作業履歴](docs/development/WORKLOG.md)
- [Expo Router notation](https://docs.expo.dev/router/basics/notation/)

## デプロイ
GitHub Pull RequestでExpo Hosting Preview、`main`へのマージでProductionデプロイ。マージは明示的な承認後に実施します。

## 今後の予定
学習進捗の永続化、複数日カリキュラム、AIヒント、復習機能。アプリ専用アイコン・faviconの制作も今後の課題です。
