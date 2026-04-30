import { useState } from "react";
import { useFloating } from "@floating-ui/react";
import { Box } from "@/components/styled/Box";
import { useUserStore } from "@/services/state";
import InternalLink from "@/components/InternalLink";
import { FC } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/services/firebase";
import { avatar, popover, popoverList } from "./UserMenu.css";

const Avatar = (props) => {
  const { user } = props;

  const [isOpen, setOpen] = useState(false);

  const { refs, floatingStyles } = useFloating({
    strategy: "fixed",
    placement: "bottom"
  });

  return (
    <li>
      <img
        onClick={() => {
          setOpen(!isOpen);
        }}
        ref={refs.setReference}
        className={avatar}
        src={user.picture || "kikkare-url"}
      />

      {isOpen && (
        <div ref={refs.setFloating} className={popover} style={floatingStyles}>
          <nav>
            <div className={popoverList}>
              <Box>
                <InternalLink to="/omat-tiedot/porssi">Oma Pörssi</InternalLink>
              </Box>

              <Box>
                <InternalLink
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    signOut(auth);
                  }}
                >
                  Kirjaudu ulos
                </InternalLink>
              </Box>
            </div>
          </nav>
        </div>
      )}
    </li>
  );
};

const UserMenu: FC = () => {
  const user = useUserStore((state) => state.user);

  if (!user.isAuthenticated) {
    return (
      <li>
        <InternalLink variant="menu" to="/kirjaudu">
          Kirjaudu
        </InternalLink>
      </li>
    );
  }

  return <Avatar user={user} />;
};

export default UserMenu;
