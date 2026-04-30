import dynamic from "next/dynamic";

import InternalLink from "@/components/InternalLink";

const LazyLoadedUserMenu = dynamic(() => import("./UserMenu"), {
  suspense: true,
  loading: () => (
    <li>
      <InternalLink variant="menu" to="/kirjaudu">
        Kirjaudu
      </InternalLink>
    </li>
  )
});

export default LazyLoadedUserMenu;
