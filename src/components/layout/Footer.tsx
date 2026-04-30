import Adi from "@/components/Adi";
import InternalLink from "@/components/InternalLink";
import { Locale, url } from "@/services/url";
import { FaTwitter } from "react-icons/fa";
import { Box } from "@/components/styled/Box";
import { Heading } from "@/components/styled/Heading";
import ExternalLink from "@/components/ExternalLink";
import {
  adiWrap,
  ccImage,
  footer,
  heading as headingClass,
  linkItem,
  linkList
} from "./Footer.css";

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
    <footer className={footer}>
      <Box p="3">
        <div className={adiWrap}>
          <Adi />
        </div>

        <Box p="3">
          <Heading className={headingClass} as="h2">
            Vakoile D-pörssiä
          </Heading>

          <Box my="1" mx="2" fontSize="4">
            <ExternalLink
              aria-label="Diktaattoripörssin Twitter-tili"
              to="https://twitter.com/dporssi"
              icon={false}
            >
              <FaTwitter />
            </ExternalLink>{" "}
          </Box>
        </Box>

        <Box p="3">
          <nav>
            <ul className={linkList}>
              {links.map((link, i) => {
                return (
                  <li key={i} className={linkItem}>
                    <InternalLink variant="footer" to={link.to}>
                      {link.label}
                    </InternalLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          <Box my="3">
            <a
              href="https://creativecommons.org/licenses/by/1.0/fi/"
              rel="license"
            >
              <img
                src="https://i.creativecommons.org/l/by/1.0/fi/80x15.png"
                width="85"
                height="15"
                alt="Creative Commons License"
                className={ccImage}
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
    </footer>
  );
};

export default Footer;
