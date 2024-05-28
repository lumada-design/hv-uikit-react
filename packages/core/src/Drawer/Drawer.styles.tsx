import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvDrawer", {
  root: {},
  paper: {
    backgroundColor: theme.colors.bgSurface,
    padding: 0,
    overflow: "auto",
    boxShadow: theme.colors.shadow,
  },
  background: {
    background: theme.colors.bgOverlay,
  },
  closeButton: {
    position: "absolute",
    top: theme.spacing("sm"),
    right: theme.spacing("sm"),
  },
});
