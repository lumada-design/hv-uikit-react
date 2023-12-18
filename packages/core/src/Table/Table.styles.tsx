import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../utils/classes";

export const { staticClasses, useClasses } = createClasses("HvTable", {
  root: {
    position: "relative",
    width: "100%",

    ...theme.typography.body,

    borderSpacing: 0,

    "& caption": {
      ...theme.typography.body,
      padding: theme.space.xs,
      textAlign: "left",
      captionSide: "bottom",
    },
  },
  stickyHeader: {},
  stickyColumns: {
    backgroundColor: theme.colors.atmo2,
    "&": {
      borderSpacing: 0,
    },
  },
  listRow: {
    borderSpacing: `0 ${theme.space.xs}`,
  },
});
