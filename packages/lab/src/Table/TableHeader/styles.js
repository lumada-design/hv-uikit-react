import { hexToRgbA } from "@hitachivantara/uikit-react-core";

const styles = (theme) => ({
  root: {
    "--first-row-cell-height": "52px",
    "--cell-height": "32px",

    height: "var(--cell-height)",
    verticalAlign: "inherit",
    textAlign: "left",
    padding: theme.hvSpacing(0, "xs", 0, "32px"),

    borderBottom: `1px solid ${theme.palette.atmo4}`,
  },

  head: {
    ":first-child > &": {
      height: "var(--first-row-cell-height)",
      borderTop: `1px solid ${theme.palette.atmo4}`,
    },

    paddingTop: 8,
    verticalAlign: "top",

    backgroundColor: theme.palette.atmo1,
    borderBottom: `1px solid ${theme.palette.atmo4}`,
    ...theme.hv.typography.highlightText,

    transition: theme.transitions.create("background-color", {
      duration: theme.transitions.duration.shorter,
    }),

    "&$sortable": {
      verticalAlign: "initial",
      paddingTop: 0,
      paddingLeft: 0,
      cursor: "pointer",

      "&:hover": {
        backgroundColor: theme.palette.atmo3,

        "& $sortIcon": {
          visibility: "visible",
        },
      },
      "&:focus-within": {
        backgroundColor: theme.palette.atmo3,

        "& $sortIcon": {
          visibility: "visible",
        },
      },
      // IE fallback code (using focus-within-polyfill)
      "&.focus-within": {
        backgroundColor: theme.palette.atmo3,

        "& $sortIcon": {
          visibility: "visible",
        },
      },
    },
  },
  body: {
    backgroundColor: "inherit",
    ...theme.hv.typography.normalText,

    "&$sortable:not($variantNone)": {
      paddingLeft: 32,
    },
    "&$sorted": {
      backgroundColor: hexToRgbA(theme.palette.atmo1, 0.4),
    },
  },
  footer: {},

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

  headerContent: {
    display: "flex",
    alignItems: "flex-start",
  },
  headerText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  headerParagraph: {
    overflow: "hidden",
    display: "-webkit-box",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical",
  },
  sortableHeaderText: {
    paddingTop: "8px",
  },
  alignFlexLeft: {
    justifyContent: "flex-start",
  },
  alignFlexCenter: {
    justifyContent: "center",
  },
  alignFlexRight: {
    justifyContent: "flex-end",
  },
  alignFlexJustify: {
    textAlign: "justify",
  },

  variantNone: {
    padding: 0,
  },
  variantCheckbox: {
    padding: 0,
    width: 32,
    maxWidth: 32,
    borderRight: `solid 1px ${theme.hv.palette.atmosphere.atmo4}`,
  },
  variantExpand: {},
  variantActions: {
    padding: 0,
    width: 32,
    maxWidth: 32,
    borderLeft: `solid 1px ${theme.hv.palette.atmosphere.atmo4}`,
  },
  variantList: {
    backgroundColor: "inherit",
    borderBottom: 0,
    height: 16,
    ":first-child > &": {
      borderTop: 0,
      height: 16,
    },
  },
  stickyColumn: {
    position: "sticky",
    zIndex: 2,

    "&$groupColumnMostRight+$stickyColumn": {
      borderLeft: 0,
    },
  },
  stickyColumnMostLeft: {
    borderRight: `solid 1px ${theme.hv.palette.atmosphere.atmo4}`,
  },
  stickyColumnLeastRight: {
    borderLeft: `solid 1px ${theme.hv.palette.atmosphere.atmo4}`,
  },

  groupColumnMostLeft: {
    borderLeft: `solid 1px ${theme.hv.palette.atmosphere.atmo4}`,

    "&:first-child": {
      borderLeft: 0,
    },
  },
  groupColumnMostRight: {
    borderRight: `solid 1px ${theme.hv.palette.atmosphere.atmo4}`,

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

  sortable: {},
  sorted: {
    "& $sortIcon": {
      visibility: "visible",
    },
  },
  sortButton: {
    "$root$sortable &": {
      boxShadow: "none",
      backgroundColor: "transparent",
    },
  },
  sortIcon: {
    display: "inline-flex",
    visibility: "hidden",
  },

  resizable: {
    borderRight: `solid 1px ${theme.hv.palette.atmosphere.atmo4}`,
  },

  resizing: {
    borderRight: `solid 2px ${theme.hv.palette.accent.acce1}`,
  },

  resizer: {
    display: "inline-block",
    width: 10,
    height: "100%",
    position: "absolute",
    right: 0,
    top: 0,
    transform: "translateX(50%)",
    zIndex: 1,
    touchAction: "none",
  },
});

export default styles;
