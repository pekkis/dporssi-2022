import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { pageMetadata } from "@/services/metadata";
import { gql } from "graphql-request";
import { graphQLClient } from "@/services/graphql";
import PropagandaFull from "@/components/PropagandaFull";
import { FakeNewsItem } from "@/types";
import defaultImage from "@/data/propaganda/mao-propaganda-2020.jpg";
import { createDate } from "@/services/date";
import ContentBox from "@/components/layout/ContentBox";

type Params = {
  slug: string;
  year: string;
  month: string;
  day: string;
};
type PageProps = { params: Promise<Params> };

// The URL's date has to match the item's date.
const validate = (
  item: FakeNewsItem | undefined,
  params: Params
): FakeNewsItem | undefined => {
  if (!item) {
    return undefined;
  }

  const date = createDate(item.date);

  if (
    date.day !== parseInt(params.day, 10) ||
    date.month !== parseInt(params.month, 10) ||
    date.year !== parseInt(params.year, 10) ||
    item.slug !== params.slug
  ) {
    return undefined;
  }

  return item;
};

const getItem = cache(
  async (params: Params): Promise<FakeNewsItem | undefined> => {
    const query = gql`
      query PropagandaItemPage($locale: String!, $slug: String!) {
        propagandaCollection(
          locale: $locale
          where: { slug: $slug }
          limit: 1
        ) {
          items {
            title
            slug
            description
            article
            date
            image {
              title
              fileName
              size
              contentType
              url
              width
              height
              linkedFrom {
                dictatorCollection {
                  items {
                    name
                  }
                }
              }
            }
          }
        }
      }
    `;

    const res = await graphQLClient.request<{
      propagandaCollection: { items: FakeNewsItem[] };
    }>(query, { locale: process.env.NEXT_PUBLIC_LOCALE, slug: params.slug });

    return validate(res.propagandaCollection.items[0], params);
  }
);

export async function generateStaticParams(): Promise<Params[]> {
  const query = gql`
    query PropagandaStaticPaths($locale: String!) {
      propagandaCollection(locale: $locale, order: [date_DESC], limit: 5) {
        items {
          slug
          date
        }
      }
    }
  `;

  const res = await graphQLClient.request<{
    propagandaCollection: { items: Pick<FakeNewsItem, "date" | "slug">[] };
  }>(query, { locale: process.env.NEXT_PUBLIC_LOCALE });

  return res.propagandaCollection.items.map((p) => {
    const date = createDate(p.date);
    return {
      year: date.toFormat("yyyy"),
      month: date.toFormat("LL"),
      day: date.toFormat("dd"),
      slug: p.slug
    };
  });
}

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const p = await params;
  const propaganda = await getItem(p);
  if (!propaganda) {
    return {};
  }
  return pageMetadata({
    title: propaganda.title,
    description: propaganda.description,
    path: `/valeuutiset/${p.year}/${p.month}/${p.day}/${p.slug}`
  });
}

export default async function PropagandaItemPage({ params }: PageProps) {
  const propaganda = await getItem(await params);
  if (!propaganda) {
    notFound();
  }

  return (
    <ContentBox>
      <PropagandaFull propaganda={propaganda} defaultImage={defaultImage} />
    </ContentBox>
  );
}
