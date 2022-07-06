import { outlineStyles } from "../../Focus/styles";

const selected = (theme) => ({
  background: theme.hv.palette.atmosphere.atmo3,
  borderLeft: `2px solid ${theme.hv.palette.accent.acce3}`,
  "& *": {
    background: theme.hv.palette.atmosphere.atmo3,
  },
});

const hover = (theme) => ({
  background: theme.hv.palette.atmosphere.atmo3,
  "& *": {
    background: theme.hv.palette.atmosphere.atmo3,
  },
});

const styles = (theme) => ({
  /* role="tree" root element */
  root: {
    display: "block",
    background: theme.hv.palette.atmosphere.atmo1,
    padding: `0px`,
    margin: "0",
    listStyle: "none",

    outline: "none",
  },

  /* role="group" element */
  group: {
    margin: "8px 0 0 0",
    padding: 0,
  },

  /* role="treeitem" element */
  node: {
    listStyle: "none",
    minHeight: "32px",
    "&:not(:last-child)": {
      marginBottom: "8px",
    },
  },

  /* role="treeitem" element states */
  disabled: {},
  selectable: {},
  unselectable: {},
  expandable: {},
  collapsed: {
    "&>$group": { display: "none" },
  },
  expanded: {
    "&>$group": { display: "block" },
  },
  selected: {},
  unselected: {},

  focused: {},

  noIcon: {},
  withIcon: {},

  /* role="button" element */
  content: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "32px",
    borderLeft: `2px solid transparent`,
    paddingRight: theme.hv.spacing.xs,

    "$expandable>&": {
      fontWeight: 600,
    },

    // selected state
    "$selected>&": selected(theme),

    // hover
    ":not($disabled):not($selected)>&:hover": hover(theme),
    ":not($disabled)$selected>&:hover": {},

    // focus
    ":not($disabled):not($selected)>&:focus-visible": hover(theme),
    ":not($disabled):not($selected)>&.focus-visible": hover(theme),

    "*:focus-visible $focused>&": {
      ...outlineStyles,
    },

    ".focus-visible $focused>&": {
      ...outlineStyles,
    },

    "$focused>&": {
      ...hover(theme),
    },

    "&[disabled], &:active": {
      outline: "none",
    },

    "&:focus": {
      outline: "none",
    },

    "&:focus-visible": {
      ...outlineStyles,
    },

    "&.focus-visible": {
      ...outlineStyles,
    },

    // cursor
    cursor: "pointer",
    "& *": {
      cursor: "pointer",
    },
    "$disabled>&": {
      cursor: "not-allowed",
      "& *": {
        cursor: "not-allowed",
      },
    },
  },
});

export default styles;
