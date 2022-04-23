export const isServer = (): boolean => {
  return typeof window === "undefined" ? false : true;
};
