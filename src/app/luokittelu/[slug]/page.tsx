import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { pageMetadata } from "@/services/metadata";
import { gql } from "graphql-request";
import { graphQLClient } from "@/services/graphql";
import { TaxonomyTerm } from "@/types";
import { Box } from "@/components/ui";
import { sprinkles } from "@/styles/sprinkles.css";
import Markdown from "@/components/Markdown";
import DictatorList from "@/components/dictator/DictatorList";
import { sortBySortName } from "@/services/dictator";
import SectionHeading from "@/components/SectionHeading";
import SubHeading from "@/components/SubHeading";
import ContentBox from "@/components/layout/ContentBox";

// Regenerated every 12 hours, as before.
export const revalidate = 43200;

type Params = { slug: string };
type PageProps = { params: Promise<Params> };

const getTerm = cache(
  async (slug: string): Promise<TaxonomyTerm | undefined> => {
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

    const res = await graphQLClient.request<{
      taxonomyTermCollection: { items: TaxonomyTerm[] };
    }>(query, { locale: "fi", slug });

    return res.taxonomyTermCollection.items[0];
  }
);

export async function generateStaticParams(): Promise<Params[]> {
  const query = gql`
    query TaxonomyPaths($locale: String!) {
      taxonomyTermCollection(locale: $locale, order: [name_ASC], limit: 5) {
        items {
          slug
        }
      }
    }
  `;

  const res = await graphQLClient.request<{
    taxonomyTermCollection: { items: { slug: string }[] };
  }>(query, { locale: "fi" });

  return res.taxonomyTermCollection.items.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const taxonomy = await getTerm(slug);
  if (!taxonomy) {
    return {};
  }
  return pageMetadata({
    title: `Luokittelu: ${taxonomy.name}`,
    path: `/luokittelu/${slug}`
  });
}

export default async function ClassificationItemPage({ params }: PageProps) {
  const { slug } = await params;
  const taxonomy = await getTerm(slug);
  if (!taxonomy) {
    notFound();
  }

  const sortedDictators = sortBySortName(
    taxonomy.linkedFrom.dictatorCollection.items
  );

  return (
    <ContentBox>
      <Box className={sprinkles({ mb: 4 })}>
        <SectionHeading>Luokittelu: {taxonomy.name}</SectionHeading>

        <Markdown>{taxonomy.description}</Markdown>
      </Box>

      <Box className={sprinkles({ mt: 4 })}>
        <SubHeading>Diktaattorit</SubHeading>
        <Box>
          <DictatorList dictators={sortedDictators} />
        </Box>
      </Box>
    </ContentBox>
  );
}
