import { gql } from "graphql-request";
import { GetStaticPaths, GetStaticProps } from "next";
import { graphQLClient } from "@/services/graphql";
import { TaxonomyTerm } from "@/types";

import Layout from "@/components/layout/Layout";
import { Box } from "theme-ui";
import SEO from "@/components/SEO";
import Markdown from "@/components/Markdown";
import DictatorList from "@/components/dictator/DictatorList";
import { sortBySortName } from "@/services/dictator";
import SectionHeading from "@/components/SectionHeading";
import SubHeading from "@/components/SubHeading";
import { FC } from "react";
import { hours } from "@/services/cache";
import ContentBox from "@/components/layout/ContentBox";

type Props = {
  taxonomy: TaxonomyTerm;
};

export const getStaticProps: GetStaticProps<Props, { slug: string }> = async (
  context
) => {
  const query = gql`
    query Classification($locale: String!, $slug: String!) {
      taxonomyTermCollection(
        locale: $locale
        where: { slug: $slug }
        limit: 1
      ) {
        items {
          sys {
            id
          }
          slug
          name
          description
          category {
            name
            weight
          }
          linkedFrom {
            dictatorCollection {
              items {
                sys {
                  id
                }
                canonicalRanking
                slug
                name
                sortName
                country {
                  name
                  slug
                  continent {
                    name
                    slug
                  }
                }
                synopsis
                lifespan {
                  start
                  end
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
        }
      }
    }
  `;

  const res = await graphQLClient.request(query, {
    locale: "fi",
    slug: context.params.slug
  });

  const term: TaxonomyTerm | undefined = res.taxonomyTermCollection.items[0];

  if (!term) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      taxonomy: term
    },
    revalidate: hours(12)
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const query = gql`
    query TaxonomyPaths($locale: String!) {
      taxonomyTermCollection(locale: $locale, order: [name_ASC], limit: 5) {
        items {
          slug
        }
      }
    }
  `;

  const res = await graphQLClient.request(query, { locale: "fi" });

  return {
    paths: res.taxonomyTermCollection.items.map((d) => ({
      params: { slug: d.slug }
    })),
    fallback: "blocking"
  };
};

const ClassificationItemPage: FC<Props> = (props) => {
  const { taxonomy } = props;

  const sortedDictators = sortBySortName(
    taxonomy.linkedFrom.dictatorCollection.items
  );

  return (
    <Layout>
      <SEO title={`Luokittelu: ${taxonomy.name}`} />

      <ContentBox>
        <Box mb={4}>
          <SectionHeading>Luokittelu: {taxonomy.name}</SectionHeading>

          <Markdown>{taxonomy.description}</Markdown>
        </Box>

        <Box mt={4}>
          <SubHeading>Diktaattorit</SubHeading>
          <Box>
            <DictatorList dictators={sortedDictators} />
          </Box>
        </Box>
      </ContentBox>
    </Layout>
  );
};

export default ClassificationItemPage;
