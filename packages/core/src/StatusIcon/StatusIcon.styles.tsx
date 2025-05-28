import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvStatusIcon", {
  root: {
    borderRadius: theme.radii.round,
    width: "fit-content",
    height: "fit-content",
    lineHeight: 0,
    flexShrink: 0,
  },
  icon: {
    fontSize: "inherit",
  },
  success: {},
  warning: {},
  error: {},
  info: {},
  accent: {},
  default: {},

  full: {},
  simple: {},
});
