import { themes, parseTheme } from "@hitachivantara/uikit-styles";

export const setElementAttrs = (
  elementId?: string,
  selectedTheme?: string,
  selectedMode?: string
) => {
  // TODO: maybe the themes should be passed as a parameter to support custom themes
  const theme = parseTheme(themes, selectedTheme, selectedMode);
  const element =
    (elementId && document.getElementById(elementId)) || document.body;

  element.setAttribute(`data-theme`, theme.selected);
  element.setAttribute(`data-color-mode`, theme.selectedMode);

  // TODO: maybe this should be set at theme level (e.g background-color)
  element.style.backgroundColor =
    themes[theme.selected]?.colors.modes[theme.selectedMode]?.atmo2;
};
