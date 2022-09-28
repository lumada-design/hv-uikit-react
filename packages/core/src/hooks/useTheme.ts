import { useState, useEffect } from "react";
import { hvThemes } from "theme";
import { parseThemes } from "theme/utils";

export const useTheme = () => {
  let themes = parseThemes(hvThemes);

  const [selectedTheme, setSelectedTheme] = useState(themes.selected);
  const [selectedColorMode, setSelectedColorMode] = useState(
    themes.selectedColorMode
  );
  const [themeColorModes, setThemeColorModes] = useState(themes.colorModes);

  useEffect(() => {
    themes = parseThemes(hvThemes, selectedTheme, selectedColorMode);

    document.body.setAttribute(`data-theme`, themes.selected);
    document.body.setAttribute(`data-color-mode`, themes.selectedColorMode);

    setThemeColorModes(themes.colorModes);
    setSelectedColorMode(themes.selectedColorMode);
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
    themesNames: themes.names,
    selectedTheme,
    selectedColorMode,
    themeColorModes,
    changeTheme,
    changeColorMode,
  };
};
