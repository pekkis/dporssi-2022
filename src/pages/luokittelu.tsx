import { Box } from "@/components/ui";
import { sprinkles } from "@/styles/sprinkles.css";
import * as styles from "@/styles/pages/luokittelu.css";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { groupBy, toPairs } from "ramda";
import Category from "@/components/taxonomy/Category";
import SectionHeading from "@/components/SectionHeading";
import { GetStaticProps } from "next";
import { gql } from "graphql-request";
import { graphQLClient } from "@/services/graphql";
import { TaxonomyTerm } from "@/types";
import { FC } from "react";
import { hours } from "@/services/cache";
import ContentBox from "@/components/layout/ContentBox";

type Props = {
  taxonomies: TaxonomyTerm[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
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

  const res = await graphQLClient.request(query, {
    locale: "fi"
  });

  return {
    props: {
      taxonomies: res.taxonomyTermCollection.items as TaxonomyTerm[]
    },
    revalidate: hours(12)
  };
};

const groupByCategoryName = groupBy<TaxonomyTerm>((tag) => tag.category.name);

const ClassificationIndexPage: FC<Props> = (props) => {
  const { taxonomies } = props;

  const groupedTaxonomies = toPairs(groupByCategoryName(taxonomies));

  return (
    <Layout>
      <SEO title="Luokittelu" />

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
    </Layout>
  );
};

export default ClassificationIndexPage;
