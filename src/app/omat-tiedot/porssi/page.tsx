import type { Metadata } from "next";
import { gql } from "graphql-request";
import { graphQLClient } from "@/services/graphql";
import { pageMetadata } from "@/services/metadata";
import OwnRanking from "@/components/own-ranking/OwnRanking";
import type { Dictator } from "@/types";

// Fetched on every request, as before (getServerSideProps).
export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "Oma pörssi",
  path: "/omat-tiedot/porssi"
});

export default async function OwnRankingPage() {
  const query = gql`
    query OwnRankingPage($locale: String!) {
      dictatorCollection(locale: $locale, limit: 200) {
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
          sortName
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

  const res = await graphQLClient.request<{
    dictatorCollection: { items: Dictator[] };
  }>(query, { locale: "fi" });

  return <OwnRanking dictators={res.dictatorCollection.items} />;
}
