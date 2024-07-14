import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en/translation.json";
import zh from "./locales/zh/translation.json";

i18n
  .use(initReactI18next) // passes i18n instance to react-i18next
  .init({
    compatibilityJSON: "v3",
    resources: {
      en: {
        translation: en,
      },
      zh: {
        translation: zh,
      },
    },
    fallbackLng: "en",
    lng: "en", // language to use (if not using language detector)
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
