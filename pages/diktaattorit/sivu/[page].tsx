/** @jsxImportSource theme-ui */
import { Box } from "theme-ui";
import Layout from "../../../components/layout/Layout";
import Paginator from "../../../components/Paginator";
import SEO from "../../../components/SEO";
import DictatorList from "../../../components/dictator/DictatorList";
import { FC } from "react";
import { Dictator } from "../../../types";
import SectionHeading from "../../../components/SectionHeading";
import InternalLink from "../../../components/InternalLink";
import { Locale, url } from "../../../services/url";
import { GetStaticPaths, GetStaticProps } from "next";
import { gql } from "graphql-request";
import { graphQLClient } from "../../../services/graphql";
import { range } from "ramda";

const postsPerPage = 10;

type Props = {
  currentPage: number;
  numPages: number;
  dictators: Dictator[];
};

export const getStaticProps: GetStaticProps = async (context) => {
  const query = gql`
    query DictatorIndexPage($locale: String!, $skip: Int!) {
      dictatorCollection(
        locale: $locale
        limit: 10
        skip: $skip
        where: { canonicalRanking_exists: true }
        order: [canonicalRanking_ASC]
      ) {
        total
        items {
          sys {
            id
          }
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
    skip: (parseInt(context.params.page as string, 10) - 1) * 10
  });

  const dictators: Dictator[] = res.dictatorCollection.items;
  const total: number = res.dictatorCollection.total;
  const currentPage = parseInt(context.params.page as string, 10);
  const numPages = Math.ceil(total / postsPerPage);

  if (numPages < currentPage) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      dictators,
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
    paths: range(0, numPages).map((p) =>
      url("dictatorIndex", process.env.NEXT_PUBLIC_LOCALE as Locale)(p + 1)
    ),
    fallback: "blocking"
  };
};

const DictatorIndexPage: FC<Props> = (props) => {
  const { currentPage, numPages, dictators } = props;

  const title = "Pörssi";

  return (
    <Layout>
      <SEO title={title} />

      <Box mx={2}>
        <SectionHeading>{title}</SectionHeading>

        <p>
          Diktaattorien sijoitus Diktaattoripörssissä lasketaan salaisella, vain
          Puhemiehen ja hänen uskollisimpien kätyriensä tuntemalla kaavalla.
          Äänet lasketaan Venezuelan hallituksen lahjoittamilla luotettavilla
          Dominion&trade;-äänestyskoneilla.
        </p>

        <p>
          <InternalLink
            to={url("dictators", process.env.NEXT_PUBLIC_LOCALE as Locale)()}
          >
            Diktaattorihausta
          </InternalLink>{" "}
          löydät kaikki diktaattorit, myös ne onnettomat jotka eivät vielä ole
          ehtineet saada rankingia.
        </p>

        <Box my={4}>
          <Paginator
            label="diktaattorien sivutus, ylempi"
            id="paginator-top"
            currentPage={currentPage}
            numPages={numPages}
            getLink="dictatorIndex"
          />
        </Box>

        <Box>
          <DictatorList dictators={dictators} showRanking />
        </Box>

        <Box mt={4}>
          <Paginator
            label="diktaattorien sivutus, alempi"
            id="paginator-top"
            currentPage={currentPage}
            numPages={numPages}
            getLink="dictatorIndex"
          />
        </Box>
      </Box>
    </Layout>
  );
};

/*
export const query = graphql`
  query DictatorIndexQuery(
    $locale: String = "fi"
    $limit: Int = 10
    $skip: Int = 0
  ) {
    allContentfulDictator(
      limit: $limit
      skip: $skip
      sort: { fields: canonicalRanking, order: ASC }
      filter: { node_locale: { eq: $locale }, canonicalRanking: { ne: null } }
    ) {
      nodes {
        id
        slug
        name
        country {
          name
          slug
          continent {
            slug
          }
        }
        reigns {
          start
          end
        }
        canonicalRanking
        primaryImage {
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
        synopsis {
          synopsis
        }
      }
    }
  }
`;
*/

export default DictatorIndexPage;
