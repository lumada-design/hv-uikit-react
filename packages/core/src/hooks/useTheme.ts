import { useState, useEffect } from "react";
import {
  themes,
  parseTheme,
  getThemesModes,
  getThemesVars,
} from "@hitachivantara/uikit-styles";

export const useTheme = () => {
  const themesModes = getThemesModes(themes);
  const themesVars = getThemesVars(themes);

  let theme = parseTheme(themes);

  const [selectedTheme, setSelectedTheme] = useState(theme.selected);
  const [selectedColorMode, setSelectedColorMode] = useState(
    theme.selectedColorMode
  );
  const [themeColorModes, setThemeColorModes] = useState(theme.colorModes);

  useEffect(() => {
    theme = parseTheme(themes, selectedTheme, selectedColorMode);

    document.body.setAttribute(`data-theme`, theme.selected);
    document.body.setAttribute(`data-color-mode`, theme.selectedColorMode);

    setThemeColorModes(theme.colorModes);
    setSelectedColorMode(theme.selectedColorMode);
  }, [selectedTheme]);

  useEffect(() => {
    document.body.setAttribute(`data-color-mode`, selectedColorMode);
  }, [selectedColorMode]);

  const changeTheme = (nextTheme: string) => {
    setSelectedTheme(nextTheme);
  };

  const changeColorMode = (nextColorMode: string) => {
    setSelectedColorMode(nextColorMode);
  };

  return {
    themesModes,
    themesVars,
    selectedTheme,
    selectedColorMode,
    themeColorModes,
    changeTheme,
    changeColorMode,
  };
};
