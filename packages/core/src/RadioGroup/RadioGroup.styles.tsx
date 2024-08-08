import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../utils/classes";

export const { staticClasses, useClasses } = createClasses("HvRadioGroup", {
  root: {
    display: "inline-block",
    overflow: "clip",
    overflowClipMargin: 4,
    verticalAlign: "top",
  },
  label: { marginBottom: theme.space.xs },
  group: { display: "flex" },
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
  horizontal: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.space.sm,
  },
  invalid: {
    paddingBottom: theme.space.xs,
    borderBottom: `1px solid ${theme.colors.negative}`,
  },
  error: {},
});
