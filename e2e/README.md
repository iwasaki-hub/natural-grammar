# Playwright E2E — Natural Grammar

Expo Web向けのブラウザE2Eテストです。ネイティブiOSアプリの実機テストではありません。iPhone 13設定はWebKitのモバイルエミュレーションです。

## ローカル実行

```bash
npm ci
npm install --prefix e2e
npx --prefix e2e playwright install chromium webkit
npm --prefix e2e test
```

`npm --prefix e2e run test:ui` でUIモードを起動できます。テストはローカルのExpo Webサーバーを自動起動します。

## CI

PR・main push時にChromiumとMobile Safari（WebKitエミュレーション）で実行し、失敗時はHTMLレポートとトレースをGitHub Actions Artifactsに14日間保存します。

依存関係は既存アプリの`package-lock.json`を変更しないよう`e2e/package.json`に分離しています。E2Eのlockfileは今後固定化する改善余地があります。テストレポートには画面内容が含まれる場合があるため、公開共有しないでください。
