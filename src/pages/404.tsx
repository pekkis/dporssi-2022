import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import InternalLink from "@/components/InternalLink";
import Paragraph from "@/components/Paragraph";
import SectionHeading from "@/components/SectionHeading";

import Image from "next/image";
import notFound from "@/data/not-found.jpg";

const NotFoundPage = () => {
  return (
    <Layout>
      <SEO title="Sivua ei löytynyt" />

      <section
        className="mx-2 mt-2 mb-4 block sm:grid sm:gap-8"
        style={{ gridTemplateColumns: "auto 300px" }}
      >
        <div style={{ gridRowStart: 1, gridColumnStart: 2 }}>
          <Image
            {...notFound}
            alt="Maakuoppa, josta valloittajia piileskellyt Saddam Hussein kaivettiin esiin"
          />
        </div>

        <div
          className="mt-2"
          style={{ gridRowStart: 1, gridColumnStart: 1 }}
        >
          <SectionHeading>Sivua ei löytynyt!</SectionHeading>

          <Paragraph>
            Pyytämääsi sivua ei kyetty löytämään. Voi olla, että olemme
            löytäneet sivun jo aikaisemmin ja toimittaneet sen
            uudelleenkoulutettavaksi, tai sitten sivu on painunut niin syvälle
            maan alle ettemme löydä siitä edes viitteitä.
          </Paragraph>
          <Paragraph>
            Älä huoli, löydät sivusi vielä. Klikkaile vaikka itsesi takaisin
            pääsivulle ja jatka sieltä.
          </Paragraph>

          <ul>
            <li>
              <InternalLink to="/">Palaa pääsivulle</InternalLink>
            </li>
          </ul>
        </div>
      </section>
    </Layout>
  );
};

export default NotFoundPage;
