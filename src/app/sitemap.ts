import type { MetadataRoute } from "next";
import { gql } from "graphql-request";
import { range, uniq } from "ramda";
import config from "@/services/config";
import { graphQLClient } from "@/services/graphql";
import { Locale, url } from "@/services/url";
import type {
  Continent,
  Country,
  Dictator,
  FakeNewsItem,
  TaxonomyTerm
} from "@/types";

// Built on every request, as before.
export const dynamic = "force-dynamic";

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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  const ret = await graphQLClient.request<{
    dictatorCollection: { items: Dictator[] };
    countryCollection: { items: Country[] };
    propagandaCollection: { items: FakeNewsItem[] };
    taxonomyTermCollection: { items: TaxonomyTerm[] };
  }>(query, { locale: process.env.NEXT_PUBLIC_LOCALE });

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

  const locs = uniq([
    ...staticPages,
    ...[
      ...dictatorPageEntries,
      ...dictatorIndexEntries,
      ...newsPageEntries,
      ...newsIndexEntries,
      ...countryEntries,
      ...continentEntries,
      ...classificationEntries
    ].map((e) => e.loc)
  ]);

  return locs.map((loc) => ({
    url: `${config.siteUrl}${loc}`,
    changeFrequency: "daily",
    priority: 0.7
  }));
}
