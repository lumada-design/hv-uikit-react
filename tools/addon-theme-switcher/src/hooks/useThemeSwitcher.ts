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
  const [theme, setTheme] = useState<Theme>();
  const api = useStorybookApi();

  useEffect(() => {
    const mode = theme ? theme.value : themeMode;
    const iframe = document.getElementById(
      "storybook-preview-iframe"
    ) as HTMLIFrameElement;

    setThemeMode(mode);
    setLocalTheme(mode);
    setIsDarkMode(mode === "dark");

    api.emit("THEME_SWITCH", theme);
    api.setOptions({ theme: sbThemes[mode as ThemeMode] });

    const themeSelected = theme?.name.split("-");
    if (themeSelected) {
      const contentWindow = iframe.contentWindow?.document.getElementsByTagName(
        "body"
      )[0] as HTMLBodyElement;
      contentWindow.setAttribute(`data-theme`, themeSelected[0]);
      contentWindow.setAttribute(`data-color-mode`, themeSelected[1]);
    }
  }, [theme]);

  const toggleTheme = () => {
    setThemeMode(themeMode === "dark" ? "light" : "dark");
  };

  return { setTheme, toggleTheme, isDarkMode, isToggleMode };
};

export default useThemeSwitcher;
