import { STORAGE_KEY } from "../constants";

export const setLocalTheme = (value: string): void => {
  return localStorage?.setItem(STORAGE_KEY, value);
};

export const getLocalTheme = (): string | null => {
  return localStorage?.getItem(STORAGE_KEY);
};

export const getThemesModes = (themes) => {
  const modes: string[] = [];

  Object.keys(themes).forEach((themeName) => {
    const theme = themes[themeName];
    const colorModes = Object.keys(theme.colors.modes);

    colorModes.forEach((colorMode) => {
      modes.push(`${themeName}-${colorMode}`);
    });
  });

  return modes;
};

export const toPascalCase = (str: string) =>
  str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
