import { createClasses } from "@core/utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvActionBar", {
  root: {
    width: "100%",
    padding: theme.space.sm,
    borderTop: theme.actionBar.borderTop,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
