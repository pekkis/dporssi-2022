/** @jsxImportSource theme-ui */

import { gql } from "graphql-request";
import { GetStaticPaths, GetStaticProps } from "next";
import { FC } from "react";
import { Box } from "theme-ui";

import DictatorList from "../../../components/dictator/DictatorList";
import ContentBox from "../../../components/layout/ContentBox";
import Layout from "../../../components/layout/Layout";
import SectionHeading from "../../../components/SectionHeading";
import SEO from "../../../components/SEO";
import { sortByReignStart } from "../../../services/dictator";
import { graphQLClient } from "../../../services/graphql";
import { Country, Dictator } from "../../../types";

type Props = {
  country: Country;
  dictators: Dictator[];
};

type Params = {
  country: string;
  continent: string;
};

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
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
    slug: context.params?.country
  });

  if (ret.countryCollection.items.length === 0) {
    return {
      notFound: true
    };
  }

  const country = ret.countryCollection.items[0] as Country;

  if (country.continent.slug !== context.params?.continent) {
    return {
      notFound: true
    };
  }

  const dictators = ret.countryCollection.items[0].linkedFrom.dictatorCollection
    .items as Dictator[];

  return {
    props: {
      dictators,
      country
    }
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async (context) => {
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

  return {
    paths: ret.countryCollection.items
      .map((i) => ({
        params: {
          continent: i.continent.slug,
          country: i.slug
        }
      }))
      .slice(0, 2),
    fallback: "blocking"
  };
};

const CountryPage: FC<Props> = (props) => {
  const { dictators, country } = props;

  const title = `Diktaattorit, ${country.name}`;

  const sortedDictators = sortByReignStart(dictators || []);

  return (
    <Layout>
      <SEO title={title} />
      <ContentBox>
        <SectionHeading>{title}</SectionHeading>

        <Box>
          <DictatorList dictators={sortedDictators} />
        </Box>
      </ContentBox>
    </Layout>
  );
};

/*
export const query = graphql`
  query CountryPageQuery($id: String) {
    contentfulCountry(id: { eq: $id }) {
      id
      name
      slug
      continent {
        slug
        name
      }
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
`;
*/

export default CountryPage;
