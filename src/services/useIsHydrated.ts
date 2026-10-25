import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** False on the server and while hydrating, true in the browser afterwards. */
export const useIsHydrated = (): boolean =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
