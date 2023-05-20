import Layout from "@/components/layout/Layout";
import { Box } from "theme-ui";
import SEO from "@/components/SEO";
import InternalLink from "@/components/InternalLink";
import SectionHeading from "@/components/SectionHeading";

import Image from "next/image";
import notFound from "@/data/not-found.jpg";

const NotFoundPage = () => {
  return (
    <Layout>
      <SEO title="Sivua ei löytynyt" />

      <Box
        mx={2}
        mt={2}
        mb={3}
        as="section"
        sx={{
          display: ["block", "grid"],
          gridTemplateColumns: "auto 300px",
          columnGap: 4
        }}
      >
        <Box
          sx={{
            gridRowStart: 1,
            gridColumnStart: 2
          }}
        >
          <Image
            {...notFound}
            alt="Maakuoppa, josta valloittajia piileskellyt Saddam Hussein kaivettiin esiin"
          />
        </Box>

        <Box
          mt={2}
          sx={{
            gridRowStart: 1,
            gridColumnStart: 1
          }}
        >
          <SectionHeading>Sivua ei löytynyt!</SectionHeading>

          <p>
            Pyytämääsi sivua ei kyetty löytämään. Voi olla, että olemme
            löytäneet sivun jo aikaisemmin ja toimittaneet sen
            uudelleenkoulutettavaksi, tai sitten sivu on painunut niin syvälle
            maan alle ettemme löydä siitä edes viitteitä.
          </p>
          <p>
            Älä huoli, löydät sivusi vielä. Klikkaile vaikka itsesi takaisin
            pääsivulle ja jatka sieltä.
          </p>

          <ul>
            <li>
              <InternalLink to="/">Palaa pääsivulle</InternalLink>
            </li>
          </ul>
        </Box>
      </Box>
    </Layout>
  );
};

export default NotFoundPage;
