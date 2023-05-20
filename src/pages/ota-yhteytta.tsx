/** @jsxImportSource theme-ui */
import { Box } from "theme-ui";
import ExternalLink from "@/components/ExternalLink";
import InternalLink from "@/components/InternalLink";
import ContentBox from "@/components/layout/ContentBox";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/SectionHeading";
import SEO from "@/components/SEO";

const CookiePolicyPage = () => {
  return (
    <Layout>
      <SEO title="Ota yhteyttä" />

      <ContentBox>
        <SectionHeading>Ota yhteyttä</SectionHeading>

        <p>
          Puhemies on iloinen, jos annat palautetta. Olisi kiva jos{" "}
          <InternalLink to="/vieraskirja">
            kirjoittaisit sanottavasi vieraskirjaan
          </InternalLink>
          , koska sen näkevät kaikki kävijät.
        </p>
        <p>
          Jos asiasi ei sovellu esitettäväksi julkisesti, tai haluat lähestyä
          minua muissa asioissa (mielihyvä- ja henkivartioprikaatiin
          liittyminen, työ- tai muut 'Pörssiin liittymättömät jutut, Salvamiehen
          tai Soprano Oyj:n perääni usuttamat lakihenkilöt uhkavaatimuksineen
          yms), voit lähestyä minua yksityisissä kanavissa.
        </p>

        <ul>
          <li>
            Sähköposti:{" "}
            <ExternalLink
              icon={false}
              to="mailto:puhemies@diktaattoriporssi.com"
            >
              puhemies@diktaattoriporssi.com
            </ExternalLink>
          </li>
          <li>
            LinkedIn:{" "}
            <ExternalLink icon={false} to="https://www.linkedin.com/in/pekkis/">
              pekkis
            </ExternalLink>
          </li>
          <li>
            Twitter:{" "}
            <ExternalLink icon={false} to="https://twitter.com/pekkisx">
              @pekkisx
            </ExternalLink>
          </li>
        </ul>
      </ContentBox>
    </Layout>
  );
};

export default CookiePolicyPage;
