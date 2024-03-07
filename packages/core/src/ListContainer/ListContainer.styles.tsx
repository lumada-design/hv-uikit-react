import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../utils/classes";

export const { staticClasses, useClasses } = createClasses("HvListContainer", {
  root: {
    display: "flex",
    flexDirection: "column",
    gap: theme.space.xs,
  },
  condensed: {
    gap: 0,
  },
});
