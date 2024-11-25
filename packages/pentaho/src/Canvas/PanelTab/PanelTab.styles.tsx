import { tabClasses } from "@mui/base";
import {
  createClasses,
  outlineStyles,
  theme,
} from "@hitachivantara/uikit-react-core";

export const { staticClasses, useClasses } = createClasses("HvCanvasPanelTab", {
  root: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    borderRadius: "16px 16px 0 0",
    backgroundColor: theme.colors.atmo2,
    color: theme.colors.secondary_60,
    overflow: "hidden",
    width: "100%",
    boxShadow: "0px -2px 8px 0px #4141410F",
    paddingInlineEnd: 0,
    paddingInlineStart: 0,
    "& svg .color0": {
      fill: "currentcolor",
    },
    "&:hover": {
      cursor: "pointer",
    },
    "&:focus": {
      backgroundColor: theme.colors.atmo1,
    },
    [`&.${tabClasses.selected}`]: {
      backgroundColor: theme.colors.atmo1,
      ...theme.typography.label,
    },
    "&:focus-visible": {
      ...outlineStyles,
    },
  },
});
