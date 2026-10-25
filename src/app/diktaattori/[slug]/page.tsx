import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { pageMetadata } from "@/services/metadata";
import Markdown from "@/components/Markdown";
import Taxonomies from "@/components/taxonomy/Taxonomies";
import Reign from "@/components/dictator/Reign";
import { Box } from "@/components/ui";
import { sprinkles } from "@/styles/sprinkles.css";
import * as styles from "@/styles/pages/dictator.css";
import DataTable from "@/components/dictator/DataTable";
import CountryLink from "@/components/dictator/CountryLink";
import RankingRow from "@/components/dictator/RankingRow";
import ExternalLink from "@/components/ExternalLink";
import {
  getReignDuration,
  sortByCanonicalRanking,
  sortBySortName
} from "@/services/dictator";
import { Dictator } from "@/types";
import NameHeading from "@/components/dictator/NameHeading";
import LifespanRow from "@/components/dictator/LifespanRow";
import AlphabeticalRow from "@/components/dictator/AlphabeticalRow";
import { gql } from "graphql-request";
import { graphQLClient } from "@/services/graphql";
import ContentfulImage from "@/components/contentful/ContentfulImage";
import { findIndex, slice } from "ramda";
import ContentBox from "@/components/layout/ContentBox";

type Params = { slug: string };
type PageProps = { params: Promise<Params> };

type Data = {
  dictator: Dictator;
  alphabeticalNeighbours: Dictator[];
  canonicalNeighbours: Dictator[];
};

const getData = cache(async (slug: string): Promise<Data | undefined> => {
  const query = gql`
    query DictatorItemPage($locale: String!, $slug: String!) {
      contextCollection: dictatorCollection(locale: $locale, limit: 150) {
        items {
          canonicalRanking
          name
          slug
          sortName
          sys {
            id
          }
        }
      }

      dictatorCollection(locale: $locale, where: { slug: $slug }, limit: 1) {
        items {
          sys {
            id
          }
          canonicalRanking
          aka
          slug
          name
          titles
          wikipedia
          podcast
          country {
            name
            slug
            continent {
              name
              slug
            }
          }
          synopsis
          story
          lifespan {
            start
            end
          }
          taxonomyCollection {
            items {
              name
              slug
            }
          }
          reignsCollection {
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
  `;

  const res = await graphQLClient.request(query, {
    locale: "fi",
    slug
  });

  const dictator: Dictator = res.dictatorCollection.items[0];

  if (!dictator) {
    return undefined;
  }

  const contextDictators: Dictator[] = res.contextCollection.items;

  const alphabeticalDictators = sortBySortName(contextDictators);
  const canonicalDictators = sortByCanonicalRanking(contextDictators);

  const myIndex = findIndex(
    (ad) => ad.sys.id === dictator.sys.id,
    alphabeticalDictators
  );

  const alphabeticalNeighbours = slice(
    Math.max(0, myIndex - 1),
    myIndex + 2,
    alphabeticalDictators
  );

  const canonicalNeighbours = dictator.canonicalRanking
    ? slice(
        Math.max(0, dictator.canonicalRanking - 2),
        dictator.canonicalRanking + 1,
        canonicalDictators
      )
    : [];

  return {
    dictator,
    alphabeticalNeighbours,
    canonicalNeighbours
  };
});

export async function generateStaticParams(): Promise<Params[]> {
  const query = gql`
    query DictatorPaths($locale: String!) {
      dictatorCollection(
        locale: $locale
        limit: 10
        order: [canonicalRanking_ASC]
      ) {
        items {
          slug
        }
      }
    }
  `;

  const res = await graphQLClient.request<{
    dictatorCollection: { items: { slug: string }[] };
  }>(query, { locale: "fi" });

  return res.dictatorCollection.items
    .map((d) => ({
      params: { slug: d.slug }
    }))
    .map((p: { params: Params }) => p.params);
}

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getData(slug);
  if (!data) {
    return {};
  }
  const { dictator } = data;
  return pageMetadata({
    title: dictator.name,
    description: dictator.synopsis,
    image: dictator.primaryImage?.url,
    path: `/diktaattori/${slug}`
  });
}

export default async function DictatorItemPage({ params }: PageProps) {
  const data = await getData((await params).slug);
  if (!data) {
    notFound();
  }

  const { dictator, alphabeticalNeighbours, canonicalNeighbours } = data;

  const content =
    dictator.story || "Tästä diktaattorista ei vielä ole kirjoitettu tarinaa.";

  const reignDuration = getReignDuration(dictator);

  return (
    <ContentBox>
      <Box as="article" className={styles.article}>
        <Box as="header" className={styles.header}>
          <NameHeading dictator={dictator} />
          <Taxonomies taxonomy={dictator.taxonomyCollection.items} />

          {dictator.synopsis && (
            <Box className={styles.synopsis}>
              <Markdown>{dictator.synopsis}</Markdown>
            </Box>
          )}
        </Box>

        <Box as="section" className={styles.facts}>
          <Box className={styles.portrait}>
            <ContentfulImage
              data={dictator.primaryImage}
              config={{
                width: 400,
                quality: 80,
                fit: "fill",
                focus: "face",
                aspectRatio: 0.75
              }}
              alt={dictator.name}
              loading="lazy"
            />
            {/*<GatsbyImage
            alt={dictator.name}
            image={dictator.primaryImage.gatsbyImageData}
            loading="eager"
      />*/}
          </Box>

          <Box className={sprinkles({ my: 3 })}>
            <DataTable>
              <tbody>
                {dictator.canonicalRanking && (
                  <RankingRow me={dictator} neighbours={canonicalNeighbours} />
                )}

                <tr>
                  <th>Vallassa</th>
                  <td>
                    {dictator.reignsCollection.items.map((reign, i) => {
                      return (
                        <Box key={i}>
                          <Reign reign={reign} />
                        </Box>
                      );
                    })}
                    ({Math.floor(reignDuration)} päivää)
                  </td>
                </tr>

                {dictator.lifespan && (
                  <LifespanRow lifespan={dictator.lifespan} />
                )}

                <tr>
                  <th>Maa</th>
                  <td>
                    <CountryLink country={dictator.country} />
                  </td>
                </tr>

                {dictator.titles && (
                  <tr>
                    <th>Arvonimet</th>
                    <td>
                      <ul>
                        {dictator.titles.map((title) => {
                          return <li key={title}>{title}</li>;
                        })}
                      </ul>
                    </td>
                  </tr>
                )}

                {dictator.podcast && (
                  <tr>
                    <th>Ylen podcast</th>
                    <td>
                      <ExternalLink
                        to={`https://areena.yle.fi/audio/${dictator.podcast}`}
                      >
                        {dictator.name}
                      </ExternalLink>
                    </td>
                  </tr>
                )}
                {dictator.wikipedia && (
                  <tr>
                    <th>Wikipedia</th>
                    <td>
                      <ExternalLink to={dictator.wikipedia}>
                        {dictator.name}
                      </ExternalLink>
                    </td>
                  </tr>
                )}
                <AlphabeticalRow
                  me={dictator}
                  neighbours={alphabeticalNeighbours}
                />
              </tbody>
            </DataTable>
          </Box>
        </Box>

        <Box className={styles.content}>
          <Markdown>{content}</Markdown>
        </Box>
      </Box>
    </ContentBox>
  );
}
