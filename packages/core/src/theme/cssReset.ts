export const cssReset = {
  /* 
    1. Use a more-intuitive box-sizing model. 
    2. Set default border width and style to apply border props easily. 
  */
  "*, ::before, ::after": {
    boxSizing: "border-box",
    borderWidth: "0",
    borderStyle: "solid",
  },

  /* Remove default margin. */
  "*": {
    margin: 0,
  },

  /* Allow percentage-based heights in the application. */
  "html, body": {
    height: "100%",
  },

  /* 
      1. Use theme `sans` font-family.
      2. Use theme `base` line height.
    */
  html: {
    // fontFamily: "$sans" /* 1 */,
    // lineHeight: "$base" /* 2 */,
    fontSize: "16px",
  },

  /* 
      1. Use theme colors for background and default color.
    */
  body: {
    backgroundColor: "#E8E8E8", // theme.colors.base1.
    // colors: theme.colors.primary,
    fontFamily: "inherit",
    lineHeight: "inherit",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
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

  /* Buttons have a default outline. */
  "button:focus": {
    outline: "5px auto -webkit-focus-ring-color",
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
