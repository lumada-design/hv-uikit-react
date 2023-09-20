import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "@core/utils/classes";
import { inputClasses } from "@core/components/Input";
import { baseInputClasses } from "@core/components/BaseInput";

export const { staticClasses, useClasses } = createClasses("HvInlineEditor", {
  root: {
    [`& .${baseInputClasses.inputRoot}.${inputClasses.inputRoot}`]: {
      height: "100%",
      minHeight: "32px",
    },
  },
  inputBorderContainer: {
    top: "unset",
    bottom: 0,
  },
  input: {},
  inputRoot: {},
  text: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    alignSelf: "center",
  },
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
    justifyContent: "flex-start",
    alignItems: "center",

    backgroundColor: "transparent",
    border: `1px solid transparent`,

    "&:hover, &:focus": {
      border: `1px solid ${theme.colors.primary}`,
      backgroundColor: "transparent",

      "& $icon": {
        visibility: "visible",
      },
    },

    "&:active": {
      border: `1px solid ${theme.colors.secondary}`,
      backgroundColor: "transparent",

      "& $icon": {
        visibility: "visible",
      },
    },

    "& > div": {
      width: "100%",
    },
    "& > div > span": {
      width: "100%",
    },
  },
  icon: {
    cursor: "pointer",
    visibility: "hidden",
    alignSelf: "center",
    height: "16px",
    width: "32px",
    minWidth: "32px",

    "& svg": {
      margin: theme.spacing(0, "xs"),
    },
  },
  iconVisible: {
    visibility: "visible",
  },
});
