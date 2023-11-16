import "@testing-library/jest-dom";
import "whatwg-fetch";
import { vi } from "vitest";
import { TOptionsBase, ThirdPartyModule } from "i18next";
import { TransProps } from "react-i18next";

vi.mock("react-i18next", async () => {
  const { initReactI18next } = await vi.importActual<{
    initReactI18next: ThirdPartyModule;
  }>("react-i18next");

  const t = (str: string, options?: TOptionsBase) =>
    options?.returnObjects ? undefined : str;

  return {
    initReactI18next,
    Trans: ({ i18nKey }: TransProps<string>) => i18nKey,
    useTranslation: () => ({
      t,
      i18n: { changeLanguage: async () => t },
    }),
  };
});
