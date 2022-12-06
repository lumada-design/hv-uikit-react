import { useState, useEffect } from "react";
import { useStorybookApi } from "@storybook/api";
import { themes as sbThemes } from "@storybook/theming";

import { setLocalTheme, getLocalTheme } from "../utils";

const getInitialMode = () => {
  const localTheme = getLocalTheme();
  const prefersDark = window?.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  return localTheme ?? (prefersDark ? "dark" : "light");
};

const useThemeSwitcher = (): ThemeSwitcher => {
  const initialMode = getInitialMode();
  const [themeMode, setThemeMode] = useState(initialMode);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isToggleMode] = useState(false);
  const [theme, setTheme] = useState<AddonTheme>();
  const api = useStorybookApi();

  useEffect(() => {
    const mode = theme ? theme.value : themeMode;

    setThemeMode(mode);
    setLocalTheme(mode);
    setIsDarkMode(mode === "dark");

    api.emit("THEME_SWITCH", theme);
    api.setOptions({ theme: sbThemes[mode as ThemeMode] });
  }, [theme]);

  const toggleTheme = () => {
    setThemeMode(themeMode === "dark" ? "light" : "dark");
  };

  return { setTheme, toggleTheme, isDarkMode, isToggleMode };
};

export default useThemeSwitcher;
