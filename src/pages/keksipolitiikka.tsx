import ContentBox from "@/components/layout/ContentBox";
import Layout from "@/components/layout/Layout";
import Paragraph from "@/components/Paragraph";
import SectionHeading from "@/components/SectionHeading";
import SEO from "@/components/SEO";

const CookiePolicyPage = () => {
  return (
    <Layout>
      <SEO title="Keksipolitiikka" />

      <ContentBox>
        <SectionHeading>Diktaattoripörssin keksipolitiikka</SectionHeading>

        <Paragraph>
          Diktaattoripörssi käyttää keksejä (&quot;cookies&quot;) ja muita
          tekniikoita kävijäliikenteen tilastointiin sekä mahdollistamaan ja
          helpottamaan huotilistisen puolueen digitaalisten palvelujen käyttöä.
        </Paragraph>

        <Paragraph>
          Keksi tai <em>eväste</em> on asiakkaan selaimelle lähetettävä pieni ja
          viaton tekstitiedosto, joka yleensä sisältää tunnistenumeron, eikä
          vahingoita päätelaitetta. Keksuloilla ja muilla vastaavilla
          tekniikoilla keräämme tietoja sisältöjen käytöstä, kuten tietoja
          siitä, mitä sivuja käyttäjä on selannut tai mitä ehdokasta hän äänesti
          edellisissä vaaleissa. Lisäksi keräämme teknisiä laitetietoja, kuten
          tietoa selaimesta, käyttöjärjestelmästä, resoluutiosta sekä
          IP-osoitteesta. Osa evästeistä on kolmansien osapuolten evästeitä.
          Kolmansien osapuolten evästeet tallentuvat näiden palvelutarjoajien
          käyttöön.
        </Paragraph>

        <Paragraph>
          Käyttäjää ei voida tunnistaa pelkkien evästeiden avulla, mutta
          yhdistämällä se kaikkeen muuhun mahdollisesti kerättävään tietoon ja /
          tai toisiin evästeisiin sinut voidaan tunnistaa lähes
          sataprosenttisella tarkkuudella. Keksit ja muut tunnistetiedot voi
          myös yrittää ovelasti piilottaa niin syvälle, ettet löydä niitä ellet
          ole alan asiantuntija. Tällä tavalla vaikkapa Google tai Facebook
          keräävät sinusta kaiken mahdollisen tiedon ja käyttävät sitä
          tehdäkseen sinusta hyödykkeen.
        </Paragraph>

        <Paragraph>
          Älä kuitenkaan itke. Keksit ovat olleet olemassa melkein yhtä kauan
          kuin webbi, ja ne ovat usein olennaisia sivujen toiminnalle. GDPR:n
          myötä niistä on tullut turhaa vouhotusta jos kysytte arvoisalta
          Puhemieheltänne. Ja kysyttehän te, koska luotatte Puhemieheenne kuin
          isäänne tai äitiinne. Hän on kansamme sielu!
        </Paragraph>
      </ContentBox>
    </Layout>
  );
};

export default CookiePolicyPage;
