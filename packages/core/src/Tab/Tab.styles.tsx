import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../utils/classes";
import { outlineStyles } from "../utils/focusUtils";

export const { staticClasses, useClasses } = createClasses("HvTab", {
  root: {
    marginTop: "3px",
    padding: "0 16px",
    minWidth: 70,
    minHeight: 32,
    textTransform: "none",
    fontFamily: theme.fontFamily.body,
    ...(theme.typography.body as React.CSSProperties),
    "&:hover": {
      backgroundColor: theme.colors.containerBackgroundHover,
      borderRadius: theme.radii.base,
      "&::after": {
        height: "1px",
        backgroundColor: theme.colors.atmo4,
      },
    },
    "&$selected": {
      color: theme.typography.label.color,
      fontWeight: theme.typography.label.fontWeight,
      lineHeight: theme.typography.label.lineHeight,
      letterSpacing: theme.typography.label.letterSpacing,
    },
    "&$disabled": {
      color: theme.colors.secondary_60,
      cursor: "not-allowed",
      pointerEvents: "all",
      opacity: 1,
      "&:hover": {
        background: "none",
      },
    },
    opacity: 1,
    "&::after": {
      position: "absolute",
      left: 0,
      top: "calc(100% - 1px)",
      height: "1px",
      width: "100%",
      backgroundColor: theme.colors.atmo4,
      content: "''",
    },
    // Override Mui styling: https://mui.com/material-ui/api/tab/#css
    "& .MuiTab-iconWrapper": {
      margin: 0,
    },
  },
  focusVisible: {
    ...outlineStyles,
  },
  selected: {},
  disabled: {},
});
