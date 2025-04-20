import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="fi">
      <Head>
        <script
          defer
          data-domain="diktaattoriporssi.com"
          src="https://analytics.pekkis.eu/js/script.js"
        ></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,200;0,400;0,700;1,200;1,400;1,700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />

        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#de0000" />
        <meta name="msapplication-TileColor" content="#de0000" />
        <meta name="theme-color" content="#de0000" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
