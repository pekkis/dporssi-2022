type SiteConfig = {
  lang: string;
  title: string;
  description: string;
  url: string;
  siteUrl: string;
  image: string;
  twitterUsername: string;
};

const siteConfig: SiteConfig = {
  lang: "fi",
  title: "Diktaattoripörssi",
  description:
    "Ainoa, aito ja oikea diktaattoriranking jo vuodesta 1999. Kirjaimellisesti historiallinen verkkoteos, jonka tekemiseen sinäkin voit osallistua.",
  url: process.env.SITE_URL,
  siteUrl: process.env.SITE_URL,
  image: "/public/icons/icon-144x144.png",
  twitterUsername: "@dporssi",
};

export default siteConfig;
