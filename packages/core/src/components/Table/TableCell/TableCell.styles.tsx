import { CSSProperties } from "react";

import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "@core/utils/classes";

export const { staticClasses, useClasses } = createClasses("HvTableCell", {
  /** Styles applied to the component root class. */
  root: {
    verticalAlign: "inherit",
    textAlign: "left",
    padding: `calc(${theme.space.xs} - 2px ) ${theme.space.xs} calc(${
      theme.space.xs
    } - 3px ) ${theme.spacing(4)}`,
    borderBottom: `1px solid ${theme.colors.atmo4}`,
  },
  /** Styles applied to the cell when it's in the table head. */
  head: {
    height: 52,
    verticalAlign: "top",

    backgroundColor: theme.colors.atmo1,
    borderTop: "1px solid transparent",
    borderBottom: `1px solid ${theme.colors.atmo4}`,
    ...(theme.typography.label as CSSProperties),
  },
  /** Styles applied to the cell when it's in the table body. */
  body: {
    minHeight: 32,
    "td&": {
      height: 32,
    },
    backgroundColor: "inherit",
    ...(theme.typography.body as CSSProperties),
    fontFamily: theme.fontFamily.body,
  },
  /** Styles applied to the cell when it's in the table footer. */
  footer: {},
  /** Styles applied to the cell when it's part of a sorted column. */
  sorted: {},
  /** Styles applied to the component root when it is left aligned */
  alignLeft: {
    textAlign: "left",
  },
  /** Styles applied to the component root when it is center aligned */
  alignCenter: {
    textAlign: "center",
  },
  /** Styles applied to the component root when it is right aligned */
  alignRight: {
    textAlign: "right",
    flexDirection: "row-reverse",
  },
  /** Styles applied to the component root when it is justified */
  alignJustify: {
    textAlign: "justify",
  },

  /** Styles applied to the component root when its variant is none */
  variantNone: {
    padding: 0,
  },
  /** Styles applied to the component root when its variant is checkbox */
  variantCheckbox: {
    boxSizing: "content-box",
    padding: 0,
    width: 32,
    maxWidth: 32,
    borderRight: `solid 1px ${theme.colors.atmo4}`,
  },
  /** Styles applied to the component root when its variant is actions */
  variantActions: {
    boxSizing: "content-box",
    padding: 0,
    width: 32,
    maxWidth: 32,
    borderLeft: `solid 1px ${theme.colors.atmo4}`,
  },
  /** Styles applied to the component root when its variant is expand */
  variantExpand: {
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  /** Styles applied to the component root when its variant is list */
  variantList: {
    minHeight: 52,
    "td&": {
      height: 52,
    },
    padding: "0, 0, 0, 32px",
    border: 0,
  },
  /** Styles applied to the cell when its variant is list and the type is head. */
  variantListHead: {
    backgroundColor: "inherit",
    "td&": {
      height: 16,
    },
  },
  /** Styles applied to the cell when its variant is list and actions. */
  variantListactions: {
    verticalAlign: "middle",
    borderLeft: "none",
    paddingLeft: "0",
    textAlign: "center",
    width: 130,
    maxWidth: 130,
  },
  /** Styles applied to the cell when its variant is list and checkbox. */
  variantListcheckbox: {
    borderRight: "none",
    padding: 0,
    textAlign: "center",
    width: 34,
    maxWidth: 34,
  },
  /** Styles applied to the cell when it's part of a sticky column. */
  stickyColumn: {
    position: "sticky",
    zIndex: 2,
    background: theme.colors.atmo2,

    "&$groupColumnMostRight+$stickyColumn": {
      borderLeft: 0,
    },
  },
  /** Styles applied to the cell when it's part of the last sticky to the left column. */
  stickyColumnMostLeft: {
    borderRight: `solid 1px ${theme.colors.atmo4}`,
  },
  /** Styles applied to the cell when it's part of the first right sticky column. */
  stickyColumnLeastRight: {
    borderLeft: `solid 1px ${theme.colors.atmo4}`,
  },

  /** Styles applied to the cell when it's part of the first column in the group. */
  groupColumnMostLeft: {
    borderLeft: `solid 1px ${theme.colors.atmo4}`,

    "&:first-of-type": {
      borderLeft: 0,
    },
  },
  /** Styles applied to the cell when it's part of the last column in the group. */
  groupColumnMostRight: {
    borderRight: `solid 1px ${theme.colors.atmo4}`,

    // due to the ":has()" selector not being supported in browsers,
    // this need to be managed with inline styles
    // To be uncommented when not needed (see comment in src/Table/hooks/useSticky.js)
    // "&:last-child,&:has(+ $stickyColumnLeastRight)": {
    "&:last-child": {
      borderRight: 0,
    },

    "&+:not($stickyColumn)": {
      borderLeft: 0,
    },
  },

  /** Styles applied to the cell when it's part of a resizable column. */
  resizable: {
    borderRight: `solid 1px ${theme.colors.atmo4}`,
  },
  /** Styles applied to the cell when it's part of a resizing column. */
  resizing: {
    borderRight: `solid 2px ${theme.colors.secondary}`,
  },
});
