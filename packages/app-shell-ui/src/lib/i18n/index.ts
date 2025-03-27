import { initReactI18next } from "react-i18next";
import i18next, { i18n } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./localization/en.json";
import pt from "./localization/pt.json";

export const APP_SHELL_NAMESPACE = "appShell";
export const addResourceBundles = (
  i18nInstance: i18n,
  bundles: Record<string, object>,
  namespace?: string,
) => {
  Object.entries(bundles).forEach((entry) => {
    const [key, value] = entry;
    i18nInstance.addResourceBundle(
      key,
      namespace ?? APP_SHELL_NAMESPACE,
      value,
    );
  });
};

const createI18Next = () => {
  const newInstance = i18next.createInstance();
  newInstance
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      defaultNS: APP_SHELL_NAMESPACE,
      fallbackLng: "en",
      detection: { order: ["navigator"] },
      resources: {},
    });

  newInstance.addResourceBundle("en", APP_SHELL_NAMESPACE, en);
  newInstance.addResourceBundle("pt", APP_SHELL_NAMESPACE, pt);

  return {
    i18n: newInstance,
  };
};

export default createI18Next;
