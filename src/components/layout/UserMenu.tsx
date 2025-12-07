/** @jsxImportSource theme-ui */

import { useState } from "react";
import { useFloating } from "@floating-ui/react";
import { Box } from "theme-ui";
import { useUserStore } from "@/services/state";
import InternalLink from "@/components/InternalLink";
import { FC } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/services/firebase";

const Avatar = (props) => {
  const { user } = props;

  const [isOpen, setOpen] = useState(false);

  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);

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
        sx={{
          cursor: "Pointer",
          borderRadius: "50%",
          width: "30px",
          height: "30px",
          display: "block",
          verticalAlign: "middle",
          borderColor: "white",
          borderStyle: "solid",
          borderWidth: "1px"
        }}
        src={user.picture || "kikkare-url"}
      />

      {isOpen && (
        <Box
          ref={refs.setFloating}
          sx={{
            backgroundColor: "white",
            padding: 2,
            color: "veryDark",
            position: "relative",
            borderColor: "veryDark",
            borderStyle: "solid",
            borderWidth: "1px",
            borderRadius: 1
          }}
          style={floatingStyles}
        >
          <Box as="nav">
            <Box
              sx={{
                m: 0,
                p: 0,
                textAlign: "center"
              }}
            >
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
        <InternalLink variant="links.menu" to="/kirjaudu">
          Kirjaudu
        </InternalLink>
      </li>
    );
  }

  return <Avatar user={user} />;
};

export default UserMenu;
