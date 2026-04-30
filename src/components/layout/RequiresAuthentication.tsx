import { FC, ReactNode } from "react";
import { useUserStore } from "@/services/state";
import SectionHeading from "@/components/SectionHeading";

type Props = {
  children: ReactNode;
};

const RequiresAuthentication: FC<Props> = (props) => {
  const { children } = props;

  const user = useUserStore((state) => state.user);

  if (!user.isAuthenticated) {
    return (
      <div>
        <SectionHeading>Pääsy kielletty!</SectionHeading>

        <p>Kaappausyritys havaittu. Salaiselle poliisille ilmoitettu.</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default RequiresAuthentication;
