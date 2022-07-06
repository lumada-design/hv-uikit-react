import { makeStyles } from "@material-ui/core/styles";

export const html = {
  WebkitFontSmoothing: "antialiased", // Antialiasing.
  MozOsxFontSmoothing: "grayscale", // Antialiasing.
  // Change from `box-sizing: content-box` so that `width`
  // is not affected by `padding` or `border`.
  boxSizing: "border-box",

  // Prevent adjustments of font size after orientation changes in iOS.
  TextSizeAdjust: "none",
  WebkitTextSizeAdjust: "none",
  MozTextSizeAdjust: "none",
};

export const body = (theme) => ({
  fontFamily: theme.hv.typography.fontFamily,
  ...theme.hv.typography.normalText,

  color: theme.hv.palette.accent.acce1,
  backgroundColor: theme.hv.palette.atmosphere.atmo2,

  colorScheme: theme.hv.type,
  accentColor: theme.hv.palette.accent.acce1,

  "@media print": {
    backgroundColor: "white",
  },
});

const useStyles = makeStyles((theme) => ({
  "@global": {
    html,
    "*, *::before, *::after": {
      boxSizing: "inherit",
    },
    "strong, b": {
      fontWeight: theme.hv.typography.highlightText.fontWeight,
    },
    body: {
      margin: 0,
      ...body(theme),
      // Add support for document.body.requestFullScreen().
      // Other elements, if background transparent, are not supported.
      "&::backdrop": {
        backgroundColor: theme.hv.palette.atmosphere.atmo3,
      },
    },
  },
}));

/**
 * Kickstart an elegant, consistent, and simple baseline to build upon.
 */
function CssBaseline() {
  useStyles();

  return null;
}

export default CssBaseline;
