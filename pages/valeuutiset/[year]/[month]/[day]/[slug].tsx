/** @jsxImportSource theme-ui */

import Layout from "../../../../../components/layout/Layout";
import { gql } from "graphql-request";
import { graphQLClient } from "../../../../../services/graphql";
import { FC } from "react";
import PropagandaFull from "../../../../../components/PropagandaFull";
import { GetStaticPaths, GetStaticProps } from "next";
import { FakeNewsItem } from "../../../../../types";
import { Locale, url } from "../../../../../services/url";
import SEO from "../../../../../components/SEO";

import defaultImage from "../../../../../data/propaganda/mao-propaganda-2020.jpg";

export const getStaticProps: GetStaticProps = async (context) => {
  const query = gql`
    query PropagandaItemPage($locale: String!, $slug: String!) {
      propagandaCollection(locale: $locale, where: { slug: $slug }) {
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
    slug: context.params.slug,
  });

  return {
    props: {
      propaganda: res.propagandaCollection.items[0],
    },
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const query = gql`
    query PropagandaStaticPaths($locale: String!) {
      propagandaCollection(locale: $locale) {
        items {
          slug
          date
        }
      }
    }
  `;

  const res = await graphQLClient.request(query, {
    locale: process.env.NEXT_PUBLIC_LOCALE,
  });

  return {
    paths: res.propagandaCollection.items.map((p: FakeNewsItem) => {
      return url("newsItem", process.env.NEXT_PUBLIC_LOCALE as Locale)(p);
    }),
    fallback: false,
  };
};

type Props = {
  videos: Array<{}>;
  propaganda: FakeNewsItem;
  dictators: [];
};

const PropagandaItemPage: FC<Props> = (props) => {
  const { propaganda } = props;

  return (
    <>
      <SEO title={propaganda.title} description={propaganda.description} />

      <Layout>
        <PropagandaFull propaganda={propaganda} defaultImage={defaultImage} />
      </Layout>
    </>
  );
};

export default PropagandaItemPage;
