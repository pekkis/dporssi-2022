import Adi from "@/components/Adi";
import InternalLink from "@/components/InternalLink";
import { Locale, url } from "@/services/url";
import { FaTwitter } from "react-icons/fa";
import ExternalLink from "@/components/ExternalLink";

const links = [
  {
    to: url("guestbookIndex", process.env.NEXT_PUBLIC_LOCALE as Locale)(1),
    label: "Vieraskirja"
  },
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
    <footer
      className="p-4 bg-very-dark text-very-light text-center"
      style={{ gridArea: "footer" }}
    >
      <div className="w-[50px] mx-auto">
        <Adi />
      </div>

      <div className="p-4">
        <h2 className="text-base uppercase font-bold">Vakoile D-pörssiä</h2>

        <div className="my-1 text-2xl mx-2">
          <ExternalLink
            aria-label="Diktaattoripörssin Twitter-tili"
            to="https://twitter.com/dporssi"
            icon={false}
          >
            <FaTwitter />
          </ExternalLink>{" "}
        </div>
      </div>

      <div className="p-4">
        <nav>
          <ul className="m-0 p-0 list-none">
            {links.map((link, i) => {
              return (
                <li
                  key={i}
                  className="inline-block m-0 p-0 pr-2 pb-1"
                >
                  <InternalLink variant="links.footer" to={link.to}>
                    {link.label}
                  </InternalLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="my-4">
          <a
            href="https://creativecommons.org/licenses/by/1.0/fi/"
            rel="license"
          >
            <img
              src="https://i.creativecommons.org/l/by/1.0/fi/80x15.png"
              width="85"
              height="15"
              alt="Creative Commons License"
              className="align-middle mr-1 inline"
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
