import { useState, useEffect } from "react";
import { themes, parseThemes } from "@hitachivantara/uikit-styles";

export const useTheme = () => {
  const themesNames = Object.keys(themes);
  let theme = parseThemes(themes);

  const [selectedTheme, setSelectedTheme] = useState(theme.selected);
  const [selectedColorMode, setSelectedColorMode] = useState(
    theme.selectedColorMode
  );
  const [themeColorModes, setThemeColorModes] = useState(theme.colorModes);

  useEffect(() => {
    theme = parseThemes(themes, selectedTheme, selectedColorMode);

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
    themesNames,
    selectedTheme,
    selectedColorMode,
    themeColorModes,
    changeTheme,
    changeColorMode,
  };
};
