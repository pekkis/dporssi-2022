import InternalLink from "@/components/InternalLink";
import { Locale, url } from "@/services/url";
import { memo } from "react";
import UserMenu from "./UserMenu";

type Props = {
  mobile?: boolean;
};

const MainMenu = ({ mobile = false }: Props) => {
  return (
    <nav aria-label="Päävalikko" id="main-menu" className={mobile ? "mx-2 mb-2" : ""}>
      <ul
        className={`${mobile ? "block" : "flex"} w-full m-0 p-0 list-none content-center items-center justify-end`}
      >
        <li className="mr-1">
          <InternalLink
            variant="links.menu"
            to={url("index", process.env.NEXT_PUBLIC_LOCALE as Locale)()}
            isActive={(router) => {
              return router.asPath === "/";
            }}
          >
            Etusivu
          </InternalLink>
        </li>
        <li className="mr-1">
          <InternalLink
            variant="links.menu"
            to={url(
              "dictatorIndex",
              process.env.NEXT_PUBLIC_LOCALE as Locale
            )()}
            isActive={(router) => {
              return router.asPath.startsWith("/diktaattorit/");
            }}
          >
            Pörssi
          </InternalLink>
        </li>
        <li className="mr-1">
          <InternalLink
            variant="links.menu"
            to={url("dictators", process.env.NEXT_PUBLIC_LOCALE as Locale)()}
            isActive={(router) => {
              return router.asPath === "/diktaattorihaku";
            }}
          >
            Haku
          </InternalLink>
        </li>
        <li className="mr-1">
          <InternalLink
            variant="links.menu"
            to={url(
              "classificationIndex",
              process.env.NEXT_PUBLIC_LOCALE as Locale
            )()}
            isActive={(router) => {
              return router.asPath.startsWith("/luokittelu");
            }}
          >
            Luokittelu
          </InternalLink>
        </li>
        <li className="mr-1">
          <InternalLink
            variant="links.menu"
            to={url("newsIndex", process.env.NEXT_PUBLIC_LOCALE as Locale)()}
            isActive={(router) => {
              return router.asPath.startsWith("/valeuutiset");
            }}
          >
            Valeuutiset
          </InternalLink>
        </li>

        <UserMenu />
      </ul>
    </nav>
  );
};

export default memo(MainMenu);
