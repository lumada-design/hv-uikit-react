import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";

const html = {
  WebkitFontSmoothing: "antialiased", // Antialiasing.
  MozOsxFontSmoothing: "grayscale", // Antialiasing.
  // Change from `box-sizing: content-box` so that `width`
  // is not affected by `padding` or `border`.
  boxSizing: "border-box",
};

const body = (theme) => ({
  color: theme.hv.palette.accent.acce1,
  ...theme.hv.typography.normalText,
  backgroundColor: theme.hv.palette.atmosphere.atmo3,
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
      fontWeight: theme.typography.fontWeightBold,
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

  return <></>;
}

export default CssBaseline;
