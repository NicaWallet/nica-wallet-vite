import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import languageDetector from "i18next-browser-languagedetector";
import enTranslation from "./locales/en/translation.json";
import esTranslation from "./locales/es/translation.json";

i18n
  .use(languageDetector) // Detecta el idioma del usuario
  .use(initReactI18next) // Conecta i18next con react-i18next
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      es: {
        translation: esTranslation,
      },
    },
    lng: "en", // Idioma por defecto
    fallbackLng: "en", // Idioma de respaldo en caso de que falten traducciones
    interpolation: {
      escapeValue: false, // React ya se encarga de esto por defecto
    },
    detection: {
      // Opciones adicionales de detección si es necesario
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage', 'cookie'],
    },
  });

export default i18n;
