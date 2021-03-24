import { hexToRgbA } from "@hv/uikit-react-core";

const styles = (theme) => ({
  root: {
    verticalAlign: "inherit",
    textAlign: "left",
    padding: theme.hvSpacing(0, "xs"),

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
    "&$sortable": {
      verticalAlign: "initial",
      paddingTop: 0,
      paddingLeft: 0,
      "&:hover": {
        backgroundColor: theme.palette.atmo3,
      },
    },
  },
  body: {
    height: 32,
    backgroundColor: "inherit",
    ...theme.hv.typography.normalText,
    "&$sortable:not($paddingNone)": {
      paddingLeft: 32,
    },
    "&$sorted": {
      backgroundColor: hexToRgbA(theme.palette.atmo1, 0.4),
    },
  },
  footer: {},

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

  paddingNone: {
    padding: 0,
  },
  paddingCheckbox: {
    padding: 0,
    width: 32,
  },

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

  sortable: {},
  sorted: {},
  sortIcon: {
    display: "inline-flex",
  },
});

export default styles;
