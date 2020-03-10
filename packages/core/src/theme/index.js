import muiCreateBreakpoints from "@material-ui/core/styles/createBreakpoints";
import muiCreateSpacing from "@material-ui/core/styles/createSpacing";
import dawnTheme from "@hv/uikit-common-themes/dist/dawn";
import wickedTheme from "@hv/uikit-common-themes/dist/wicked";
import createSpacing from "./spacing";

const getTheme = uiKitTheme => {
  switch (uiKitTheme) {
    default:
    case "dawn":
      return dawnTheme;
    case "wicked":
      return wickedTheme;
  }
};

const hvTheme = uiKitTheme => {
  const theme = getTheme(uiKitTheme);

  return {
    ...theme,
    spacing: muiCreateSpacing(createSpacing(theme)),
    breakpoints: muiCreateBreakpoints({
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1270,
        xl: 1920
      }
    }),
    zIndex: {
      mobileStepper: 1000,
      speedDial: 1050,
      appBar: 1100,
      drawer: 1200,
      modal: 1300,
      snackbar: 1400,
      tooltip: 1500,
    },
    // deprecated
    hv: theme
  };
};

const defaultTheme = hvTheme();

export { hvTheme as themeBuilder };
export default defaultTheme;
