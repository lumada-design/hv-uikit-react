import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvDialog", {
  root: {},
  background: { background: theme.alpha("atmo4", 0.8) },
  paper: {
    color: theme.colors.secondary,
    backgroundColor: theme.colors.atmo1,
    boxShadow: theme.colors.shadow,
    borderColor: theme.colors.atmo4,
    borderRadius: theme.radii.round,
  },
  fullscreen: {},
  fullHeight: {
    height: "100%",
  },
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
  },
  success: {
    borderColor: theme.colors.positive,
  },
  error: {
    borderColor: theme.colors.negative,
  },
  warning: {
    borderColor: theme.colors.warning,
  },
});
