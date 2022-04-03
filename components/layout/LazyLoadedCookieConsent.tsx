import loadable from "@loadable/component";

const LazyLoadedCookieConsent = loadable(() => import("./CookieConsent"));

export default LazyLoadedCookieConsent;
