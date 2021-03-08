import { hexToRgbA } from "@hv/uikit-react-core";

const styles = (theme) => ({
  root: {
    verticalAlign: "inherit",
    textAlign: "left",
    padding: theme.hvSpacing(0, "xs"),

    border: "none",
  },
  head: {
    height: 52,
    paddingTop: 8,
    verticalAlign: "top",
    ...theme.hv.typography.highlightText,
    "&$sortable": {
      padding: 0,
      "&:hover": {
        backgroundColor: theme.palette.atmo3,
      },
    },
  },
  body: {
    height: 32,
    backgroundColor: "transparent",
    // padding: theme.hvSpacing(0, "xs"),
    ...theme.hv.typography.normalText,
    "&$sortable": {
      paddingLeft: 32,
    },
    "&$sorted": {
      backgroundColor: hexToRgbA(theme.palette.atmo1, 0.4),
    },
  },
  footer: {},

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
