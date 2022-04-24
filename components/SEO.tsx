import { FC } from "react";
import Head from "next/head";
import config from "../services/config";
import { useRouter } from "next/router";

type SiteMetadata = {
  site: {
    siteMetadata: {
      defaultTitle: string;
      titleTemplate: string;
      defaultDescription: string;
      siteUrl: string;
      defaultImage: string;
      twitterUsername: string;
      lang: string;
    };
  };
};

type Props = {
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
};

const cleanup = (str: string) => {
  return str.replace(/\*\*/g, "");
};

const fullTitle = (title: string) => {
  return `${title} - Diktaattoripörssi`;
};

const SEO: FC<Props> = ({ title, description, image, article = false }) => {
  const { pathname } = useRouter();
  const {
    title: defaultTitle,
    description: defaultDescription,
    siteUrl,
    image: defaultImage,
    twitterUsername,
    lang,
  } = config;

  const seo = {
    title: fullTitle(title || defaultTitle),
    description: description ? cleanup(description) : defaultDescription,
    image: image || `${siteUrl}${defaultImage}`,
    url: `${siteUrl}${pathname}`,
  };

  return (
    <Head>
      {title && <title>{seo.title}</title>}
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      {seo.url && <meta property="og:url" content={seo.url} />}
      {article && <meta property="og:type" content="article" />}
      {seo.title && <meta property="og:title" content={seo.title} />}
      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}
      {seo.image && <meta property="og:image" content={seo.image} />}
      <meta name="twitter:card" content="summary_large_image" />
      {twitterUsername && (
        <meta name="twitter:creator" content={twitterUsername} />
      )}
      {seo.title && <meta name="twitter:title" content={seo.title} />}
      {seo.description && (
        <meta name="twitter:description" content={seo.description} />
      )}
      {seo.image && <meta name="twitter:image" content={seo.image} />}
    </Head>
  );
};
export default SEO;
