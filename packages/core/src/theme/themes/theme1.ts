import { baseThemeTokens } from "../tokens";

const theme = {
  light: {
    colors: { ...baseThemeTokens.colors.light },
    typography: { ...baseThemeTokens.typography },
  },
  dark: {
    colors: { ...baseThemeTokens.colors.dark },
    typography: { ...baseThemeTokens.typography },
  },
};

export default theme;
