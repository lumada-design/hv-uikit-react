import { createClasses } from "@core/utils";
import { theme } from "@hitachivantara/uikit-styles";
import { getBorderStyles } from "../utils/utils";

export const { staticClasses, useClasses } = createClasses("HvTableRow", {
  /** Styles applied to the component root class. */
  root: {
    color: "inherit",
    backgroundColor: theme.table.rowBackgroundColor,
    verticalAlign: "middle",
    outline: 0,
    minHeight: 32,
    "tr&": {
      height: 32,
    },
  },
  /** Styles applied to the component root when inside a `HvTableHead`. */
  head: {
    "&:first-of-type": {
      height: 52,
    },

    "tr&:first-of-type": {
      height: 52,
    },
  },
  /** Styles applied to the component root when inside a `HvTableBody`. */
  body: {},
  /** Styles applied to the component root when inside a `HvTableFooter`. */
  footer: {},
  /** Styles applied to the component root when selected. */
  selected: {
    backgroundColor: theme.table.selectedRowBackgroundColor,
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
    // these styles were left on a styled component because of the access to the css var value to add an alpha.
    // "&:nth-of-type(even)": {
    // backgroundColor: hexToRgbA(
    //   getVarValue(theme.table.rowStripedBackgroundColor),
    //   0.6
    // ),
    //   "&:hover": {
    //     backgroundColor: theme.table.rowHoverColor,
    //   },
    // },
  },
  /** Styles applied to the component root on hover. */
  hover: {
    transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    "&:hover": {
      backgroundColor: theme.table.rowHoverColor,
    },
  },
  /** Styles applied to the component root when its table variant is list. */
  variantList: {
    ...getBorderStyles(
      "row",
      theme.table.rowListBorderColor,
      theme.table.rowListBorderRadius
    ),
    backgroundColor: theme.colors.atmo1,
    height: 52,
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
    backgroundColor: theme.table.rowListBackgroundColor,
    height: 16,
    "&:first-of-type": {
      height: 16,
    },

    "tr&:first-of-type": {
      height: 16,
    },
  },
});
