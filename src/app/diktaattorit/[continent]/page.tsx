import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { pageMetadata } from "@/services/metadata";
import { Box } from "@/components/ui";
import DictatorList from "@/components/dictator/DictatorList";
import Markdown from "@/components/Markdown";
import SectionHeading from "@/components/SectionHeading";
import { sortBySortName } from "@/services/dictator";
import { Continent, Dictator } from "@/types";
import { gql } from "graphql-request";
import { graphQLClient } from "@/services/graphql";
import ContentBox from "@/components/layout/ContentBox";

type Params = { continent: string };
type PageProps = { params: Promise<Params> };

const getData = cache(
  async (
    params: Params
  ): Promise<{ continent: Continent; dictators: Dictator[] } | undefined> => {
    const query = gql`
      query Continent($locale: String!, $slug: String!) {
        continentCollection(locale: $locale, limit: 1, where: { slug: $slug }) {
          items {
            name
            slug
            linkedFrom {
              countryCollection {
                items {
                  linkedFrom {
                    dictatorCollection(limit: 5) {
                      items {
                        sys {
                          id
                        }
                        sortName
                        canonicalRanking
                        slug
                        name
                        country {
                          name
                          slug
                          continent {
                            name
                            slug
                          }
                        }
                        synopsis
                        reignsCollection(limit: 3) {
                          items {
                            start
                            end
                          }
                        }
                        primaryImage {
                          url
                          width
                          height
                          title
                          description
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const ret = await graphQLClient.request(query, {
      locale: "fi",
      slug: params.continent
    });

    if (ret.continentCollection.items.length === 0) {
      return undefined;
    }

    const continent = ret.continentCollection.items[0] as Continent;

    const dictators =
      ret.continentCollection.items[0].linkedFrom.countryCollection.items
        .map(
          (c: { linkedFrom: { dictatorCollection: { items: Dictator[] } } }) =>
            c.linkedFrom.dictatorCollection.items
        )
        .flat() as Dictator[];

    return {
      dictators,
      continent
    };
  }
);

export async function generateStaticParams(): Promise<Params[]> {
  const query = gql`
    query Continent($locale: String!) {
      continentCollection(locale: $locale) {
        items {
          slug
        }
      }
    }
  `;

  const ret = await graphQLClient.request(query, {
    locale: "fi"
  });

  return ret.continentCollection.items
    .map((i: { slug: string }) => ({
      params: {
        continent: i.slug
      }
    }))
    .slice(0, 2)
    .map((p: { params: Params }) => p.params);
}

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const p = await params;
  const data = await getData(p);
  if (!data) {
    return {};
  }
  const { continent } = data;
  return pageMetadata({
    title: `Diktaattorit, ${continent.name}`,
    path: `/diktaattorit/${p.continent}`
  });
}

export default async function ContinentPage({ params }: PageProps) {
  const data = await getData(await params);
  if (!data) {
    notFound();
  }

  const { continent, dictators } = data;

  /*
  const dictators = continent.country
    ? continent.country
        .map((c) => c.dictator)
        .filter((d) => d)
        .flat()
    : [];
    */
  const sortedDictators = sortBySortName(dictators);

  const title = `Diktaattorit, ${continent.name}`;

  return (
    <ContentBox>
      <SectionHeading>{title}</SectionHeading>

      {continent.description && (
        <Markdown>{continent.description.description}</Markdown>
      )}

      <Box>
        <DictatorList dictators={sortedDictators} />
      </Box>
    </ContentBox>
  );
}
