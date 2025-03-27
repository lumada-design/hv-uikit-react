import { initReactI18next } from "react-i18next";
import i18next, { i18n } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const DUMMY_NAMESPACE = "DummyNamespace";

export const addResourceBundles = (
  i18nInstance: i18n,
  bundles: Record<string, object>,
  namespace?: string,
) => {
  Object.entries(bundles).forEach((entry) => {
    const [key, value] = entry;
    i18nInstance.addResourceBundle(key, namespace || DUMMY_NAMESPACE, value);
  });
};

export const createI18Next = () => {
  const newInstance = i18next.createInstance();
  newInstance
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      defaultNS: DUMMY_NAMESPACE,
      fallbackLng: "en",
      detection: { order: ["navigator"] },
      resources: {},
    });

  return {
    i18n: newInstance,
  };
};
