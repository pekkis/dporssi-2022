import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      Diktaattoripörssi: "Axis of Evil",
      dictatorAge: "höhööö",
    },
  },
  fi: {
    translation: {
      Diktaattoripörssi: "Diktaattoripörssi",
      dictatorAge: "{{age, age}} vuotta",
    },
  },
};

i18n
  .use(initReactI18next) // bind react-i18next to the instance
  .init({
    resources,
    lng: process.env.NEXT_PUBLIC_LOCALE,

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      format: (value, format, locale) => {
        if (format === "age") {
          const formatter = new Intl.NumberFormat(locale);
          return formatter.format(value);
        }
        return value;
      },
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
