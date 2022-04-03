import { DateTime } from "luxon";
import {
  PossibleHighlights,
  PossibleSortrados
} from "../components/dictator-search/service";
import { Country, Dictator, FakeNews } from "../types";

const urls = {
  index: {
    fi: () => "/",
    en: () => "/"
  },

  classificationIndex: {
    fi: () => "/luokittelu",
    en: () => "/classification"
  },

  continent: {
    fi: (item: Dictator) => `/diktaattorit/${item.slug}`,
    en: (item: Dictator) => `/dictators/${item.slug}`
  },

  country: {
    fi: (item: Country) => `/diktaattorit/${item.continent.slug}/${item.slug}`,
    en: (item: Country) => `/dictators/${item.continent.slug}/${item.slug}`
  },

  classificationItem: {
    fi: (item: Country) => `/luokittelu/${item.slug}`,
    en: (item: Country) => `/classification/${item.slug}`
  },

  dictatorIndex: {
    fi: (page: number = 1) => {
      return page === 1 ? `/diktaattorit` : `/diktaattorit/sivu/${page}`;
    },
    en: (page: number = 1) => {
      return page === 1 ? `/dictators` : `/dictators/page/${page}`;
    }
  },
  dictatorItem: {
    fi: (item: Dictator) => `/diktaattori/${item.slug}`,
    en: (item: Dictator) => `/dictator/${item.slug}`
  },

  newsIndex: {
    fi: (page = 1) => {
      return page === 1 ? `/valeuutiset` : `/valeuutiset/sivu/${page}`;
    },
    en: (page = 1) => {
      return page === 1 ? `/fake-news` : `/fake-news/page/${page}`;
    }
  },
  newsItem: {
    fi: (item: FakeNews) => {
      const date = DateTime.fromISO(item.date)
        .setZone("Europe/Helsinki")
        .setLocale("fi");

      return `/valeuutiset/${date.toFormat("yyyy")}/${date.toFormat(
        "LL"
      )}/${date.toFormat("dd")}/${item.slug}`;
    },
    en: (item: FakeNews) => {
      const date = DateTime.fromISO(item.date)
        .setZone("Europe/Helsinki")
        .setLocale("fi");

      return `/fake-news/${date.toFormat("yyyy")}/${date.toFormat(
        "LL"
      )}/${date.toFormat("dd")}/${item.slug}`;
    }
  },

  guestbookIndex: {
    fi: (page = 1) => {
      return page === 1 ? `/vieraskirja` : `/vieraskirja/sivu/${page}`;
    },
    en: (page = 1) => {
      return page === 1 ? `/guestbook` : `/guestbook/page/${page}`;
    }
  },

  /* static basic pages */

  about: {
    fi: () => "/tietoa-porssista",
    en: () => "/about"
  },
  contact: {
    fi: () => "/ota-yhteytta",
    en: () => "/contact"
  },
  cookiePolicy: {
    fi: () => "/keksipolitiikka",
    en: () => "/cookie-politics"
  },
  dictators: {
    fi: (params?: DictatorsPageParams) => {
      if (!params) {
        return "/diktaattorihaku";
      }

      const urlParams = new URLSearchParams(params);
      return `/diktaattorihaku?${urlParams}`;
    },
    en: (params?: DictatorsPageParams) => {
      if (!params) {
        return "/dictator-search";
      }

      return "/dictator-search";
    }
  },
  privacyPolicy: {
    fi: () => "/rekisteriseloste",
    en: () => "/privacy-policy"
  },
  termsOfUse: {
    fi: () => "/kayttoehdot",
    en: () => "/terms-of-use"
  },
  login: {
    fi: () => "/kirjaudu",
    en: () => "/login"
  }
};

type DictatorsPageParams = {
  sortBy: PossibleSortrados;
  highlight: PossibleHighlights;
};

export type Locale = "fi" | "en";

export type RouteName = keyof typeof urls;

export const url = <A extends RouteName>(
  name: A,
  locale: Locale
): typeof urls[A][Locale] => {
  return urls[name][locale];
};
