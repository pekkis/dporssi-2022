/** @jsxImportSource theme-ui */
import { Box } from "theme-ui";
import Layout from "../../../components/layout/Layout";
import Paginator from "../../../components/Paginator";
import SEO from "../../../components/SEO";
import DictatorList from "../../../components/dictator/DictatorList";
import { FC } from "react";
import { Dictator, FakeNewsItem } from "../../../types";
import SectionHeading from "../../../components/SectionHeading";
import InternalLink from "../../../components/InternalLink";
import { Locale, url } from "../../../services/url";
import { GetStaticPaths, GetStaticProps } from "next";
import { gql } from "graphql-request";
import { graphQLClient } from "../../../services/graphql";
import { range } from "ramda";
import PropagandaLight from "../../../components/PropagandaLight";
import ContentBox from "../../../components/layout/ContentBox";

const postsPerPage = 10;

type Props = {
  currentPage: number;
  numPages: number;
  fakeNews: FakeNewsItem[];
};

export const getStaticProps: GetStaticProps = async (context) => {
  const query = gql`
    query NewsIndexPage($locale: String!, $skip: Int!) {
      propagandaCollection(
        locale: $locale
        limit: 10
        skip: $skip
        order: [date_DESC]
      ) {
        total
        items {
          sys {
            id
          }
          date
          slug
          title
          description
        }
      }
    }
  `;

  const res = await graphQLClient.request(query, {
    locale: "fi",
    skip: (parseInt(context.params.page as string, 10) - 1) * 10
  });

  const fakeNews: FakeNewsItem[] = res.propagandaCollection.items;
  const total: number = res.propagandaCollection.total;
  const currentPage = parseInt(context.params.page as string, 10);
  const numPages = Math.ceil(total / postsPerPage);

  if (numPages < currentPage) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      fakeNews,
      currentPage,
      numPages
    } // will be passed to the page component as props
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const query = gql`
    query DictatorPaths($locale: String!) {
      dictatorCollection(
        locale: $locale
        where: { canonicalRanking_exists: true }
      ) {
        items {
          slug
        }
      }
    }
  `;

  const res = await graphQLClient.request(query, { locale: "fi" });

  const dictators: Dictator[] = res.dictatorCollection.items;

  const numPages = Math.ceil(dictators.length / postsPerPage);

  return {
    paths: range(0, 1).map((p) =>
      url("newsIndex", process.env.NEXT_PUBLIC_LOCALE as Locale)(p + 1)
    ),
    fallback: "blocking"
  };
};

const NewsIndexPage: FC<Props> = (props) => {
  const { fakeNews, currentPage, numPages } = props;

  return (
    <Layout>
      <SEO title="Valeuutiset" />
      <ContentBox>
        <Box>
          <Box mb={4}>
            <SectionHeading>Valeuutiset</SectionHeading>

            <p>
              Kaikki, mitä puhemies Pekkis sanoo, on automaattisesti totta. Niin
              sanotaan Huotilistisessa manifestissa, pyhistä kirjoista
              pyhimmässä, jonka puhemiehemme on meille jaloudessaan osoittanut!
            </p>
          </Box>

          <Box my={4}>
            <Paginator
              id="paginator-top"
              label="paginator-top"
              currentPage={currentPage}
              numPages={numPages}
              getLink="newsIndex"
            />
          </Box>
        </Box>
        {fakeNews.map((p) => (
          <PropagandaLight key={p.sys.id} propaganda={p} />
        ))}

        <Box mt={4}>
          <Paginator
            label="paginator-bottom"
            id="paginator-bottom"
            currentPage={currentPage}
            numPages={numPages}
            getLink="newsIndex"
          />
        </Box>
      </ContentBox>
    </Layout>
  );
};

/*
export const query = graphql`
  query PropagandaIndexQuery(
    $locale: String = "fi"
    $limit: Int = 10
    $skip: Int = 0
  ) {
    allContentfulPropaganda(
      sort: { fields: date, order: DESC }
      limit: $limit
      skip: $skip
      filter: { node_locale: { eq: $locale } }
    ) {
      nodes {
        id
        title
        date
        slug
        description {
          description
        }
      }
    }
  }
`;
*/

export default NewsIndexPage;
