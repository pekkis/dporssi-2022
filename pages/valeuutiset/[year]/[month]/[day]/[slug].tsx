/** @jsxImportSource theme-ui */

import Layout from "../../../../../components/layout/Layout";
import { gql } from "graphql-request";
import { graphQLClient } from "../../../../../services/graphql";
import { FC } from "react";
import PropagandaFull from "../../../../../components/PropagandaFull";

export async function getServerSideProps(context) {
  console.log("Context", context);

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

  console.log("RES", res);

  return {
    props: {
      propaganda: res.propagandaCollection.items[0],
    },
  };
}

type Props = {
  videos: Array<{}>;
  propaganda: {};
  dictators: [];
};

/*
      <SEO title="Tervetuloa" />
      */

const PropagandaItemPage: FC<Props> = (props) => {
  const { propaganda } = props;

  return (
    <Layout>
      <PropagandaFull propaganda={propaganda} />
    </Layout>
  );
};

export default PropagandaItemPage;
