/** @jsxImportSource theme-ui */
import { Heading, jsx } from "theme-ui";
import { Box, Divider } from "theme-ui";
import Adi from "../Adi";
import InternalLink from "../InternalLink";
import { FaTwitter } from "react-icons/fa";
import ExternalLink from "../ExternalLink";
import { Locale, url } from "../../services/url";

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
    <Box
      p={3}
      as="footer"
      backgroundColor="veryDark"
      color="veryLight"
      sx={{
        gridArea: "footer",
        textAlign: "center"
      }}
    >
      <Box
        sx={{
          width: "50px",
          margin: "0 auto"
        }}
      >
        <Adi />
      </Box>

      <Box p={3}>
        <Heading
          sx={{
            fontSize: 2,
            textTransform: "uppercase"
          }}
          as="h2"
        >
          Vakoile D-pörssiä
        </Heading>

        <Box
          my={1}
          sx={{
            fontSize: 4,
            mx: 2
          }}
        >
          <ExternalLink
            aria-label="Diktaattoripörssin Twitter-tili"
            to="https://twitter.com/dporssi"
            icon={false}
          >
            <FaTwitter />
          </ExternalLink>{" "}
        </Box>
      </Box>

      <Box p={3}>
        <nav>
          <ul
            sx={{
              margin: 0,
              padding: 0,
              listStyleType: "none"
            }}
          >
            {links.map((link, i) => {
              return (
                <li
                  key={i}
                  sx={{
                    display: "inline-block",
                    listStylePosition: "inside",
                    margin: 0,
                    p: 0,
                    pr: 2,
                    pb: 1
                  }}
                >
                  <InternalLink variant="links.footer" to={link.to}>
                    {link.label}
                  </InternalLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <Box my={3}>
          <a
            href="https://creativecommons.org/licenses/by/1.0/fi/"
            rel="license"
          >
            <img
              src="https://i.creativecommons.org/l/by/1.0/fi/80x15.png"
              width="85"
              height="15"
              alt="Creative Commons License"
              sx={{
                verticalAlign: "middle",
                marginRight: 1
              }}
            />
          </a>
          copyright © Mikko Forsström. Käytä miten lystäät,{" "}
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
