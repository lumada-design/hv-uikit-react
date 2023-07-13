import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "@core/utils/classes";

export const { staticClasses, useClasses } = createClasses("HvDrawer", {
  root: {},
  paper: {
    backgroundColor: theme.colors.atmo1,
    padding: 0,
    overflow: "auto",
    boxShadow: theme.colors.shadow,
  },
  background: {},
  closeButton: {
    padding: 0,
    minWidth: "inherit",
    position: "absolute",
    top: theme.spacing("sm"),
    right: theme.spacing("sm"),
  },
});
