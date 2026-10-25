import { useCallback, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import "@/styles/global.css";
import LazyLoadedUserInitializer from "./LazyLoadedUserInitializer";
import InfernalServerErrorPage from "@/pages/500";
import { useMemo } from "react";
import { BrowserMicroSentryClient } from "@micro-sentry/browser";

const App = (props) => {
  const { children } = props;

  const errorHandler = useCallback((e: Error) => {
    const client = new BrowserMicroSentryClient({
      dsn: "https://fac204d2785f4df786731dea1335ba9b@o330495.ingest.sentry.io/5574416",
      environment: process.env.NODE_ENV || "development"
    });
    client.report(e);
  }, []);

  return (
    <ErrorBoundary
      FallbackComponent={InfernalServerErrorPage}
      onError={errorHandler}
    >
      <Suspense fallback={null}>
        <LazyLoadedUserInitializer />
      </Suspense>
      {children}
    </ErrorBoundary>
  );
};

export default App;
