import dynamic from "next/dynamic";

import InternalLink from "@/components/InternalLink";

const LazyLoadedUserMenu = dynamic(() => import("./UserMenu"), {
  suspense: true,
  loading: () => (
    <li>
      <InternalLink variant="links.menu" to="/kirjaudu">
        Kirjaudu
      </InternalLink>
    </li>
  )
});

export default LazyLoadedUserMenu;
