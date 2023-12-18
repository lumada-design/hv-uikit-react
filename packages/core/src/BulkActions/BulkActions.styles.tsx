import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "@core/utils/classes";

export const { staticClasses, useClasses } = createClasses("HvBulkActions", {
  root: {
    display: "flex",
    alignItems: "center",
    border: `1px solid ${theme.colors.atmo4}`,
    backgroundColor: theme.colors.atmo2,
    padding: theme.spacing("xs", "md"),
    marginBottom: theme.space.xs,
  },
  semantic: {
    backgroundColor: theme.colors.primary_20,
    "& $selectAll div": {
      color: "inherit",

      "&:hover:not(:disabled)": {
        backgroundColor: theme.alpha("base_light", 0.3),
      },

      "& *": {
        color: "inherit",
        backgroundColor: "transparent",
      },
    },

    "& $selectAll:focus-within div": {
      backgroundColor: theme.alpha("base_light", 0.3),
    },
  },
  actions: { display: "inline-flex", marginLeft: "auto" },
  selectAllContainer: { display: "flex", alignItems: "center" },
  selectAll: {},
  selectAllPages: {},
  divider: {
    display: "flex",
    backgroundColor: theme.colors.atmo4,
    width: "1px",
    height: "32px",
    marginLeft: theme.space.sm,
  },
});
