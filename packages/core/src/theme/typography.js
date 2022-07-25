const typography = (theme) => ({
  suppressDeprecationWarnings: true,
  fontFamily: [...theme.typography.fontFamily].join(","),
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
    ...theme.typography.highlightText,
  },
  button: {
    ...theme.typography.highlightText,
  },
  ...Object.assign({}, ...Object.values(theme.palette)),
});

export default typography;
