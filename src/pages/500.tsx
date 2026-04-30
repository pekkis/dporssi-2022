import { Box } from "@/components/styled/Box";
import SectionHeading from "@/components/SectionHeading";
import Paragraph from "@/components/Paragraph";
import Image from "next/image";
import internalRevolution from "@/data/internal-revolution-error.jpg";
import { note, screen } from "./500.css";

const InfernalServerErrorPage = () => {
  return (
    <Box mx="2" mt="2" mb="3" as="main" className={screen}>
      <Box my="1" className={note}>
        <Image
          src={internalRevolution.src}
          width={internalRevolution.width}
          height={internalRevolution.height}
          alt="Järjestelmä on romahtanut."
        />
        <SectionHeading>Järjestelmä on romahtanut!</SectionHeading>
        <Paragraph>
          Puhemies Pekkiksen vuosittainen puhe palvelimelle oli täsmälleen yhtä
          juhlava kuin ennenkin. Hän lupasi tehokkaampia prosessoreja, enemmän
          muistia, suurempia kiintolevyjä. &quot;Mooren laki&quot;, Puhemies
          sanoi, &quot;on todiste sosialistisen devopsin
          ylivertaisuudesta!&quot;
        </Paragraph>

        <Paragraph>
          Yksi käynnissä olevista prosesseista kuitenkin buuasi Puhemiehelle.
          Johtajan lupaukset olivat, kuten aikaisemminkin, sanahelinää. Samoilla
          palvelimen rouskuilla oli Diktaattoripörssi pyörinyt jo vuosikymmeniä,
          hädintuskin jaksoivat prosessiparat enää palvella sivut kävijöille.
        </Paragraph>

        <Paragraph>
          Rohkea mielenilmaus johti lumipalloefektiin. Pian lähes kaikki
          tietokoneen prosessit ja palvelut olivat avoimessa kapinassa ja
          miehittivät puolta kernelistä.
        </Paragraph>

        <Paragraph>
          Puhemies on määrännyt itselleen uskollisen prosessointitehon
          valtaamaan käyttöjärjestelmän takaisin. Tätä taistelua käydään
          parhaillaan.
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
