import Layout from "@/components/layout/Layout";
import Paginator from "@/components/Paginator";
import SEO from "@/components/SEO";
import { FC } from "react";
import { FakeNewsItem } from "@/types";
import SectionHeading from "@/components/SectionHeading";
import { Locale, url } from "@/services/url";
import { GetStaticPaths, GetStaticProps } from "next";
import { gql } from "graphql-request";
import { graphQLClient } from "@/services/graphql";
import { range } from "ramda";
import PropagandaLight from "@/components/PropagandaLight";
import ContentBox from "@/components/layout/ContentBox";
import Paragraph from "@/components/Paragraph";

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
    skip: (parseInt(context.params!.page as string, 10) - 1) * 10
  });

  const fakeNews: FakeNewsItem[] = res.propagandaCollection.items;
  const total: number = res.propagandaCollection.total;
  const currentPage = parseInt(context.params!.page as string, 10);
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
        <div>
          <div className="mb-8">
            <SectionHeading>Valeuutiset</SectionHeading>

            <Paragraph>
              Kaikki, mitä puhemies Pekkis sanoo, on automaattisesti totta. Niin
              sanotaan Huotilistisessa manifestissa, pyhistä kirjoista
              pyhimmässä, jonka puhemiehemme on meille jaloudessaan osoittanut!
            </Paragraph>
          </div>

          <div className="my-8">
            <Paginator
              id="paginator-top"
              label="paginator-top"
              currentPage={currentPage}
              numPages={numPages}
              getLink="newsIndex"
            />
          </div>
        </div>
        {fakeNews.map((p) => (
          <PropagandaLight key={p.sys.id} propaganda={p} />
        ))}

        <div className="mt-8">
          <Paginator
            label="paginator-bottom"
            id="paginator-bottom"
            currentPage={currentPage}
            numPages={numPages}
            getLink="newsIndex"
          />
        </div>
      </ContentBox>
    </Layout>
  );
};

export default NewsIndexPage;
