import { ScrollViewStyleReset, useServerDocumentContext } from "expo-router/html";
import type { PropsWithChildren } from "react";

// Web-only HTML wrapper; iOS Safari reads the touch icon from the document head.
export default function Root({ children }: PropsWithChildren) {
  const { headNodes, bodyNodes, htmlAttributes, bodyAttributes } = useServerDocumentContext();

  return (
    <html lang="ja" {...htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="theme-color" content="#126D65" />
        <meta name="apple-mobile-web-app-title" content="Natural Grammar" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        {/* Absolute image URLs are required by social link crawlers. */}
        <title>Natural Grammar｜やさしく学ぶ英文法</title>
        <meta name="description" content="1日約10分。30日間で英文法の基礎を楽しく学べるアプリ。" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Natural Grammar" />
        <meta property="og:locale" content="ja_JP" />
        <meta property="og:title" content="Natural Grammar｜やさしく学ぶ英文法" />
        <meta property="og:description" content="1日約10分。30日間で英文法の基礎を楽しく学べるアプリ。" />
        <meta property="og:url" content="https://natural-grammar.expo.app/" />
        <meta property="og:image" content="https://natural-grammar.expo.app/og-image.png" />
        <meta property="og:image:secure_url" content="https://natural-grammar.expo.app/og-image.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Natural Grammar — 本と若葉、星をあしらった英文法学習アプリ" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Natural Grammar｜やさしく学ぶ英文法" />
        <meta name="twitter:description" content="1日約10分。30日間で英文法の基礎を楽しく学べるアプリ。" />
        <meta name="twitter:image" content="https://natural-grammar.expo.app/og-image.png" />
        <ScrollViewStyleReset />
        {headNodes}
      </head>
      <body {...bodyAttributes}>
        {children}
        {bodyNodes}
      </body>
    </html>
  );
}
