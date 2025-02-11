import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvInlineEditor", {
  root: {},
  /** @deprecated unused. use `classes.root::after` instead */
  inputBorderContainer: {},
  input: {},
  inputRoot: {
    height: "100%",
    minHeight: "32px",
  },
  text: {},
  largeText: {},
  textEmpty: {
    color: theme.colors.secondary_60,
  },
  button: {
    padding: theme.spacing("6px", "8px", "5px", "8px"),
    minHeight: "32px",

    boxSizing: "border-box",
    cursor: "text",
    height: "100%",
    width: "100%",
    maxWidth: "100%",
    justifyContent: "start",
    textAlign: "start",
    alignItems: "center",

    backgroundColor: theme.colors.atmo1,
    borderColor: "transparent",

    "&:hover, &:focus": {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.atmo1,

      "& $icon": {
        visibility: "visible",
      },
    },

    "&:active": {
      borderColor: theme.colors.secondary,
      backgroundColor: "transparent",

      "& $icon": {
        visibility: "visible",
      },
    },
  },
  icon: {
    cursor: "pointer",
    visibility: "hidden",
    alignSelf: "center",
    height: 16,
  },
  iconVisible: {
    visibility: "visible",
  },
});
