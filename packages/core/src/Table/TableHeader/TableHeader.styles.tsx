import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvTableHeader", {
  root: {
    "--first-row-cell-height": "52px",
    "--cell-height": "32px",
    height: "var(--cell-height)",
    verticalAlign: "inherit",
    alignContent: "inherit",
    textAlign: "left",
    padding: theme.spacing(0, 1, 0, 4),
    borderColor: theme.colors.atmo4,
    borderBottomWidth: 1,
  },
  head: {
    paddingTop: 8,
    verticalAlign: "top",
    alignContent: "start",
    ...theme.typography.label,
    backgroundColor: theme.colors.atmo1,
    borderBottomWidth: 1,

    "*:first-of-type > &": {
      height: "var(--first-row-cell-height)",
      borderTop: "1px solid transparent",
    },

    "&$variantList": {
      backgroundColor: "inherit",
      borderBottomWidth: 0,
      "*:first-of-type > &": {
        borderTop: 0,
      },
    },

    "&$sortable": {
      verticalAlign: "initial",
      alignContent: "initial",
      paddingTop: 0,
      paddingLeft: 0,
      cursor: "pointer",

      ":hover, :focus-within": {
        backgroundColor: theme.colors.containerBackgroundHover,
        "& $sortIcon": {
          opacity: 1,
        },
      },
    },
  },
  body: {
    backgroundColor: "inherit",
    ...theme.typography.body,
    ":where($sorted)": {
      backgroundColor: theme.alpha("atmo1", 0.4),
    },
    "&$sortable:not($variantNone)": {
      paddingLeft: 32,
    },
  },
  footer: {},
  stickyColumn: {
    position: "sticky",
    zIndex: 2,

    "&$groupColumnMostRight+$stickyColumn": {
      borderLeftWidth: 0,
    },
  },
  stickyColumnMostLeft: { borderRightWidth: 1 },
  stickyColumnLeastRight: { borderLeftWidth: 1 },
  groupColumnMostLeft: { borderLeftWidth: 1 },
  groupColumnMostRight: {
    borderRightWidth: 1,
    // due to the ":has()" selector not being supported in browsers,
    // this need to be managed with inline styles
    // To be uncommented when not needed (see comment in src/Table/hooks/useSticky.js)
    // "&:last-child,&:has(+ $stickyColumnLeastRight)": {
    "&:last-child": {
      borderRightWidth: 0,
    },
    "&+:not($stickyColumn)": {
      borderLeftWidth: 0,
    },
  },
  headerContent: { display: "flex", alignItems: "flex-start", width: "100%" },
  headerText: { overflow: "hidden", textOverflow: "ellipsis" },
  headerParagraph: { overflow: "hidden", display: "-webkit-box" },
  sortableHeaderText: { paddingTop: "8px" },
  sorted: {
    "& $sortIcon": {
      opacity: 1,
    },
  },
  sortable: {},
  sortButton: {
    ":focus-visible": {
      boxShadow: "none",
      backgroundColor: "transparent",
    },
  },
  sortIcon: { opacity: 0 },
  alignLeft: { textAlign: "left" },
  alignRight: { textAlign: "right", flexDirection: "row-reverse" },
  alignCenter: { textAlign: "center" },
  alignJustify: { textAlign: "justify" },
  alignFlexLeft: { justifyContent: "flex-start" },
  alignFlexRight: { justifyContent: "flex-end" },
  alignFlexCenter: { justifyContent: "center" },
  alignFlexJustify: { textAlign: "justify" },
  variantCheckbox: {
    padding: 0,
    width: 32,
    maxWidth: 32,
    borderRightWidth: 1,
  },
  variantExpand: {},
  variantActions: {
    padding: 0,
    width: 32,
    maxWidth: 32,
    borderLeftWidth: 1,
  },
  variantNone: { padding: 0 },
  variantList: {
    backgroundColor: "inherit",
    borderBottomWidth: 0,
    height: 16,
    ":first-of-type > &": {
      borderTopWidth: 0,
      height: 16,
    },
  },
  resizable: {
    borderRightWidth: 1,
    ":has($resizer:hover)": {
      borderRight: `2px solid ${theme.colors.primary_80}`,
    },
  },
  resizing: { borderRight: `2px solid ${theme.colors.primary_80}` },
  resizer: {
    display: "inline-block",
    width: 16,
    height: "100%",
    position: "absolute",
    right: 0,
    top: 0,
    transform: "translateX(50%)",
    zIndex: 1,
    touchAction: "none",
  },
});
