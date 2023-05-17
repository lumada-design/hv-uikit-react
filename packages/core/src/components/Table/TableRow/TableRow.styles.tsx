import { CSSInterpolation } from "@emotion/serialize";
import { alpha, hexToRgb } from "@mui/material";
import { theme } from "@hitachivantara/uikit-styles";
import { getBorderStyles } from "../utils/utils";
import tableRowClasses from "./tableRowClasses";

export const styles: { [key: string]: CSSInterpolation } = {
  root: {
    color: "inherit",
    backgroundColor: "inherit",
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
  selected: {},
  expanded: {
    backgroundColor: theme.colors.atmo1,
    "& > *[role=cell]": {
      borderBottom: "none",
    },
  },
  striped: {
    "&:nth-child(even)": {
      backgroundColor: alpha(hexToRgb(theme.colors.atmo1), 0.6),
    },
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
    height: 16,
    "&:first-child": {
      height: 16,
    },

    "tr&:first-child": {
      height: 16,
    },
  },
  "&.HvIsFocused": {
    borderRadius: theme.table.rowBorderRadius,
  },
};
