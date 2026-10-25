import { useState } from "react";
import { useFloating } from "@floating-ui/react";
import { Box } from "@/components/ui";
import * as styles from "./UserMenu.css";
import { useUserStore, type UserInterface } from "@/services/state";
import InternalLink from "@/components/InternalLink";
import { FC } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/services/firebase";

const Avatar = ({ user }: { user: UserInterface }) => {
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
        className={styles.avatar}
        src={user.picture || "kikkare-url"}
      />

      {isOpen && (
        <Box
          ref={refs.setFloating}
          className={styles.dropdown}
          style={floatingStyles}
        >
          <Box as="nav">
            <Box className={styles.items}>
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
            </Box>
          </Box>
        </Box>
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
