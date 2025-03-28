import { initReactI18next } from "react-i18next";
import { createInstance, type i18n } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

export const APP_SHELL_NAMESPACE = "appShell";
export const CONFIG_TRANSLATIONS_NAMESPACE = "configTranslations";

export const addResourceBundles = (
  i18nInstance: i18n,
  bundles: Record<string, object>,
  namespace?: string,
) => {
  Object.entries(bundles).forEach((entry) => {
    const [key, value] = entry;
    i18nInstance.addResourceBundle(
      key,
      namespace || APP_SHELL_NAMESPACE,
      value,
    );
  });
};

const createI18Next = (): { i18n: i18n } => {
  const newInstance = createInstance();
  newInstance
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      defaultNS: APP_SHELL_NAMESPACE,
      fallbackLng: "en",
      detection: { order: ["navigator"] },
      resources: {},
    });

  return {
    i18n: newInstance,
  };
};

export default createI18Next;
