import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvDrawer", {
  root: {},
  paper: {
    backgroundColor: theme.colors.atmo1,
    padding: 0,
    overflow: "auto",
    boxShadow: theme.colors.shadow,
  },
  background: {
    background: theme.alpha("atmo4", 0.8),
  },
  closeButton: {
    position: "absolute",
    top: theme.spacing("sm"),
    right: theme.spacing("sm"),
  },
});
