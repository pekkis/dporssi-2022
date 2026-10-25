import Adi from "@/components/Adi";
import InternalLink from "@/components/InternalLink";
import { Locale, url } from "@/services/url";
import { FaTwitter } from "react-icons/fa";
import { Box, Heading } from "@/components/ui";
import { sprinkles } from "@/styles/sprinkles.css";
import * as styles from "./Footer.css";
import ExternalLink from "@/components/ExternalLink";

const links = [
  {
    to: url("guestbookIndex", process.env.NEXT_PUBLIC_LOCALE as Locale)(1),
    label: "Vieraskirja"
  },
  /*
  {
    to: "/pahat-kysymykset",
    label: "Pahat kysymykset"
  },
  */
  {
    to: "/tietoa-porssista",
    label: "Tietoa 'Pörssistä"
  },
  {
    to: "/ota-yhteytta",
    label: "Ota yhteyttä"
  },
  {
    to: "/kayttoehdot",
    label: "Käyttöehdot"
  },
  {
    to: "/rekisteriseloste",
    label: "Rekisteriseloste"
  },
  {
    to: "/keksipolitiikka",
    label: "Keksipolitiikka"
  }
];

const Footer = () => {
  return (
    <Box as="footer" className={styles.footer}>
      <Box className={styles.logo}>
        <Adi />
      </Box>

      <Box className={sprinkles({ p: 3 })}>
        <Heading className={styles.heading} as="h2">
          Vakoile D-pörssiä
        </Heading>

        <Box className={styles.social}>
          <ExternalLink
            aria-label="Diktaattoripörssin Twitter-tili"
            to="https://twitter.com/dporssi"
            icon={false}
          >
            <FaTwitter />
          </ExternalLink>{" "}
        </Box>
      </Box>

      <Box className={sprinkles({ p: 3 })}>
        <nav>
          <ul className={styles.links}>
            {links.map((link, i) => {
              return (
                <li key={i} className={styles.linkItem}>
                  <InternalLink variant="footer" to={link.to}>
                    {link.label}
                  </InternalLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <Box className={sprinkles({ my: 3 })}>
          <a
            href="https://creativecommons.org/licenses/by/1.0/fi/"
            rel="license"
          >
            <img
              src="https://i.creativecommons.org/l/by/1.0/fi/80x15.png"
              width="85"
              height="15"
              alt="Creative Commons License"
              className={styles.licenseImage}
            />
          </a>
          copyright © Dr. Kobros Foundation. Käytä miten lystäät,{" "}
          <ExternalLink
            icon={false}
            to="https://creativecommons.org/licenses/by/1.0/fi/"
            rel="license"
          >
            kunhan kerrot mistä on peräisin!
          </ExternalLink>
          .
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
