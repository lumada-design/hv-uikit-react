import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "@core/utils/classes";

export const { useClasses, staticClasses } = createClasses("HvPanel", {
  root: {
    position: "relative",
    padding: theme.space.sm,
    backgroundColor: theme.colors.atmo1,
    overflow: "auto",
  },
});
