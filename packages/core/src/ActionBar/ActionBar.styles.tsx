import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvActionBar", {
  root: {
    width: "100%",
    padding: theme.space.sm,
    borderTop: `1px solid ${theme.colors.divider}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
