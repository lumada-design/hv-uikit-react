import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { useClasses, staticClasses } = createClasses("HvPanel", {
  root: {
    position: "relative",
    padding: theme.space.sm,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.bgContainer,
    overflow: "auto",
    borderRadius: "inherit",
  },
});
