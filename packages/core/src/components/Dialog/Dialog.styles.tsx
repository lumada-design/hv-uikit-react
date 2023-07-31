import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "@core/utils/classes";

export const { staticClasses, useClasses } = createClasses("HvDialog", {
  root: {},
  background: {},
  paper: {
    color: theme.colors.secondary,
    backgroundColor: theme.colors.atmo1,
    boxShadow: ["none", theme.colors.shadow],
    borderRadius: theme.dialog.borderRadius,
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
