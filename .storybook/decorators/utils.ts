import { useEffect, useRef } from "react";
import { HvThemeStructure } from "@hitachivantara/uikit-styles";

const STORAGE_KEY = "sb-uikit-stories-theme";
const DEFAULT_THEME = "pentaho";

export interface Theme {
  label: string;
  mode: string;
}

export const setLocalTheme = (value: string) => {
  localStorage?.setItem(STORAGE_KEY, value);
};

const getLocalTheme = () => {
  return localStorage?.getItem(STORAGE_KEY);
};

export const getInitialTheme = (themes: Theme[]) => {
  const localTheme = getLocalTheme();
  const prefersDark = window?.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;

  const initialTheme = localTheme ? localTheme.split(" ")[0] : DEFAULT_THEME;
  const initialMode = localTheme
    ? localTheme.split(" ")[1]
    : `${prefersDark ? "dark" : "light"}`;

  return (
    themes.find((theme) => theme.label === `${initialTheme} ${initialMode}`) ||
    themes[0]
  );
};

/** Return a `ref` that adds/removes `dark` class variant depending on `mode` */
export const useDarkClass = <T extends HTMLElement = HTMLDivElement>(
  mode: string,
) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (mode === "dark") {
      ref.current?.classList.add("dark");
    } else {
      ref.current?.classList.remove("dark");
    }
  }, [mode]);

  return ref;
};

/** Returns an array with the available themes */
export const getThemesList = (themes: Record<string, HvThemeStructure>) => {
  const themesList: Theme[] = [];

  Object.keys(themes).forEach((themeName) => {
    const theme = themes[themeName];
    const colorModes = Object.keys(theme.colors.modes);
    colorModes.forEach((colorMode) => {
      const isDark = colorMode.includes("dark");
      themesList.push({
        label: `${themeName} ${colorMode}`,
        mode: isDark ? "dark" : "light",
      });
    });
  });

  return themesList;
};
