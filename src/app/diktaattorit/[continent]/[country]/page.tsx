import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { pageMetadata } from "@/services/metadata";
import { gql } from "graphql-request";
import { Box } from "@/components/ui";
import DictatorList from "@/components/dictator/DictatorList";
import ContentBox from "@/components/layout/ContentBox";
import SectionHeading from "@/components/SectionHeading";
import { sortByReignStart } from "@/services/dictator";
import { graphQLClient } from "@/services/graphql";
import { Country, Dictator } from "@/types";

type Params = { continent: string; country: string };
type PageProps = { params: Promise<Params> };

const getData = cache(
  async (
    params: Params
  ): Promise<{ country: Country; dictators: Dictator[] } | undefined> => {
    const query = gql`
      query Country($locale: String!, $slug: String!) {
        countryCollection(locale: $locale, limit: 1, where: { slug: $slug }) {
          items {
            sys {
              id
            }
            slug
            continent {
              slug
            }
            name
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
    `;

    const ret = await graphQLClient.request(query, {
      locale: "fi",
      slug: params.country
    });

    if (ret.countryCollection.items.length === 0) {
      return undefined;
    }

    const country = ret.countryCollection.items[0] as Country;

    if (country.continent.slug !== params.continent) {
      return undefined;
    }

    const dictators = ret.countryCollection.items[0].linkedFrom
      .dictatorCollection.items as Dictator[];

    return {
      dictators,
      country
    };
  }
);

export async function generateStaticParams(): Promise<Params[]> {
  const query = gql`
    query CountryPaths($locale: String!) {
      countryCollection(locale: $locale) {
        items {
          slug
          continent {
            slug
          }
        }
      }
    }
  `;

  const ret = await graphQLClient.request(query, {
    locale: "fi"
  });

  return ret.countryCollection.items
    .map((i: { slug: string; continent: { slug: string } }) => ({
      params: {
        continent: i.continent.slug,
        country: i.slug
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
  const { country } = data;
  return pageMetadata({
    title: `Diktaattorit, ${country.name}`,
    path: `/diktaattorit/${p.continent}/${p.country}`
  });
}

export default async function CountryPage({ params }: PageProps) {
  const data = await getData(await params);
  if (!data) {
    notFound();
  }

  const { dictators, country } = data;

  const title = `Diktaattorit, ${country.name}`;

  const sortedDictators = sortByReignStart(dictators || []);

  return (
    <ContentBox>
      <SectionHeading>{title}</SectionHeading>

      <Box>
        <DictatorList dictators={sortedDictators} />
      </Box>
    </ContentBox>
  );
}
