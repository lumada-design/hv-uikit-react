import { useState, useEffect } from "react";
import { useStorybookApi } from "@storybook/api";
import { themes as sbThemes } from "@storybook/theming";
import { STORY_PREPARED } from "@storybook/core-events";

import useIsMounted from "hooks/useIsMounted";
import { setLocalTheme, getLocalTheme } from "utils/storage";

const getInitialTheme = () => {
  const localTheme = getLocalTheme();
  const prefersDark = window?.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  return localTheme ?? (prefersDark ? "dark" : "light");
};

const useThemeSwitcher = (): ThemeSwitcher => {
  const initialTheme = getInitialTheme();
  const [theme, setTheme] = useState(initialTheme);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isToggleMode, setIsToggleMode] = useState(false);
  const isMounted = useIsMounted();
  const api = useStorybookApi();

  useEffect(() => {
    setLocalTheme(theme);
    setIsDarkMode(theme === "dark");

    api.emit("THEME_SWITCH", theme);
    api.setOptions({ theme: sbThemes[theme as ThemeMode] });
  }, [theme]);

  useEffect(() => {
    api.on(STORY_PREPARED, ({ parameters: { themes } }) => {
      if (isMounted() && !themes?.length) {
        setIsToggleMode(true);
      }
    });
  }, [isMounted]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return { theme, setTheme, toggleTheme, isDarkMode, isToggleMode };
};

export default useThemeSwitcher;
