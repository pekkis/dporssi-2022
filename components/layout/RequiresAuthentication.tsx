/** @jsxImportSource theme-ui */
import { FC, ReactNode } from "react";
import { Box, Paragraph } from "theme-ui";
import { useUserStore } from "../../services/state";
import SectionHeading from "../SectionHeading";

type Props = {
  children: ReactNode;
};

const RequiresAuthentication: FC<Props> = (props) => {
  const { children } = props;

  const user = useUserStore((state) => state.user);

  if (!user.isAuthenticated) {
    return (
      <Box>
        <SectionHeading>Pääsy kielletty!</SectionHeading>

        <Paragraph>
          Kaappausyritys havaittu. Salaiselle poliisille ilmoitettu.
        </Paragraph>
      </Box>
    );
  }

  return <>{children}</>;
};

export default RequiresAuthentication;
