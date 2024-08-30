import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import languageDetector from "i18next-browser-languagedetector";
import enTranslation from "./locales/en/translation.json";
import esTranslation from "./locales/es/translation.json";

i18n
  .use(languageDetector) // Detects the user's language
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      es: {
        translation: esTranslation,
      },
    },
    lng: "en", // Default language
    fallbackLng: "en", // Fallback language if the translation is missing
    interpolation: {
      escapeValue: false, // React already escapes values by default
    },
  });

export default i18n;
