import { hexToRgbA } from "@hv/uikit-react-core";

const styles = (theme) => ({
  root: {
    verticalAlign: "inherit",
    textAlign: "left",
    padding: theme.hvSpacing("8px", "xs", "8px", "32px"),

    borderBottom: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,
  },

  head: {
    height: 52,
    verticalAlign: "top",

    backgroundColor: theme.hv.palette.atmosphere.atmo1,
    borderTop: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,
    borderBottom: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,
    ...theme.hv.typography.highlightText,
  },
  body: {
    minHeight: 32,
    "td&": {
      height: 32,
    },
    backgroundColor: "inherit",
    ...theme.hv.typography.normalText,

    "&$sorted": {
      backgroundColor: hexToRgbA(theme.hv.palette.atmosphere.atmo1, 0.4),
    },
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
    padding: 0,
    width: 32,
    maxWidth: 32,
    overflow: "hidden",
    borderRight: `solid 1px ${theme.hv.palette.atmosphere.atmo4}`,
  },
  variantActions: {
    padding: 0,
    width: 32,
    maxWidth: 32,
    borderLeft: `solid 1px ${theme.hv.palette.atmosphere.atmo4}`,
  },
  variantExpand: {
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 0,
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
});

export default styles;
