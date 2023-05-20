import { GetStaticPaths, GetStaticProps } from "next";
import { FC } from "react";
import { Box } from "theme-ui";
import DictatorList from "@/components/dictator/DictatorList";
import Layout from "@/components/layout/Layout";
import Markdown from "@/components/Markdown";
import SectionHeading from "@/components/SectionHeading";
import SEO from "@/components/SEO";
import { sortBySortName } from "@/services/dictator";
import { Continent, Country, Dictator } from "@/types";
import { gql } from "graphql-request";
import { graphQLClient } from "@/services/graphql";
import ContentBox from "@/components/layout/ContentBox";

type Props = {
  continent: Continent;
  dictators: Dictator[];
};

type Params = {
  continent: string;
};

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
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
    slug: context.params?.continent
  });

  if (ret.continentCollection.items.length === 0) {
    return {
      notFound: true
    };
  }

  const continent = ret.continentCollection.items[0] as Continent;

  const dictators =
    ret.continentCollection.items[0].linkedFrom.countryCollection.items
      .map((c) => c.linkedFrom.dictatorCollection.items)
      .flat() as Dictator[];

  return {
    props: {
      dictators,
      continent
    }
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async (context) => {
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

  return {
    paths: ret.continentCollection.items
      .map((i) => ({
        params: {
          continent: i.slug
        }
      }))
      .slice(0, 2),
    fallback: "blocking"
  };
};

const ContinentPage: FC<Props> = (props) => {
  const { continent, dictators } = props;

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
    <Layout>
      <SEO title={title} />
      <ContentBox>
        <SectionHeading>{title}</SectionHeading>

        {continent.description && (
          <Markdown>{continent.description.description}</Markdown>
        )}

        <Box>
          <DictatorList dictators={sortedDictators} />
        </Box>
      </ContentBox>
    </Layout>
  );
};

/*
export const query = graphql`
  query ContinentPageQuery($id: String) {
    contentfulContinent(id: { eq: $id }) {
      id
      name
      slug
      description {
        description
      }
      country {
        dictator {
          id
          slug
          name
          sortName
          canonicalRanking
          reigns {
            start
            end
          }
          synopsis {
            synopsis
          }
          country {
            slug
            name
            continent {
              slug
            }
          }

          primaryImage {
            id
            gatsbyImageData(
              layout: CONSTRAINED
              formats: [AUTO, WEBP]
              cropFocus: FACE
              aspectRatio: 0.75
              placeholder: BLURRED
              resizingBehavior: FILL
              quality: 66
              width: 300
            )
          }
        }
      }
    }
  }
`;
*/

export default ContinentPage;
