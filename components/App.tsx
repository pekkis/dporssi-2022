import { useCallback, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import theme from "../services/theme";
import { ThemeProvider } from "theme-ui";
import { Global } from "@emotion/react";
import LazyLoadedUserInitializer from "./LazyLoadedUserInitializer";
import InfernalServerErrorPage from "../pages/500";
import { useMemo } from "react";
import { BrowserMicroSentryClient } from "@micro-sentry/browser";

const App = (props) => {
  const { children } = props;

  const client = useMemo<BrowserMicroSentryClient>(() => {
    const client = new BrowserMicroSentryClient({
      dsn: "https://fac204d2785f4df786731dea1335ba9b@o330495.ingest.sentry.io/5574416",
      environment: process.env.NODE_ENV || "development"
    });
    return client;
  }, []);

  const errorHandler = useCallback(
    (e: Error) => {
      client.report(e);
    },
    [client]
  );

  return (
    <ErrorBoundary
      FallbackComponent={InfernalServerErrorPage}
      onError={errorHandler}
    >
      <ThemeProvider theme={theme}>
        <Global
          styles={{
            html: {},

            "html.wf-active": {},

            ".grecaptcha-badge": {
              visibility: "hidden"
            }
          }}
        />
        <Suspense fallback={null}>
          <LazyLoadedUserInitializer />
        </Suspense>
        {children}
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
