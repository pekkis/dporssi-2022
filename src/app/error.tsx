"use client";

import { useEffect } from "react";
import { BrowserMicroSentryClient } from "@micro-sentry/browser";
import ServerError from "@/components/errors/ServerError";

// A page crashed: report it, and show the "system has collapsed" page.
export default function Error({
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

  return <ServerError />;
}
