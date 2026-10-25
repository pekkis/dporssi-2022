import type { Metadata } from "next";
import config from "@/services/config";

const cleanup = (str: string) => str.replace(/\*\*/g, "");

const fullTitle = (title: string) => `${title} - ${config.title}`;

// Site-wide metadata: the root layout's defaults.
export const siteMetadata: Metadata = {
  metadataBase: new URL(config.siteUrl),
  title: { default: config.title, template: `%s - ${config.title}` },
  description: config.description,
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" }
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#de0000" }
    ]
  },
  manifest: "/site.webmanifest",
  other: { "msapplication-TileColor": "#de0000" }
};

type PageMeta = {
  title: string;
  description?: string;
  image?: string;
  /** The page's path, for og:url. */
  path: string;
  article?: boolean;
};

// A page's title, description and share tags (what the old SEO component rendered).
export const pageMetadata = ({
  title,
  description,
  image,
  path,
  article
}: PageMeta): Metadata => {
  const desc = description ? cleanup(description) : config.description;
  const img = image ?? `${config.siteUrl}${config.image}`;
  return {
    // Absolute: the layout's template doesn't apply to the front page (same segment).
    title: { absolute: fullTitle(title) },
    description: desc,
    openGraph: {
      title: fullTitle(title),
      description: desc,
      images: [img],
      url: path,
      ...(article && { type: "article" })
    },
    twitter: {
      card: "summary_large_image",
      creator: config.twitterUsername,
      title: fullTitle(title),
      description: desc,
      images: [img]
    }
  };
};
