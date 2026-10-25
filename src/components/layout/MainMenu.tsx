import InternalLink from "@/components/InternalLink";
import { Locale, url } from "@/services/url";
import { memo } from "react";
import UserMenu from "./UserMenu";
import * as styles from "./MainMenu.css";

const MainMenu = ({ className }: { className?: string }) => {
  return (
    <nav aria-label="Päävalikko" className={className} id="main-menu">
      <ul className={styles.list}>
        <li>
          <InternalLink
            variant="menu"
            to={url("index", process.env.NEXT_PUBLIC_LOCALE as Locale)()}
            isActive={(router) => {
              return router.asPath === "/";
            }}
          >
            Etusivu
          </InternalLink>
        </li>
        <li>
          <InternalLink
            variant="menu"
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
        <li>
          <InternalLink
            variant="menu"
            to={url("dictators", process.env.NEXT_PUBLIC_LOCALE as Locale)()}
            isActive={(router) => {
              return router.asPath === "/diktaattorihaku";
            }}
          >
            Haku
          </InternalLink>
        </li>
        <li>
          <InternalLink
            variant="menu"
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
        <li>
          <InternalLink
            variant="menu"
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
