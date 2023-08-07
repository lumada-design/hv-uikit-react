import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "@core/utils/classes";

export const { staticClasses, useClasses } = createClasses("HvTable", {
  root: {
    position: "relative",
    width: "100%",

    ...theme.typography.body,

    "table&": {
      borderSpacing: 0,
    },

    "& caption": {
      ...theme.typography.body,
      padding: theme.space.xs,
      textAlign: "left",
      captionSide: "bottom",
    },
  },
  stickyHeader: {},
  stickyColumns: { backgroundColor: theme.colors.atmo2 },
  listRow: {
    "table&": {
      borderSpacing: `0 ${theme.space.xs}`,
    },
  },
});
