/** @jsxImportSource theme-ui */
import { Box, jsx } from "theme-ui";
import React from "react";
import { useUserStore } from "../../services/state";
import SectionHeading from "../SectionHeading";

const RequiresAuthentication = (props) => {
  const { children } = props;

  const user = useUserStore((state) => state.user);

  if (!user.isAuthenticated) {
    return (
      <Box>
        <SectionHeading>Pääsy kielletty!</SectionHeading>

        <p>Kaappausyritys havaittu. Salaiselle poliisille ilmoitettu.</p>
      </Box>
    );
  }

  return <>{children}</>;
};

export default RequiresAuthentication;
