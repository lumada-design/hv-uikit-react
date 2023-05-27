import { CSSInterpolation } from "@emotion/serialize";
import { theme } from "@hitachivantara/uikit-styles";
import { getBorderStyles } from "../utils/utils";
import tableRowClasses, { HvTableRowClasses } from "./tableRowClasses";

export const styles: Partial<
  Record<keyof HvTableRowClasses, CSSInterpolation>
> = {
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
  head: {
    "&:first-child": {
      height: 52,
    },

    "tr&:first-child": {
      height: 52,
    },
  },
  body: {},
  footer: {},
  selected: {
    backgroundColor: theme.table.selectedRowBackgroundColor,
  },
  expanded: {
    backgroundColor: theme.colors.atmo1,
    "& > *[role=cell]": {
      borderBottom: "none",
    },
  },
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
  hover: {
    transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    "&:hover": {
      backgroundColor: theme.table.rowHoverColor,
    },
  },
  variantList: {
    ...getBorderStyles(
      "row",
      theme.table.rowListBorderColor,
      theme.table.rowListBorderRadius
    ),
    backgroundColor: theme.colors.atmo1,
    height: 52,
    [`&.${tableRowClasses.selected}`]: {
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
  variantListHead: {
    backgroundColor: theme.table.rowListBackgroundColor,
    height: 16,
    "&:first-child": {
      height: 16,
    },

    "tr&:first-child": {
      height: 16,
    },
  },
};
