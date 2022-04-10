/** @jsxImportSource theme-ui */

import InternalLink from "../InternalLink";
import { Locale, url } from "../../services/url";
import { memo } from "react";
import UserMenu from "./LazyLoadedUserMenu";

const MainMenu = (props) => {
  return (
    <nav aria-label="Päävalikko" {...props} id="main-menu">
      <ul
        sx={{
          display: ["block", "flex"],
          width: "100%",
          m: 0,
          p: 0,
          listStyleType: "none",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "flex-end",

          li: {
            mr: 1,
          },
        }}
      >
        <li>
          <InternalLink
            variant="links.menu"
            to={url("index", process.env.NEXT_PUBLIC_LOCALE as Locale)()}
          >
            Etusivu
          </InternalLink>
        </li>
        <li>
          <InternalLink
            partiallyActive
            variant="links.menu"
            to={url(
              "dictatorIndex",
              process.env.NEXT_PUBLIC_LOCALE as Locale
            )()}
          >
            Pörssi
          </InternalLink>
        </li>
        <li>
          <InternalLink
            partiallyActive
            variant="links.menu"
            to={url("dictators", process.env.NEXT_PUBLIC_LOCALE as Locale)()}
          >
            Haku
          </InternalLink>
        </li>
        <li>
          <InternalLink
            variant="links.menu"
            to={url(
              "classificationIndex",
              process.env.NEXT_PUBLIC_LOCALE as Locale
            )()}
            partiallyActive
          >
            Luokittelu
          </InternalLink>
        </li>
        <li>
          <InternalLink
            partiallyActive
            variant="links.menu"
            to={url("newsIndex", process.env.NEXT_PUBLIC_LOCALE as Locale)()}
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
