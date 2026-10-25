"use client";

import { Suspense, type ReactNode } from "react";
import { Context as ResponsiveContext } from "react-responsive";
import { I18nextProvider } from "react-i18next";
import i18n from "@/services/i18n";
import LazyLoadedUserInitializer from "@/components/LazyLoadedUserInitializer";
import { useIsHydrated } from "@/services/useIsHydrated";

// Client-side context for the whole site. (The old IconContext never took effect,
// so icons keep their default alignment.) The server renders the layout for a 1024px
// screen; the browser then uses its real width.
const Providers = ({ children }: { children: ReactNode }) => {
  const isHydrated = useIsHydrated();

  return (
    <ResponsiveContext value={isHydrated ? undefined : { width: 1024 }}>
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={null}>
          <LazyLoadedUserInitializer />
        </Suspense>
        {children}
      </I18nextProvider>
    </ResponsiveContext>
  );
};

export default Providers;
