import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvDialog", {
  root: {},
  background: { background: theme.alpha("atmo4", 0.8) },
  paper: {
    color: theme.colors.secondary,
    backgroundColor: theme.colors.atmo1,
    boxShadow: ["none", theme.colors.shadow],
    borderRadius: theme.radii.round,
  },
  fullscreen: {},
  closeButton: {
    padding: 0,
    minWidth: "auto",
    position: "absolute",
    top: theme.space.sm,
    right: theme.space.sm,
    width: 32,
    height: 32,
  },
  statusBar: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTopWidth: 4,
    borderTopStyle: "solid",
  },
  success: {
    borderTopColor: theme.colors.positive,
  },
  error: {
    borderTopColor: theme.colors.negative,
  },
  warning: {
    borderTopColor: theme.colors.warning,
  },
});
