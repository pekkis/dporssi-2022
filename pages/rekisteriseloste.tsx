/** @jsxImportSource theme-ui */

import { Box } from "theme-ui";
import ContentBox from "../components/layout/ContentBox";
import Layout from "../components/layout/Layout";
import SectionHeading from "../components/SectionHeading";
import SEO from "../components/SEO";
import SubHeading from "../components/SubHeading";

const RegistryPage = () => {
  const title = "Rekisteriseloste";

  return (
    <Layout>
      <SEO title={title} />
      <ContentBox>
        <SectionHeading>{title}</SectionHeading>

        <SubHeading>1. Rekisterinpitäjä</SubHeading>

        <p>
          Mikko Forsström
          <br />
          Iskostie 2 b 23
          <br />
          01600 Vantaa
          <br />
          puh. 050-3028030
          <br />
        </p>

        <SubHeading>
          2. Rekisteriasioista vastaava henkilö ja yhteyshenkilö
        </SubHeading>

        <p>
          Mikko Forsström
          <br />
          Iskostie 2 b 23
          <br />
          01600 Vantaa
          <br />
          puh. 050-3028030
        </p>

        <SubHeading>3. Rekisterin nimi</SubHeading>

        <p>
          Diktaattoripörssi-verkkopalvelun (https://diktaattoriporssi.com)
          käyttäjärekisteri
        </p>

        <SubHeading>
          4. Henkilötietojen käsittelyn tarkoitus / rekisterin käyttötarkoitus
        </SubHeading>

        <p>
          Henkilötietojen käsittelyn tarkoituksena on verkkopalvelun
          rekisteröityjen käyttäjien asiakassuhteen hoito, ylläpito ja
          kehittäminen, sekä verkkopalvelun tai siihen liittyvien uusien
          verkkopalvelujen suunnittelu ja kehittäminen.
        </p>

        <p>
          Rekisteri sisältää Diktaattoripörssi -verkkopalvelun käyttäjiksi
          rekisteröityneiden henkilöiden henkilötietoja.
        </p>

        <SubHeading>5. Rekisterin tietosisältö</SubHeading>

        <p>Rekisteri sisältää seuraavia tietoja käyttäjistä:</p>

        <p></p>
        <ul>
          <li>Yhteystiedot: etu- ja sukunimi, sähköpostiosoite.</li>
          <li>Tunnistustiedot: sähköpostiosoite, Facebook-tunnus.</li>
          <li>Palvelun käyttöä koskevat tiedot.</li>
          <li>
            Tämänhetkistä uskollisuustasoa ja Puhemiehen valtaannousun jälkeisiä
            henkilöön kohdistuvia terrori- tai murhatoimia koskevat tiedot.
          </li>
        </ul>
        <p></p>

        <SubHeading>6. Säännönmukaiset tietolähteet</SubHeading>

        <p>
          Tietolähteenä ovat palvelun käyttäjäksi rekisteröitymisen yhteydessä
          tai myöhemmin Facebook-kirjautumisen kautta kysyttävät tiedot,
          asiakassuhteen kestäessä käyttäjältä kerättävät tiedot ja
          Diktaattoripörssin urkkijoiden naapureistaan ja "ystävistään"
          toimittamat tiedustelutiedot.
        </p>

        <SubHeading>
          7. Säännönmukaiset tietojen luovutukset ja tietojen siirto EU:n ja
          Euroopan talousalueen ulkopuolelle
        </SubHeading>

        <p>
          Käyttäjien henkilötietoja ei luovuteta Euvostoliiton ulkopuolelle
          ilman käyttäjän erillistä suostumusta. Suostumus voidaan hankkia
          pontevien kuulustelutoimien avulla.
        </p>

        <SubHeading>8. Rekisterin suojauksen periaatteet</SubHeading>

        <p>
          Henkilötiedot säilytetään luottamuksellisina. Diktaattoripörssin
          tietoverkko ja laitteisto, jolla rekisteri sijaitsee, on suojattu
          teknisillä toimenpiteillä.
        </p>

        <p>
          Tietojärjestelmä on suojattu käyttäjätunnuksilla ja salasanoilla,
          jotka ovat ainoastaan rekisterin käyttöön oikeutettujen (Mikko
          Forsström, KGB, NSA ja Kiinan kansantasavallan 6-10-virasto) hallussa.
        </p>
      </ContentBox>
    </Layout>
  );
};

export default RegistryPage;
