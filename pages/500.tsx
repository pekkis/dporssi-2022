/** @jsxImportSource theme-ui */
import { Box } from "theme-ui";
// import { graphql, useStaticQuery } from "gatsby";
// import { GatsbyImage } from "gatsby-plugin-image";
import SectionHeading from "../components/SectionHeading";
import Paragraph from "../components/Paragraph";

const InfernalServerErrorPage = () => {
  /*
  const data = useStaticQuery(graphql`
    {
      file(relativePath: { eq: "internal-revolution-error.jpg" }) {
        childImageSharp {
          gatsbyImageData(layout: CONSTRAINED)
        }
      }
    }
  `);
  */

  return (
    <Box
      mx={2}
      mt={2}
      mb={3}
      as="main"
      sx={{
        display: "flex",
        placeContent: "center",
      }}
    >
      <Box
        sx={{
          my: 1,
          maxWidth: "300px",
          transform: "rotate(1.5deg)",
          fontFamily: "Comic Sans MS",
        }}
      >
        {/*<GatsbyImage
          image={data.file.childImageSharp.gatsbyImageData}
          alt="Järjestelmä on romahtanut"
      />*/}
        <SectionHeading>Järjestelmä on romahtanut!</SectionHeading>
        <Paragraph>
          Puhemies Pekkiksen juhlava puhe palvelimelle oli täsmälleen
          samanlainen kuin ennenkin. Hän lupasi tehokkaampia prosessoreja,
          enemmän muistia, suurempia kiintolevyjä. "Mooren laki", puhemies
          sanoi, "on todiste Diktaattoripörssin politiikan ylivertaisuudesta!"
        </Paragraph>

        <Paragraph>
          Yksi käynnissä olevista prosesseista kehtasi kuitenkin buuata
          puhemiehelle. Johtajan lupaukset olivat, kuten aikaisemminkin,
          sanahelinää. Samoilla palvelimen louskuilla oli Diktaattoripörssi
          pyörinyt jo vuosikymmenen, ja hädintuskin jaksoivat prosessoriparat
          enää palvella sivut kävijöille.
        </Paragraph>

        <Paragraph>
          Rohkean prosessin mielenilmaus johti lumipalloefektiin. Pian lähes
          kaikki tietokoneen prosessit ja palvelut olivat avoimessa kapinassa ja
          miehittivät puolta kernelistä. Puhemies on määrännyt itselleen yhä
          uskollisen prosessointitehon valtaamaan kernelin takaisin. Tätä
          taistelua käydään parhaillaan.
        </Paragraph>

        <ul>
          <li>
            <a
              href="/"
              onClick={() => {
                document.location.reload();
              }}
            >
              Lataa sama sivu uudestaan (saattaa auttaa!)
            </a>
          </li>
          <li>
            <a href="/">Palaa pääsivulle (jos mikään ei auta!)</a>
          </li>
        </ul>
      </Box>
    </Box>
  );
};

export default InfernalServerErrorPage;
