import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../utils/classes";
import { outlineStyles } from "../utils/focusUtils";

export const { staticClasses, useClasses } = createClasses("HvRadio", {
  root: { display: "inline-block" },
  container: {
    cursor: "pointer",
    display: "flex",
    height: "32px",
    transitionProperty: "background-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    transitionDelay: "0ms",

    "&:hover": {
      backgroundColor: theme.colors.containerBackgroundHover,
      borderRadius: theme.radii.base,
    },
  },
  invalidContainer: {
    borderBottom: `1px solid ${theme.colors.negative}`,

    "&:hover": {
      borderBottomLeftRadius: "0px",
      borderBottomRightRadius: "0px",
    },
  },
  disabled: {
    cursor: "not-allowed",

    "& $label": { color: theme.colors.secondary_60, cursor: "not-allowed" },
  },
  radio: {
    height: "32px",

    "& svg": {
      outline: "none",
      boxShadow: "none",
    },
  },
  invalidRadio: {
    borderBottom: `1px solid ${theme.colors.negative}`,

    "&:hover": {
      borderBottomLeftRadius: "0px",
      borderBottomRightRadius: "0px",
    },
  },
  label: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    verticalAlign: "middle",
    paddingRight: theme.space.xs,
    whiteSpace: "nowrap",
    ...theme.typography.body,
    cursor: "pointer",
    height: "32px",
    lineHeight: "32px",
    width: "100%",
  },
  focusVisible: { backgroundColor: theme.colors.atmo3, ...outlineStyles },
  checked: {},
  semantic: {},
});
