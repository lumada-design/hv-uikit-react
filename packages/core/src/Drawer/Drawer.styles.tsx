import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvDrawer", {
  root: {},
  paper: {
    backgroundColor: theme.colors.bgContainer,
    padding: 0,
    overflow: "auto",
    boxShadow: theme.colors.shadow,
  },
  background: {
    backgroundColor: theme.colors.bgOverlay,
  },
  closeButton: {
    position: "absolute",
    top: theme.space.sm,
    right: theme.space.sm,
  },
});
