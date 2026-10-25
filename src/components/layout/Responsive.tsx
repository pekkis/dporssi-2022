"use client";

import type { ReactNode } from "react";
import { useMediaQuery } from "react-responsive";
import { breakpoints } from "@/styles/breakpoints";

// breakpoints: ["480px", "640px", "1366px"],

const { tablet: tabletBreakpoint, desktop: desktopBreakpoint } = breakpoints;

export const Desktop = ({ children }: { children: ReactNode }) => {
  const isDesktop = useMediaQuery({ minWidth: desktopBreakpoint });
  return isDesktop ? children : null;
};

export const Tablet = ({ children }: { children: ReactNode }) => {
  const isTablet = useMediaQuery({
    minWidth: tabletBreakpoint,
    maxWidth: desktopBreakpoint - 1
  });
  return isTablet ? children : null;
};

export const Mobile = ({ children }: { children: ReactNode }) => {
  const isMobile = useMediaQuery({ maxWidth: tabletBreakpoint - 1 });

  return isMobile ? children : null;
};

export const Default = ({ children }: { children: ReactNode }) => {
  const isNotMobile = useMediaQuery({ minWidth: tabletBreakpoint });
  return isNotMobile ? children : null;
};
