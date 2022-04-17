import React, { FC } from "react";
import Markdown from "../../components/Markdown";
import Taxonomies from "../../components/taxonomy/Taxonomies";
import Reign from "../../components/dictator/Reign";
import Layout from "../../components/layout/Layout";
import { Box } from "theme-ui";
import SEO from "../../components/SEO";
import DataTable from "../../components/dictator/DataTable";
import CountryLink from "../../components/dictator/CountryLink";
import RankingRow from "../../components/dictator/RankingRow";
import ExternalLink from "../../components/ExternalLink";
import {
  getReignDuration,
  sortByCanonicalRanking,
  sortBySortName
} from "../../services/dictator";
import { Dictator } from "../../types";
import NameHeading from "../../components/dictator/NameHeading";
import LifespanRow from "../../components/dictator/LifespanRow";
import AlphabeticalRow from "../../components/dictator/AlphabeticalRow";
import { memo } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { gql } from "graphql-request";
import { graphQLClient } from "../../services/graphql";
import ContentfulImage from "../../components/contentful/ContentfulImage";
import { findIndex, slice } from "ramda";

type Props = {
  dictator: Dictator;
  alphabeticalNeighbours: Dictator[];
  canonicalNeighbours: Dictator[];
};

export const getStaticProps: GetStaticProps = async (context) => {
  const query = gql`
    query DictatorItemPage($locale: String!, $slug: String!) {
      contextCollection: dictatorCollection(locale: $locale) {
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
          slug
          name
          titles
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
    slug: context.params.slug
  });

  const dictator: Dictator = res.dictatorCollection.items[0];

  if (!dictator) {
    return {
      notFound: true
    };
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
    props: {
      dictator,
      alphabeticalNeighbours,
      canonicalNeighbours
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
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

  const res = await graphQLClient.request(query, { locale: "fi" });

  return {
    paths: res.dictatorCollection.items.map((d) => ({
      params: { slug: d.slug }
    })),
    fallback: "blocking"
  };
};

const DictatorItemPage: FC<Props> = (props) => {
  const { dictator, alphabeticalNeighbours, canonicalNeighbours } = props;

  const content =
    dictator.story ||
    dictator.synopsis ||
    "Tästä diktaattorista ei vielä ole kirjoitettu mitään.";

  const reignDuration = getReignDuration(dictator);

  return (
    <Layout>
      <SEO
        title={dictator.name}
        description={dictator.synopsis}
        image={dictator.primaryImage && dictator.primaryImage.url}
      />

      <Box
        as="article"
        mx={2}
        sx={{
          display: ["block", "grid"],
          gridTemplateColumns: "4fr 2fr",
          columnGap: 4
        }}
      >
        <Box
          as="header"
          mb={4}
          sx={{
            gridColumnStart: 1,
            gridColumnEnd: 3
          }}
        >
          <NameHeading dictator={dictator} />
          <Taxonomies taxonomy={dictator.taxonomyCollection.items} />

          {dictator.synopsis && (
            <Box
              sx={{
                mt: 3,
                fontSize: 3
              }}
            >
              <Markdown>{dictator.synopsis}</Markdown>
            </Box>
          )}
        </Box>

        <Box
          as="section"
          sx={{
            gridRowStart: 2,
            gridColumnStart: 2,
            gridColumnEnd: 3
          }}
        >
          <Box
            sx={{
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: "veryDark",
              borderRadius: 1,
              position: "relative"
            }}
          >
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

          <Box my={3}>
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

        <Box
          sx={{
            gridRowStart: 2,
            gridColumnStart: 1,
            gridRowEnd: 4
          }}
        >
          <Markdown>{content}</Markdown>
        </Box>
      </Box>
    </Layout>
  );
};

export default memo(DictatorItemPage);
