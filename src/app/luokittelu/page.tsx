import type { Metadata } from "next";
import { pageMetadata } from "@/services/metadata";
import { Box } from "@/components/ui";
import { sprinkles } from "@/styles/sprinkles.css";
import * as styles from "@/styles/pages/luokittelu.css";
import { groupBy, toPairs } from "ramda";
import Category from "@/components/taxonomy/Category";
import SectionHeading from "@/components/SectionHeading";
import { gql } from "graphql-request";
import { graphQLClient } from "@/services/graphql";
import { TaxonomyTerm } from "@/types";
import ContentBox from "@/components/layout/ContentBox";

// Regenerated every 12 hours, as before.
export const revalidate = 43200;

export const metadata: Metadata = pageMetadata({
  title: "Luokittelu",
  path: "/luokittelu"
});

const groupByCategoryName = groupBy<TaxonomyTerm>((tag) => tag.category.name);

export default async function ClassificationIndexPage() {
  const query = gql`
    query ClassificationIndex($locale: String!) {
      taxonomyTermCollection(locale: $locale, order: [name_ASC]) {
        items {
          sys {
            id
          }
          slug
          name
          description
          wikipedia
          category {
            name
            weight
          }
        }
      }
    }
  `;

  const res = await graphQLClient.request<{
    taxonomyTermCollection: { items: TaxonomyTerm[] };
  }>(query, { locale: "fi" });

  const groupedTaxonomies = toPairs(
    groupByCategoryName(res.taxonomyTermCollection.items)
  );

  return (
    <ContentBox>
      <Box className={sprinkles({ mb: 4 })} as="section">
        <SectionHeading>Luokittelu</SectionHeading>
        <p>
          Diktaattoripörssi luokittelee diktaattorit virallisen tyrannien
          taksonomian mukaisesti avainsanoilla. Alla avaan ajatuksiani ja
          määrittelemäni avainsanat, esimerkein jos / kun näen sen
          hyödylliseksi.
        </p>

        <p>
          Lisään avainsanoja sitä mukaa kun keksin merkityksellisiä sellaisia.
          Vinkata saa!
        </p>
      </Box>

      <Box className={styles.categories}>
        {groupedTaxonomies.map(([name, terms]) => {
          return <Category name={name} taxonomy={terms ?? []} key={name} />;
        })}
      </Box>
    </ContentBox>
  );
}
