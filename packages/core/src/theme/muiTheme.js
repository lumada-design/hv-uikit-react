import { createMuiTheme } from "@material-ui/core";
import muiAppBarOverrides from "./overrides/muiAppBar";
import muiToolbarOverrides from "./overrides/muiToolbar";
import muiIconButtonOverrides from "./overrides/muiIconButton";
import createTypography from "./typography";
import createPalette from "./palette";

const muiThemeOverrider = uiKitTheme => {
  const themePalette = createPalette(uiKitTheme);
  const themeTypography = createTypography(themePalette, uiKitTheme);

  return createMuiTheme({
    shadows: Array(25).fill("none"),
    spacing: uiKitTheme.spacing,
    palette: themePalette,
    typography: themeTypography,
    shape: {
      borderRadius: 0
    },
    breakpoints: uiKitTheme.breakpoints,
    props: {
      MuiButtonBase: {
        disableRipple: true
      },
      MuiInput: {
        disableUnderline: true
      }
    },
    overrides: {
      MuiAppBar: {
        ...muiAppBarOverrides(uiKitTheme)
      },
      MuiToolbar: {
        ...muiToolbarOverrides(uiKitTheme)
      },
      MuiIconButton: {
        ...muiIconButtonOverrides(uiKitTheme)
      }
    }
  });
};

export default muiThemeOverrider;
