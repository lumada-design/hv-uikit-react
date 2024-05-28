import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../utils/classes";

export const { useClasses, staticClasses } = createClasses("HvPanel", {
  root: {
    position: "relative",
    padding: theme.space.sm,
    backgroundColor: theme.colors.bgSurface,
    overflow: "auto",
  },
});
