import { makeStyles } from "@mui/styles";

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

  /* clears input's clear and reveal buttons from IE */
  "input[type=search]::-ms-clear": { display: "none", width: 0, height: 0 },
  "input[type=search]::-ms-reveal": { display: "none", width: 0, height: 0 },

  /* clears input's clear button from Chrome */
  'input[type="search"]::-webkit-search-decoration': { display: "none" },
  'input[type="search"]::-webkit-search-cancel-button': { display: "none" },
  'input[type="search"]::-webkit-search-results-button': { display: "none" },
  'input[type="search"]::-webkit-search-results-decoration': { display: "none" },
}));

/**
 * Kickstart an elegant, consistent, and simple baseline to build upon.
 */
function CssBaseline() {
  useStyles();

  return null;
}

export default CssBaseline;
