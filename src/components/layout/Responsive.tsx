import { useMediaQuery } from "react-responsive";

const tabletBreakpoint = 768;
const desktopBreakpoint = 992;

type Props = { children: React.ReactNode };

export const Desktop = ({ children }: Props) => {
  const isDesktop = useMediaQuery({ minWidth: desktopBreakpoint });
  return isDesktop ? children : null;
};

export const Tablet = ({ children }: Props) => {
  const isTablet = useMediaQuery({
    minWidth: tabletBreakpoint,
    maxWidth: desktopBreakpoint - 1
  });
  return isTablet ? children : null;
};

export const Mobile = ({ children }: Props) => {
  const isMobile = useMediaQuery({ maxWidth: tabletBreakpoint - 1 });

  return isMobile ? children : null;
};

export const Default = ({ children }: Props) => {
  const isNotMobile = useMediaQuery({ minWidth: tabletBreakpoint });
  return isNotMobile ? children : null;
};
