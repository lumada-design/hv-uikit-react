import { useState, useEffect } from "react";
import {
  themes,
  parseTheme,
  getThemesModes,
  getThemesVars,
} from "@hitachivantara/uikit-styles";

export const useTheme = () => {
  const themesVars = getThemesVars(themes);
  const themesModes = getThemesModes(themes);

  let theme = parseTheme(themes);

  const [selectedTheme, setSelectedTheme] = useState(theme.selected);
  const [selectedMode, setSelectedMode] = useState(theme.selectedMode);
  const [colorModes, setColorModes] = useState(theme.colorModes);

  const setThemeAttrs = (
    dataTheme = selectedTheme,
    dataColorMode = selectedMode
  ) => {
    document.body.setAttribute(`data-theme`, dataTheme);
    document.body.setAttribute(`data-color-mode`, dataColorMode);
  };

  useEffect(() => {
    theme = parseTheme(themes, selectedTheme, selectedMode);

    setColorModes(theme.colorModes);
    setSelectedMode(theme.selectedMode);

    setThemeAttrs(theme.selected, theme.selectedMode);
  }, [selectedTheme]);

  useEffect(() => {
    setThemeAttrs(selectedTheme, selectedMode);
  }, [selectedMode]);

  const onChangeTheme = (nextTheme: string) => {
    setSelectedTheme(nextTheme);
  };

  const onChangeColorMode = (nextColorMode: string) => {
    setSelectedMode(nextColorMode);
  };

  return {
    themesVars,
    themesModes,
    selectedTheme,
    selectedMode,
    colorModes,
    onChangeTheme,
    onChangeColorMode,
    setThemeAttrs,
  };
};
