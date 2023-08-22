import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "@core/utils/classes";

export const { staticClasses, useClasses } = createClasses("HvBulkActions", {
  root: {
    display: "flex",
    alignItems: "center",
    border: theme.bulkActions.border,
    backgroundColor: theme.bulkActions.backgroundColor,
    padding: theme.bulkActions.padding,
    marginBottom: theme.space.xs,
  },
  semantic: {
    backgroundColor: theme.bulkActions.anySelectedBackgroundColor,
  },
  actions: { display: "inline-flex", marginLeft: "auto" },
  selectAllContainer: { display: "flex", alignItems: "center" },
  selectAll: {},
  selectAllPages: {},
  divider: {
    display: theme.bulkActions.separatorDisplay,
    width: "1px",
    height: "32px",
    marginLeft: theme.space.sm,
  },
});
