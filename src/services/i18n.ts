import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      Diktaattoripörssi: "Axis of Evil"
    }
  },
  fi: {
    translation: {
      Diktaattoripörssi: "Diktaattoripörssi"
    }
  }
};

i18n
  .use(initReactI18next) // bind react-i18next to the instance
  .init({
    resources,
    lng: process.env.NEXT_PUBLIC_LOCALE,

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
