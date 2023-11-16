import { useMemo } from "react";
import i18next from "i18next";
import Backend, { HttpBackendOptions } from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { useApplicationBundleId } from "@hitachivantara/app-shell";

const initAppI18n = (baseUrl: string) => {
  const i18n = i18next.createInstance();

  const loadPath = baseUrl + "locales/{{lng}}/{{ns}}.json";

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
      ns: [],
      backend: {
        loadPath,
      },
      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      },
      react: {
        useSuspense: false, // it was constantly loading the translation files
      },
      load: "languageOnly",
    });

  return i18n;
};

const useI18nInstance = () => {
  const moduleId = useApplicationBundleId();
  const i18n = useMemo(
    () =>
      // TS picks up the Node's version of `import.meta.resolve` definition instead of the browser's
      // The browser's version of `import.meta.resolve` is defined in `src/types/import.meta.d.ts`
      // and it returns a string, not a Promise
      initAppI18n(import.meta.resolve?.(moduleId + "/") as unknown as string),
    [moduleId]
  );

  return i18n;
};

export default useI18nInstance;
