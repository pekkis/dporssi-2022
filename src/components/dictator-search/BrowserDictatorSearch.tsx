"use client";

import Spinner from "@/components/Spinner";
import { useIsHydrated } from "@/services/useIsHydrated";
import type { Dictator } from "@/types";
import DictatorSearch from "./DictatorSearch";

// The search runs in the browser; the server renders a spinner.
const BrowserDictatorSearch = ({ dictators }: { dictators: Dictator[] }) =>
  useIsHydrated() ? <DictatorSearch dictators={dictators} /> : <Spinner />;

export default BrowserDictatorSearch;
