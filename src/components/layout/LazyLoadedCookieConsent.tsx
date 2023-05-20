import dynamic from "next/dynamic";

const LazyLoadedCookieConsent = dynamic(() => import("./CookieConsent"), {
  ssr: false
});

export default LazyLoadedCookieConsent;
