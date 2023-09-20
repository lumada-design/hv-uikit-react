import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "@core/utils/classes";

import { getBorderStyles } from "../utils/utils";

export const { staticClasses, useClasses } = createClasses("HvTableRow", {
  /** Styles applied to the component root class. */
  root: {
    color: "inherit",
    backgroundColor: theme.colors.atmo1,
    verticalAlign: "middle",
    outline: 0,
  },
  /** Styles applied to the component root when inside a `HvTableHead`. */
  head: {},
  /** Styles applied to the component root when inside a `HvTableBody`. */
  body: {},
  /** Styles applied to the component root when inside a `HvTableFooter`. */
  footer: {},
  /** Styles applied to the component root when selected. */
  selected: {
    backgroundColor: theme.colors.atmo2,
  },
  /** Styles applied to the component root when expanded. */
  expanded: {
    backgroundColor: theme.colors.atmo1,
    "& > *[role=cell]": {
      borderBottom: "none",
    },
  },
  /** Styles applied to the component root when striped. */
  striped: {
    "&:nth-of-type(even)": {
      "&:hover": {
        backgroundColor: theme.colors.containerBackgroundHover,
      },
    },
    "&:nth-of-type(odd)": {
      "&:hover": {
        backgroundColor: theme.colors.containerBackgroundHover,
      },
    },
  },
  /** Styles applied to the component root on hover. */
  hover: {
    transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    "&:hover": {
      backgroundColor: theme.colors.containerBackgroundHover,
    },
  },
  /** Styles applied to the component root when its table variant is list. */
  variantList: {
    // only applied on custom `display`
    marginBottom: theme.space.xs,
    borderRadius: theme.table.rowListBorderRadius,

    ...getBorderStyles(
      "row",
      theme.table.rowListBorderColor,
      theme.table.rowListBorderRadius
    ),
    backgroundColor: theme.colors.atmo1,
    "&$selected": {
      ...getBorderStyles(
        "row",
        theme.colors.secondary,
        theme.table.rowListBorderRadius
      ),

      "&:hover": {
        ...getBorderStyles(
          "row",
          theme.table.rowHoverBorderColor,
          theme.table.rowListBorderRadius
        ),
      },
    },

    "&:hover": {
      ...getBorderStyles(
        "row",
        theme.table.rowHoverBorderColor,
        theme.table.rowListBorderRadius
      ),
    },
    "&.HvIsFocused": {
      borderRadius: theme.table.rowListBorderRadius,
    },
  },
  /** Styles applied to the component root when its table variant is list. */
  variantListHead: {
    backgroundColor: "transparent",
  },
});
