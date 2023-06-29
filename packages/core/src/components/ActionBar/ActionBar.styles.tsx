import { createClasses } from "@core/utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvActionBar", {
  root: {
    width: "100%",
    padding: theme.space.sm,
    borderTop: `1px solid ${theme.colors.atmo3}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
