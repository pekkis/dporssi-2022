"use client";

import { useEffect } from "react";
import { BrowserMicroSentryClient } from "@micro-sentry/browser";
import "@/styles/global.css";
import ServerError from "@/components/errors/ServerError";

// The root layout itself crashed: render a bare page without it.
export default function GlobalError({
  error
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    new BrowserMicroSentryClient({
      dsn: "https://fac204d2785f4df786731dea1335ba9b@o330495.ingest.sentry.io/5574416",
      environment: process.env.NODE_ENV || "development"
    }).report(error);
  }, [error]);

  return (
    <html lang="fi">
      <body>
        <ServerError />
      </body>
    </html>
  );
}
