import { CSSInterpolation } from "@emotion/serialize";
import { theme } from "@hitachivantara/uikit-styles";
import { CSSProperties } from "react";
import tableCellClasses, { HvTableCellClasses } from "./tableCellClasses";

export const styles: Partial<
  Record<keyof HvTableCellClasses, CSSInterpolation>
> = {
  root: {
    verticalAlign: "inherit",
    textAlign: "left",
    padding: `${theme.table.cellPaddingTop} ${theme.space.xs} ${
      theme.table.cellPaddingBottom
    } ${theme.spacing(4)}`,
    borderBottom: `1px solid ${theme.colors.atmo4}`,
  },
  head: {
    height: 52,
    verticalAlign: "top",

    backgroundColor: theme.colors.atmo1,
    borderTop: `1px solid ${theme.table.headerBorderTopColor}`,
    borderBottom: `1px solid ${theme.colors.atmo4}`,
    ...(theme.typography.label as CSSProperties),
  },
  body: {
    minHeight: 32,
    "td&": {
      height: 32,
    },
    backgroundColor: "inherit",
    ...(theme.typography.body as CSSProperties),
    fontFamily: theme.fontFamily.body,
  },
  footer: {},

  sorted: {},

  alignLeft: {
    textAlign: "left",
  },
  alignCenter: {
    textAlign: "center",
  },
  alignRight: {
    textAlign: "right",
    flexDirection: "row-reverse",
  },
  alignJustify: {
    textAlign: "justify",
  },

  variantNone: {
    padding: 0,
  },
  variantCheckbox: {
    boxSizing: "content-box",
    padding: 0,
    width: 32,
    maxWidth: 32,
    borderRight: theme.table.cellBorder,
  },
  variantActions: {
    boxSizing: "content-box",
    padding: 0,
    width: 32,
    maxWidth: 32,
    borderLeft: theme.table.cellBorder,
  },
  variantExpand: {
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  variantList: {
    minHeight: 52,
    "td&": {
      height: 52,
    },
    padding: "0, 0, 0, 32px",
    border: 0,
  },
  variantListHead: {
    backgroundColor: "inherit",
    "td&": {
      height: 16,
    },
  },
  variantListactions: {
    verticalAlign: "middle",
    borderLeft: theme.table.cellListBorder,
    paddingLeft: "0",
    textAlign: "center",
    width: 130,
    maxWidth: 130,
  },
  variantListcheckbox: {
    borderRight: theme.table.cellListBorder,
    padding: 0,
    textAlign: "center",
    width: 34,
    maxWidth: 34,
  },
  stickyColumn: {
    position: "sticky",
    zIndex: 2,
    background: theme.colors.atmo2,

    [`&.${tableCellClasses.groupColumnMostRight}+.${tableCellClasses.stickyColumn}`]:
      {
        borderLeft: 0,
      },
  },
  stickyColumnMostLeft: {
    borderRight: theme.table.cellBorder,
  },
  stickyColumnLeastRight: {
    borderLeft: theme.table.cellBorder,
  },

  groupColumnMostLeft: {
    borderLeft: theme.table.cellBorder,

    "&:first-child": {
      borderLeft: 0,
    },
  },
  groupColumnMostRight: {
    borderRight: theme.table.cellBorder,

    // due to the ":has()" selector not being supported in browsers,
    // this need to be managed with inline styles
    // To be uncommented when not needed (see comment in src/Table/hooks/useSticky.js)
    // "&:last-child,&:has(+ $stickyColumnLeastRight)": {
    "&:last-child": {
      borderRight: 0,
    },

    [`&+:not(${tableCellClasses.stickyColumn})`]: {
      borderLeft: 0,
    },
  },

  resizable: {
    borderRight: theme.table.cellBorder,
  },

  resizing: {
    borderRight: `solid 2px ${theme.colors.secondary}`,
  },
};
