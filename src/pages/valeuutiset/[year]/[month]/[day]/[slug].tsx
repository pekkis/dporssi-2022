/** @jsxImportSource theme-ui */

import Layout from "@/components/layout/Layout";
import { gql } from "graphql-request";
import { graphQLClient } from "@/services/graphql";
import { FC } from "react";
import PropagandaFull from "@/components/PropagandaFull";
import { GetStaticPaths, GetStaticProps } from "next";
import { FakeNewsItem } from "@/types";
import { Locale, url } from "@/services/url";
import SEO from "@/components/SEO";

import defaultImage from "@/data/propaganda/mao-propaganda-2020.jpg";
import { createDate } from "@/services/date";
import ContentBox from "@/components/layout/ContentBox";

type Props = {
  propaganda: FakeNewsItem;
};

type QueryParams = {
  slug: string;
  year: string;
  month: string;
  day: string;
};

const validate = (
  item: FakeNewsItem | undefined,
  params: QueryParams
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

export const getStaticProps: GetStaticProps<Props, QueryParams> = async (
  context
) => {
  const query = gql`
    query PropagandaItemPage($locale: String!, $slug: String!) {
      propagandaCollection(locale: $locale, where: { slug: $slug }, limit: 1) {
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

  const res = await graphQLClient.request(query, {
    locale: process.env.NEXT_PUBLIC_LOCALE,
    slug: context.params.slug
  });

  const item: FakeNewsItem | undefined = validate(
    res.propagandaCollection.items[0],
    context.params
  );

  if (!item) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      propaganda: item
    }
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
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

  const res = await graphQLClient.request(query, {
    locale: process.env.NEXT_PUBLIC_LOCALE
  });

  return {
    paths: res.propagandaCollection.items.map((p: FakeNewsItem) => {
      return url("newsItem", process.env.NEXT_PUBLIC_LOCALE as Locale)(p);
    }),
    fallback: "blocking"
  };
};

const PropagandaItemPage: FC<Props> = (props) => {
  const { propaganda } = props;

  return (
    <>
      <SEO title={propaganda.title} description={propaganda.description} />

      <Layout>
        <ContentBox>
          <PropagandaFull propaganda={propaganda} defaultImage={defaultImage} />
        </ContentBox>
      </Layout>
    </>
  );
};

export default PropagandaItemPage;
