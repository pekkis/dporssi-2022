import ContentBox from "@/components/layout/ContentBox";
import Layout from "@/components/layout/Layout";
import Paragraph from "@/components/Paragraph";
import SectionHeading from "@/components/SectionHeading";
import SEO from "@/components/SEO";
import SubHeading from "@/components/SubHeading";

const RegistryPage = () => {
  const title = "Rekisteriseloste";

  return (
    <Layout>
      <SEO title={title} />
      <ContentBox>
        <SectionHeading>{title}</SectionHeading>

        <SubHeading>1. Rekisterinpitäjä</SubHeading>

        <Paragraph>
          Dr. Kobros Foundation
          <br />
          Dr. Kobros vei
          <br />
          Lørenskog, Norja
          <br />
        </Paragraph>

        <SubHeading>
          2. Rekisteriasioista vastaava henkilö ja yhteyshenkilö
        </SubHeading>

        <Paragraph>
          Dr. Kobros Foundation
          <br />
          Dr. Kobros vei
          <br />
          Lørenskog, Norja
          <br />
        </Paragraph>

        <SubHeading>3. Rekisterin nimi</SubHeading>

        <Paragraph>
          Diktaattoripörssi-verkkopalvelun (https://diktaattoriporssi.com)
          käyttäjärekisteri
        </Paragraph>

        <SubHeading>
          4. Henkilötietojen käsittelyn tarkoitus / rekisterin käyttötarkoitus
        </SubHeading>

        <Paragraph>
          Henkilötietojen käsittelyn tarkoituksena on verkkopalvelun
          rekisteröityjen käyttäjien asiakassuhteen hoito, ylläpito ja
          kehittäminen, sekä verkkopalvelun tai siihen liittyvien uusien
          verkkopalvelujen suunnittelu ja kehittäminen.
        </Paragraph>

        <Paragraph>
          Rekisteri sisältää Diktaattoripörssi -verkkopalvelun käyttäjiksi
          rekisteröityneiden henkilöiden henkilötietoja.
        </Paragraph>

        <SubHeading>5. Rekisterin tietosisältö</SubHeading>

        <Paragraph>Rekisteri sisältää seuraavia tietoja käyttäjistä:</Paragraph>

        <Paragraph></Paragraph>
        <ul>
          <li>Yhteystiedot: etu- ja sukunimi, sähköpostiosoite.</li>
          <li>Tunnistustiedot: sähköpostiosoite, Facebook-tunnus.</li>
          <li>Palvelun käyttöä koskevat tiedot.</li>
          <li>
            Tämänhetkistä uskollisuustasoa ja Puhemiehen valtaannousun jälkeisiä
            henkilöön kohdistuvia terrori- tai murhatoimia koskevat tiedot.
          </li>
        </ul>
        <Paragraph></Paragraph>

        <SubHeading>6. Säännönmukaiset tietolähteet</SubHeading>

        <Paragraph>
          Tietolähteenä ovat palvelun käyttäjäksi rekisteröitymisen yhteydessä
          tai myöhemmin Facebook-kirjautumisen kautta kysyttävät tiedot,
          asiakassuhteen kestäessä käyttäjältä kerättävät tiedot ja
          Diktaattoripörssin urkkijoiden naapureistaan ja &quot;ystävistään&quot;
          toimittamat tiedustelutiedot.
        </Paragraph>

        <SubHeading>
          7. Säännönmukaiset tietojen luovutukset ja tietojen siirto EU:n ja
          Euroopan talousalueen ulkopuolelle
        </SubHeading>

        <Paragraph>
          Käyttäjien henkilötietoja ei luovuteta Euvostoliiton ulkopuolelle
          ilman käyttäjän erillistä suostumusta. Suostumus voidaan hankkia
          pontevien kuulustelutoimien avulla.
        </Paragraph>

        <SubHeading>8. Rekisterin suojauksen periaatteet</SubHeading>

        <Paragraph>
          Henkilötiedot säilytetään luottamuksellisina. Diktaattoripörssin
          tietoverkko ja laitteisto, jolla rekisteri sijaitsee, on suojattu
          teknisillä toimenpiteillä.
        </Paragraph>

        <Paragraph>
          Tietojärjestelmä on suojattu käyttäjätunnuksilla ja salasanoilla,
          jotka ovat ainoastaan rekisterin käyttöön oikeutettujen (Dr. Kobros
          Foundation, KGB, NSA ja Kiinan kansantasavallan 6-10-virasto)
          hallussa.
        </Paragraph>
      </ContentBox>
    </Layout>
  );
};

export default RegistryPage;
