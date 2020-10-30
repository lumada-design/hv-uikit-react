import dawn from "../../packages/themes/src/dawn";
import wicked from "../../packages/themes/src/wicked";

import storybookThemeFromUiKitTheme from "./storybookThemeFromUiKitTheme";

const dawnTheme = storybookThemeFromUiKitTheme(dawn);
const wickedTheme = storybookThemeFromUiKitTheme(wicked);

export { dawnTheme, wickedTheme };

export const getStorybookTheme = (theme) => (theme === "wicked" ? wickedTheme : dawnTheme);

export const getStoredTheme = () => {
  const stored = window.localStorage.getItem(UIKIT_THEME);
  if (typeof stored === "string") {
    return stored;
  }

  // default value
  return "dawn";
};

export const setStoredTheme = (theme) => {
  window.localStorage.setItem(UIKIT_THEME, theme);
};

export const UIKIT_THEME = "uikit-theme";

export { default as ThemeSelector } from "./ThemeSelector";

export * from "./StylesOverrides";
