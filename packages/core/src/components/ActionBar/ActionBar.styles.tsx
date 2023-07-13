import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "@core/utils/classes";

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
