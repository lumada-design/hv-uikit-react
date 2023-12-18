import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "@core/utils/classes";

export const { staticClasses, useClasses } = createClasses("HvStack", {
  root: {
    display: "flex",
  },
  column: {
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
  },
  xs: {
    gap: theme.space.xs,
  },
  sm: {
    gap: theme.space.sm,
  },
  md: {
    gap: theme.spacing(4),
  },
  lg: {
    gap: theme.spacing(6),
  },
  xl: {
    gap: theme.spacing(11),
  },
});
