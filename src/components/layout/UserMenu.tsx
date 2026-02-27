import { useState } from "react";
import { useFloating } from "@floating-ui/react";
import { useUserStore } from "@/services/state";
import InternalLink from "@/components/InternalLink";
import { FC } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/services/firebase";

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
        className="cursor-pointer rounded-full w-[30px] h-[30px] block align-middle border border-white"
        src={user.picture || "kikkare-url"}
        alt={user.displayName || "käyttäjä"}
      />

      {isOpen && (
        <div
          ref={refs.setFloating}
          className="bg-white p-2 text-very-dark relative border border-very-dark rounded-sm"
          style={floatingStyles}
        >
          <nav>
            <div className="m-0 p-0 text-center">
              <div>
                <InternalLink to="/omat-tiedot/porssi">Oma Pörssi</InternalLink>
              </div>

              <div>
                <InternalLink
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    signOut(auth);
                  }}
                >
                  Kirjaudu ulos
                </InternalLink>
              </div>
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
        <InternalLink variant="links.menu" to="/kirjaudu">
          Kirjaudu
        </InternalLink>
      </li>
    );
  }

  return <Avatar user={user} />;
};

export default UserMenu;
