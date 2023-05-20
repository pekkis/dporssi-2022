import { Box, Paragraph } from "theme-ui";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { FC, useState } from "react";
import { Dictator } from "@/types";
import SectionHeading from "@/components/SectionHeading";
import DictatorSearch from "@/components/dictator-search/DictatorSearch";
import InternalLink from "@/components/InternalLink";
import { Locale, url } from "@/services/url";
import { useEffect } from "react";
import { GetStaticProps } from "next";
import { gql } from "graphql-request";
import { graphQLClient } from "@/services/graphql";
import Spinner from "@/components/Spinner";
import { hours } from "@/services/cache";
import ContentBox from "@/components/layout/ContentBox";

type Props = {
  dictators: Dictator[];
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const query = gql`
    query DictatorSearch($locale: String!) {
      dictatorCollection(locale: $locale, limit: 150) {
        total
        items {
          sys {
            id
          }
          slug
          name
          canonicalRanking
          sortName
          listedAt
          majorStoryUpdateAt
          lifespan {
            start
            end
          }
          reignsCollection(limit: 5) {
            items {
              start
              end
            }
          }
          primaryImage {
            width
            height
            url
          }
        }
      }
    }
  `;

  const res = await graphQLClient.request(query, {
    locale: "fi"
  });

  return {
    props: {
      dictators: res.dictatorCollection.items as Dictator[]
    },
    revalidate: hours(12)
  };
};

const DictatorsPage: FC<Props> = (props) => {
  const { dictators } = props;

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const title = "Diktaattorihaku";

  return (
    <Layout>
      <SEO title={title} />

      <ContentBox>
        <SectionHeading>{title}</SectionHeading>

        <Paragraph>
          Tässä he nyt ovat, kaikki Diktaattoripörssin tuntemat diktaattorit.
          Jos joku puuttuu, kerro ihmeessä siitä{" "}
          <InternalLink
            to={url(
              "guestbookIndex",
              process.env.NEXT_PUBLIC_LOCALE as Locale
            )()}
          >
            vieraskirjassa
          </InternalLink>
          .
        </Paragraph>

        <Box my={4}>
          {!loading && <DictatorSearch dictators={dictators} />}
          {loading && <Spinner />}
        </Box>
      </ContentBox>
    </Layout>
  );
};

export default DictatorsPage;
