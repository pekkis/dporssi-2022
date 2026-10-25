import type { Metadata } from "next";
import NotFound from "@/components/errors/NotFound";

export const metadata: Metadata = { title: "Sivua ei löytynyt" };

export default function NotFoundPage() {
  return <NotFound />;
}
