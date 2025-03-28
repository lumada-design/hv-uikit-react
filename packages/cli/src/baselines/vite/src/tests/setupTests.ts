import type { TransProps } from "react-i18next";
import type { ThirdPartyModule, TOptionsBase } from "i18next";
import { vi } from "vitest";

import "@testing-library/jest-dom";

vi.mock("react-i18next", async () => {
  const { initReactI18next } = await vi.importActual<{
    initReactI18next: ThirdPartyModule;
  }>("react-i18next");

  const t = (str: any, options?: TOptionsBase) =>
    options?.returnObjects ? undefined : str;

  return {
    initReactI18next,
    Trans: ({ i18nKey }: TransProps<any>) => i18nKey,
    useTranslation: (ns: any) => ({
      t,
      i18n: { changeLanguage: async () => t },
    }),
  };
});
