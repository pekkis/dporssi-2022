import loadable from "@loadable/component";
import InternalLink from "../InternalLink";

const LazyLoadedUserMenu = loadable(() => import("./UserMenu"), {
  fallback: (
    <li>
      <InternalLink variant="links.menu" to="/kirjaudu">
        Kirjaudu
      </InternalLink>
    </li>
  )
});

export default LazyLoadedUserMenu;
