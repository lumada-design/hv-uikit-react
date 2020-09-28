import createTypography from "@material-ui/core/styles/createTypography";

const typography = (palette, theme) =>
  createTypography(palette, {
    suppressDeprecationWarnings: true,
    fontFamily: theme.typography.fontFamily,
    h1: {
      ...theme.typography.xlTitle,
    },
    h2: {
      ...theme.typography.lTitle,
    },
    h3: {
      ...theme.typography.mTitle,
    },
    h4: {
      ...theme.typography.sTitle,
    },
    body1: {
      ...theme.typography.normalText,
    },
    body2: {
      ...theme.typography.normalText,
    },
    subtitle1: {
      ...theme.typography.highlightText,
    },
    subtitle2: {
      ...theme.typography.labelText,
    },
    button: {
      ...theme.typography.highlightText,
    },
  });

export default typography;
