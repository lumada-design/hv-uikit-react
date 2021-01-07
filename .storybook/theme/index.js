import dawn from "../../packages/themes/src/dawn";
import wicked from "../../packages/themes/src/wicked";
import create from "./create";

const DEFAULT_THEME = "dawn";
export const UIKIT_THEME = "uikit-theme";

export const themes = {
  dawn: create(dawn),
  wicked: create(wicked),
};

export const getTheme = (theme) => {
  const isEyesStorybook = new URL(window.location).searchParams.get("eyes-storybook");

  if (isEyesStorybook) {
    // if being tested, don't rely on the stored theme but instead on the variation url parameter
    const eyesVariation = new URL(window.location).searchParams.get("eyes-variation");
    const eyesTheme = eyesVariation?.split(":")?.[1];

    return themes?.[eyesTheme] || themes?.[DEFAULT_THEME];
  }

  const stored = window.localStorage.getItem(UIKIT_THEME);
  const storedTheme = Object.keys(themes).find((theme) => theme === stored);

  return themes?.[theme] || themes?.[storedTheme] || themes?.[DEFAULT_THEME];
};

export const storeTheme = (theme) => {
  window.localStorage.setItem(UIKIT_THEME, theme);
};

export const getStoredTheme = () => {
  const stored = window.localStorage.getItem(UIKIT_THEME);
  if (typeof stored === "string") {
    return stored;
  }

  // default value
  return "dawn";
};
