import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

import { outlineStyles } from "../utils/focusUtils";

export const { staticClasses, useClasses } = createClasses("HvTab", {
  root: {
    marginTop: "3px",
    padding: theme.spacing(0, "sm"),
    minWidth: 70,
    minHeight: 32,
    textTransform: "none",
    ...theme.typography.body,
    "&:hover": {
      backgroundColor: theme.colors.containerBackgroundHover,
      borderRadius: theme.radii.base,
      "&::after": {
        height: "1px",
        backgroundColor: theme.colors.atmo4,
      },
    },
    "&$selected": {
      fontWeight: theme.typography.label.fontWeight,
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
    "& svg .color0": {
      fill: "currentcolor",
    },
  },
  focusVisible: {
    ...outlineStyles,
  },
  selected: {},
  disabled: {},
});
