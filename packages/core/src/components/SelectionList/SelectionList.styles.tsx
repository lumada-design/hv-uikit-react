import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "@core/utils/classes";

export const { staticClasses, useClasses } = createClasses("HvSelectionList", {
  root: { display: "inline-block", padding: 0, margin: 0 },
  error: { width: "100%", float: "left", clear: "both" },
  listbox: {
    display: "flex",
    float: "left",
    clear: "both",
    width: "100%",
    paddingBottom: theme.space.xs,
  },
  label: { marginBottom: theme.space.xs, float: "left" },
  description: { float: "left" },
  horizontal: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: -theme.space.sm,
    "&>*": {
      marginLeft: theme.space.sm,
    },
  },
  vertical: {
    flexDirection: "column",

    // Prevent the focus ring to be hidden by sibling hover background
    "&>*": {
      zIndex: 0,
    },
    "&>*:focus-within": {
      zIndex: 1,
    },
  },
  invalid: { borderBottom: `1px solid ${theme.colors.negative}` },
});
