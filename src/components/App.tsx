import { useCallback, Suspense, type ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import "@/styles/global.css";
import LazyLoadedUserInitializer from "./LazyLoadedUserInitializer";
import ServerError from "@/components/errors/ServerError";
import { BrowserMicroSentryClient } from "@micro-sentry/browser";

const App = ({ children }: { children: ReactNode }) => {
  const errorHandler = useCallback((error: unknown) => {
    const e = error instanceof Error ? error : new Error(String(error));
    const client = new BrowserMicroSentryClient({
      dsn: "https://fac204d2785f4df786731dea1335ba9b@o330495.ingest.sentry.io/5574416",
      environment: process.env.NODE_ENV || "development"
    });
    client.report(e);
  }, []);

  return (
    <ErrorBoundary FallbackComponent={ServerError} onError={errorHandler}>
      <Suspense fallback={null}>
        <LazyLoadedUserInitializer />
      </Suspense>
      {children}
    </ErrorBoundary>
  );
};

export default App;
