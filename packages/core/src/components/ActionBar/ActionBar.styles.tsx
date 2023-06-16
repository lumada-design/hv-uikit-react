import { createClasses } from "@core/utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvActionBar", {
  root: {
    width: "100%",
    height: "75px",
    padding: theme.space.sm,
    borderTop: `3px solid ${theme.colors.atmo2}`,
    display: "flex",
    justifyContent: "flex-end",
  },
});
