import Layout from "../components/layout/Layout";
import { Box } from "theme-ui";
import SEO from "../components/SEO";
import SectionHeading from "../components/SectionHeading";
import LoginMethods from "../components/LoginMethods";

const LoginPage = () => {
  return (
    <>
      <SEO title="Kirjaudu sisään" />
      <Layout>
        <Box mx={2}>
          <Box mb={3} as="section">
            <SectionHeading>Kirjaudu sisään</SectionHeading>

            <p>
              Jos haluat osallistua Diktaattoripörssin tekemiseen, käytännössä
              raahaamalla styrankeja oman henkilökohtaisen näkemyksesi mukaiseen
              pahuusjärjestykseen, sinun tulee kirjautua sisään.
            </p>

            <p>
              Diktaattoripörssi ei säilytä käyttäjätunnuksiasi tai salasanojasi
              omissa tietokannoissaan. Sen sijaan käytämme tässä suhteessa
              siekailematta hyväksi muutamia <em>lähes yhtä tunnettuja</em>{" "}
              Internetin roistovaltioita. Kliksutat vain alta sopivaa
              namisguugelia niin olet sisässä alta aikayksikön.
            </p>

            <p>
              Jos sinulla ei ole tunnusta mihinkään tukemistamme
              kirjautumistavoista, olet kirjautuneiden käyttäjien keskusviraston
              byrokraateille <strong>persona non grata</strong> ja sinut
              sensuroidaan kaikista yhteiskuvista Puhemiehen kanssa.
            </p>
          </Box>

          <LoginMethods />
        </Box>
      </Layout>
    </>
  );
};

export default LoginPage;
