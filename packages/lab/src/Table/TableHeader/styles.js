import { hexToRgbA } from "@hv/uikit-react-core";

const styles = (theme) => ({
  root: {
    verticalAlign: "inherit",
    textAlign: "left",
    padding: theme.hvSpacing(0, "xs", 0, "32px"),

    borderBottom: `1px solid ${theme.palette.atmo4}`,
  },

  head: {
    height: 52,
    paddingTop: 8,
    verticalAlign: "top",

    backgroundColor: theme.palette.atmo1,
    borderTop: `1px solid ${theme.palette.atmo4}`,
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
    height: 32,
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

  stickyColumn: {
    position: "sticky",
    zIndex: 2,
  },

  stickyColumnMostLeft: {
    borderRight: `solid 1px ${theme.hv.palette.atmosphere.atmo4}`,
  },

  stickyColumnLeastRight: {
    borderLeft: `solid 1px ${theme.hv.palette.atmosphere.atmo4}`,
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
});

export default styles;
