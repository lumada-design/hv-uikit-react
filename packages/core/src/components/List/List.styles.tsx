import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "@core/utils/classes";

export const { staticClasses, useClasses } = createClasses("HvList", {
  root: {},
  virtualizedRoot: { marginBottom: 5 },
  selectorRoot: { width: "100%", zIndex: 0 },
  selectorContainer: {
    "&:hover": {
      backgroundColor: "transparent",
    },

    "&:focus-within": {
      backgroundColor: "transparent",
      outline: "none",
      boxShadow: "none",
    },
  },
  box: { width: "32px", height: "32px", marginLeft: "auto" },
  truncate: {
    display: "inline-block",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  item: {},
  itemSelector: {
    "&:not(:hover):not(.HvIsFocused):not(:focus-within)": {
      backgroundColor: theme.list.selectedBackgroundColor,
    },
  },
  link: {
    ...theme.typography.body,
    textDecoration: "none",

    "&:focus": {
      boxShadow: "unset !important",
    },
  },
  selectAllSelector: {
    width: "100%",
    margin: "0 0 2px 0",

    position: "relative",
    zIndex: 0,

    // prevent the focus ring to be hidden by sibling hover background
    "&:focus-within": {
      zIndex: 1,
    },
  },
});
