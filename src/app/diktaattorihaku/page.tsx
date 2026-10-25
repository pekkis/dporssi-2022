import type { Metadata } from "next";
import { pageMetadata } from "@/services/metadata";
import BrowserDictatorSearch from "@/components/dictator-search/BrowserDictatorSearch";
import { Box, Paragraph } from "@/components/ui";
import { sprinkles } from "@/styles/sprinkles.css";
import { Dictator } from "@/types";
import SectionHeading from "@/components/SectionHeading";
import InternalLink from "@/components/InternalLink";
import { Locale, url } from "@/services/url";
import { gql } from "graphql-request";
import { graphQLClient } from "@/services/graphql";
import ContentBox from "@/components/layout/ContentBox";

// Regenerated every 12 hours, as before.
export const revalidate = 43200;

export const metadata: Metadata = pageMetadata({
  title: "Diktaattorihaku",
  path: "/diktaattorihaku"
});

const getDictators = async (): Promise<{ dictators: Dictator[] }> => {
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
            title
            description
          }
        }
      }
    }
  `;

  const res = await graphQLClient.request(query, {
    locale: "fi"
  });

  return {
    dictators: res.dictatorCollection.items as Dictator[]
  };
};

export default async function DictatorsPage() {
  const { dictators } = await getDictators();
  const title = "Diktaattorihaku";

  return (
    <ContentBox>
      <SectionHeading>{title}</SectionHeading>

      <Paragraph>
        Tässä he nyt ovat, kaikki Diktaattoripörssin tuntemat diktaattorit. Jos
        joku puuttuu, kerro ihmeessä siitä{" "}
        <InternalLink
          to={url("guestbookIndex", process.env.NEXT_PUBLIC_LOCALE as Locale)()}
        >
          vieraskirjassa
        </InternalLink>
        .
      </Paragraph>

      <Box className={sprinkles({ my: 4 })}>
        <BrowserDictatorSearch dictators={dictators} />
      </Box>
    </ContentBox>
  );
}
