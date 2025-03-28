import "i18next";

import translation from "./localization/en.json";

declare module "i18next" {
  interface CustomTypeOptions {
    resources: {
      translation: typeof translation;
      configTranslations: Record<string, string>; // accept any key
    };
  }
}
