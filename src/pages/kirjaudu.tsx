import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import SectionHeading from "@/components/SectionHeading";
import LoginMethods from "@/components/LoginMethods";
import ContentBox from "@/components/layout/ContentBox";
import Paragraph from "@/components/Paragraph";

const LoginPage = () => {
  return (
    <>
      <SEO title="Kirjaudu sisään" />
      <Layout>
        <ContentBox>
          <section className="mb-4">
            <SectionHeading>Kirjaudu sisään</SectionHeading>

            <Paragraph>
              Jos haluat osallistua Diktaattoripörssin tekemiseen, käytännössä
              raahaamalla styrankeja oman henkilökohtaisen näkemyksesi mukaiseen
              pahuusjärjestykseen, sinun tulee kirjautua sisään.
            </Paragraph>

            <Paragraph>
              Diktaattoripörssi ei säilytä käyttäjätunnuksiasi tai salasanojasi
              omissa tietokannoissaan. Sen sijaan käytämme tässä suhteessa
              siekailematta hyväksi muutamia <em>lähes yhtä tunnettuja</em>{" "}
              Internetin roistovaltioita. Kliksutat vain alta sopivaa
              namisguugelia niin olet sisässä alta aikayksikön.
            </Paragraph>

            <Paragraph>
              Jos sinulla ei ole tunnusta mihinkään tukemistamme
              kirjautumistavoista, olet kirjautuneiden käyttäjien keskusviraston
              byrokraateille <strong>persona non grata</strong> ja sinut
              sensuroidaan kaikista yhteiskuvista Puhemiehen kanssa.
            </Paragraph>
          </section>

          <LoginMethods />
        </ContentBox>
      </Layout>
    </>
  );
};

export default LoginPage;
