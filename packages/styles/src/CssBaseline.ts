const baseline = {
  /* Clears input's clear and reveal buttons from IE */
  "input[type=search]::-ms-clear": { display: "none", width: 0, height: 0 },
  "input[type=search]::-ms-reveal": { display: "none", width: 0, height: 0 },

  /* Clears input's clear button from Chrome */
  'input[type="search"]::-webkit-search-decoration': { display: "none" },
  'input[type="search"]::-webkit-search-cancel-button': { display: "none" },
  'input[type="search"]::-webkit-search-results-button': { display: "none" },
  'input[type="search"]::-webkit-search-results-decoration': {
    display: "none",
  },

  "*, ::before, ::after": {
    boxSizing: "border-box",
    borderWidth: "0",
    borderStyle: "solid",
  },

  /* Remove default margin. */
  "*": {
    margin: 0,
  },

  /* Headings are unstyled. */
  "h1, h2, h3, h4, h5, h6": {
    fontSize: "inherit",
    fontWeight: "inherit",
  },

  /* Avoid text overflows. */
  "p, h1, h2, h3, h4, h5, h6": {
    overflowWrap: "break-word",
  },

  /* Improve media defaults. */
  "img, picture, video, canvas, svg": {
    display: "block",
    maxWidth: "100%",
  },

  /* Remove built-in form typography styles. */
  "button, input, textarea, select, optgroup": {
    fontFamily: "inherit",
    fontSize: "100%",
  },

  select: {
    width: "100%",
    height: "100%",
    cursor: "pointer",
    background: "transparent",
  },

  /* Buttons have a default outline. */
  "button:focus-visible": {
    outline: "#52A8EC solid 0px",
    outlineOffset: "-1px",
  },

  /* fieldset have no margin and padding. */
  fieldset: {
    margin: 0,
    padding: 0,
  },

  /* List have no margin and padding. */
  "ol, ul": {
    margin: 0,
    padding: 0,
  },

  /* Anchor are unstyled. */
  a: {
    backgroundColor: "transparent",
    color: "inherit",
    textDecoration: "inherit",
  },
} as const;

export const CssScopedBaseline = {
  height: "100%",
  fontFamily: "inherit",
  lineHeight: "inherit",
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
  ...baseline,
} as const;

export const CssBaseline = {
  /* Allow percentage-based heights in the application. */
  "html, body": {
    height: "100%",
  },

  html: {
    fontFamily:
      "'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif",
  },

  body: {
    fontFamily: "inherit",
    lineHeight: "inherit",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
  },

  ...baseline,
} as const;
