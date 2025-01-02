import { useMemo } from "react";
import { createInstance } from "i18next";
import Backend, { type HttpBackendOptions } from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const initAppI18n = (baseUrl: string) => {
  const i18n = createInstance();

  const loadPath = `${baseUrl}locales/{{lng}}/{{ns}}.json`;

  i18n
    // load translation using xhr -> see /public/locales
    // learn more: https://github.com/i18next/i18next-xhr-backend
    .use(Backend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init<HttpBackendOptions>({
      fallbackLng: "en",
      supportedLngs: ["en"],
      backend: {
        loadPath,
      },
      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      },
      load: "languageOnly",
    });

  return i18n;
};

export const useI18nInstance = () => {
  const moduleId = "@hv-apps/uikit-app";
  const i18n = useMemo(
    () => initAppI18n(import.meta.resolve?.(`${moduleId}/`) || ""),
    [moduleId],
  );

  return i18n;
};
