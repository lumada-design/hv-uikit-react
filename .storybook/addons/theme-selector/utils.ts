const STORAGE_KEY = "sb-uikit-theme";
const DEFAULT_THEME = "ds5";

export const setLocalTheme = (value: string): void => {
  return localStorage?.setItem(STORAGE_KEY, value);
};

export const getLocalTheme = (): string | null => {
  return localStorage?.getItem(STORAGE_KEY);
};

export const getInitialTheme = (themes: Theme[]) => {
  const localTheme = getLocalTheme();
  const prefersDark = window?.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  const initialTheme = localTheme ? localTheme.split("-")[0] : DEFAULT_THEME;
  const initialMode = localTheme
    ? localTheme.split("-")[1]
    : `${prefersDark ? "wicked" : "dawn"}`;

  return (
    themes.find((theme) => theme.name === `${initialTheme}-${initialMode}`) ||
    themes[0]
  );
};

const toPascalCase = (str: string) =>
  str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );

export const getThemesList = (themes) => {
  const themesList: Theme[] = [];

  Object.keys(themes).forEach((themeName) => {
    const theme = themes[themeName];
    const colorModes = Object.keys(theme.colors.modes);

    colorModes.forEach((colorMode) => {
      const isDark = colorMode.includes("dark") || colorMode.includes("wicked");

      themesList.push({
        name: `${themeName}-${colorMode}`,
        label: `${toPascalCase(themeName)} ${colorMode}`,
        mode: isDark ? "dark" : "light",
      });
    });
  });

  return themesList;
};
