import { useState, useEffect } from "react";
import { themes } from "theme";
import { parseThemes } from "theme/utils";

export const useTheme = () => {
  let tParsed = parseThemes(themes);

  const [selectedTheme, setSelectedTheme] = useState(tParsed.selected);
  const [selectedColorMode, setSelectedColorMode] = useState(
    tParsed.selectedColorMode
  );
  const [themeColorModes, setThemeColorModes] = useState(tParsed.colorModes);

  useEffect(() => {
    tParsed = parseThemes(themes, selectedTheme, selectedColorMode);

    document.body.setAttribute(`data-theme`, tParsed.selected);
    document.body.setAttribute(`data-color-mode`, tParsed.selectedColorMode);

    setThemeColorModes(tParsed.colorModes);
    setSelectedColorMode(tParsed.selectedColorMode);
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
    themesNames: tParsed.names,
    selectedTheme,
    selectedColorMode,
    themeColorModes,
    changeTheme,
    changeColorMode,
  };
};
