import { gql } from "graphql-request";
import { graphQLClient } from "../services/graphql";
import { Locale, url } from "../services/url";
import {
  Continent,
  Country,
  Dictator,
  FakeNewsItem,
  TaxonomyTerm
} from "../types";
import { range } from "ramda";

type SitemapEntry = {
  loc: string;
};

const staticPages = [
  url("index", process.env.NEXT_PUBLIC_LOCALE as Locale)(),
  url("about", process.env.NEXT_PUBLIC_LOCALE as Locale)(),
  url("login", process.env.NEXT_PUBLIC_LOCALE as Locale)(),
  url("privacyPolicy", process.env.NEXT_PUBLIC_LOCALE as Locale)(),
  url("cookiePolicy", process.env.NEXT_PUBLIC_LOCALE as Locale)(),
  url("termsOfUse", process.env.NEXT_PUBLIC_LOCALE as Locale)(),
  url("classificationIndex", process.env.NEXT_PUBLIC_LOCALE as Locale)(),
  url("dictators", process.env.NEXT_PUBLIC_LOCALE as Locale)()
];

function generateSiteMap(entries: SitemapEntry[]) {
  const absolutified = entries.map((e) => {
    return {
      ...e,
      loc: `${process.env.SITE_URL}${e.loc}`
    };
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${absolutified
       .map((entry) => {
         return `
       <url>
         <loc>${entry.loc}</loc>
         <changefreq>daily</changefreq>
         <priority>0.7</priority>
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  const query = gql`
    query SitemapStuff($locale: String!) {
      dictatorCollection(locale: $locale, limit: 150) {
        items {
          slug
          canonicalRanking
        }
      }
      countryCollection(locale: $locale, limit: 150) {
        items {
          slug
          continent {
            slug
          }
        }
      }
      propagandaCollection(locale: $locale, limit: 300) {
        items {
          date
          slug
        }
      }
      taxonomyTermCollection {
        items {
          slug
        }
      }
    }
  `;

  const ret = await graphQLClient.request(query, {
    locale: process.env.NEXT_PUBLIC_LOCALE
  });

  const dictators: Dictator[] = ret.dictatorCollection.items;
  const dictatorIndexPages = Math.ceil(
    dictators.filter((d) => d.canonicalRanking).length / 10
  );

  const news: FakeNewsItem[] = ret.propagandaCollection.items;
  const newsIndexPages = Math.ceil(news.length / 10);

  const countries: Country[] = ret.countryCollection.items;
  const continents: Continent[] = countries.map((c) => c.continent);

  const classifications: TaxonomyTerm[] = ret.taxonomyTermCollection.items;

  const classificationEntries = classifications.map((c) => {
    return {
      loc: url(
        "classificationItem",
        process.env.NEXT_PUBLIC_LOCALE as Locale
      )(c)
    };
  });

  const countryEntries = countries.map((c) => {
    return {
      loc: url("country", process.env.NEXT_PUBLIC_LOCALE as Locale)(c)
    };
  });

  const continentEntries = continents.map((c) => {
    return {
      loc: url("continent", process.env.NEXT_PUBLIC_LOCALE as Locale)(c)
    };
  });

  const newsPageEntries = news.map((n) => {
    return {
      loc: url("newsItem", process.env.NEXT_PUBLIC_LOCALE as Locale)(n)
    };
  });

  const newsIndexEntries = range(1, newsIndexPages + 1).map((r) => {
    return {
      loc: url("newsIndex", process.env.NEXT_PUBLIC_LOCALE as Locale)(r)
    };
  });

  const dictatorPageEntries = dictators.map((d) => {
    return {
      loc: url("dictatorItem", process.env.NEXT_PUBLIC_LOCALE as Locale)(d)
    };
  });

  const dictatorIndexEntries = range(1, dictatorIndexPages + 1).map((r) => {
    return {
      loc: url("dictatorIndex", process.env.NEXT_PUBLIC_LOCALE as Locale)(r)
    };
  });

  const staticPageEntries = staticPages.map((loc) => {
    return {
      loc
    };
  });

  const entries = [
    ...staticPageEntries,
    ...dictatorPageEntries,
    ...dictatorIndexEntries,
    ...newsPageEntries,
    ...newsIndexEntries,
    ...countryEntries,
    ...continentEntries,
    ...classificationEntries
  ];

  /*
  const dictatorPageEntries = dictators.map((d) => {
    return {
      loc: url("dictatorItem", process.env.NEXT_PUBLIC_LOCALE as Locale)(d);
    }
  });
  */

  /*
  for (const d of ret.dictatorCollection.items) {
    entries.push({
      loc: url("dictatorItem", process.env.NEXT_PUBLIC_LOCALE as Locale)(d)
    });
  }
  */

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(entries);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {}
  };
}

export default SiteMap;
