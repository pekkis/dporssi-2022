import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@/styles/global.css";
import Layout from "@/components/layout/Layout";
import { siteMetadata } from "@/services/metadata";
import Providers from "./Providers";

export const metadata: Metadata = siteMetadata;

export const viewport: Viewport = { themeColor: "#de0000" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fi">
      <head>
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
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      </head>
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
