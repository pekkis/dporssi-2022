import { useMediaQuery } from "react-responsive";
import { breakpoints } from "@/styles/theme.css";

const tabletBreakpoint = breakpoints.tablet;
const desktopBreakpoint = breakpoints.desktop;

export const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: desktopBreakpoint });
  return isDesktop ? children : null;
};

export const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({
    minWidth: tabletBreakpoint,
    maxWidth: desktopBreakpoint - 1
  });
  return isTablet ? children : null;
};

export const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: tabletBreakpoint - 1 });

  return isMobile ? children : null;
};

export const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: tabletBreakpoint });
  return isNotMobile ? children : null;
};
