import { createTheme } from "@mui/material";
import dawnTheme from "@hitachivantara/uikit-common-themes/dist/dawn";
import wickedTheme from "@hitachivantara/uikit-common-themes/dist/wicked";

import muiAppBarOverrides from "./overrides/muiAppBar";
import muiToolbarOverrides from "./overrides/muiToolbar";
import muiIconButtonOverrides from "./overrides/muiIconButton";
import muiInputOverrides from "./overrides/muiInput";
import createTypography from "./typography";
import createPalette from "./palette";
import createSpacing, { hvSpacing } from "./spacing";

const getTheme = (uiKitTheme) => {
  switch (uiKitTheme) {
    default:
    case "dawn":
      return dawnTheme;
    case "wicked":
      return wickedTheme;
  }
};

const themeBuilder = (theme) => {
  const themeSpacing = createSpacing(theme);
  const themePalette = createPalette(theme);
  const themeTypography = createTypography(theme);

  return createTheme({
    shadows: Array(25).fill("none"),

    // MUI's spacing doesn't cover our use cases because of regression:
    // https://github.com/mui-org/material-ui/issues/21278
    spacing: themeSpacing,
    hvSpacing: hvSpacing(themeSpacing),

    palette: themePalette,
    typography: themeTypography,
    shape: {
      borderRadius: 0,
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1270,
        xl: 1920,
      },
    },
    props: {
      MuiButtonBase: {
        disableRipple: true,
      },
      MuiInput: {
        disableUnderline: true,
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: theme.palette.atmosphere.atmo1,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          ...muiAppBarOverrides(theme),
        },
      },
      MuiToolbar: {
        styleOverrides: {
          ...muiToolbarOverrides(theme),
        },
      },
      MuiIconButton: {
        styleOverrides: {
          ...muiIconButtonOverrides(theme),
        },
      },
      MuiInput: {
        styleOverrides: {
          ...muiInputOverrides,
        },
      },
    },
    hv: theme,
  });
};

const defaultTheme = themeBuilder(getTheme("dawn"));

export { default as createGenerateClassName } from "./createGenerateClassName";
export { default as HvCssBaseline } from "./CssBaseline";
export { default as HvScopedCssBaseline } from "./ScopedCssBaseline";
export { getTheme };

export { themeBuilder };
export default defaultTheme;
