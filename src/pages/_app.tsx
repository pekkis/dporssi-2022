import { IconContext } from "react-icons";
import { Context as ResponsiveContext } from "react-responsive";
import { I18nextProvider } from "react-i18next";
import i18n from "@/services/i18n";
import App from "@/components/App";

import type { AppProps } from "next/app";
import { FC, memo, ReactNode } from "react";
import { useIsHydrated } from "@/services/useIsHydrated";

const values = { style: { verticalAlign: "middle" } };

/*
export const wrapRootElement = ({ element }) => {
  return (
    <IconContext.Provider value={values}>
      <ResponsiveContext.Provider value={{ width: 1024 }}>
        <I18nextProvider i18n={i18n}>
          <App>{element}</App>
        </I18nextProvider>
      </ResponsiveContext.Provider>
    </IconContext.Provider>
  );
};
*/

type ResponsivizerProps = {
  children: ReactNode;
};

// The server renders for a 1024px screen; the browser uses its real width.
const Responsivizer: FC<ResponsivizerProps> = ({ children }) => {
  const context = useIsHydrated() ? undefined : { width: 1024 };

  return (
    <>
      <ResponsiveContext.Provider value={context}>
        {children}
      </ResponsiveContext.Provider>
    </>
  );
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <IconContext.Provider value={values}>
        <Responsivizer>
          <I18nextProvider i18n={i18n}>
            <App>
              <Component {...pageProps} />
            </App>
          </I18nextProvider>
        </Responsivizer>
      </IconContext.Provider>
    </>
  );
};

export default memo(MyApp);
