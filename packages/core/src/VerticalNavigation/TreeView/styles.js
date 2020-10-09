import focusStyles from "../../Focus/styles";

const { focused, focusDisabled } = focusStyles;

const selected = (theme) => ({
  background: theme.hv.palette.atmosphere.atmo3,
  borderLeft: `2px solid ${theme.hv.palette.accent.acce3}`,
  "& *": {
    background: theme.hv.palette.atmosphere.atmo3,
  },
  "& svg *.color0": {
    fill: theme.hv.palette.atmosphere.atmo1,
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

    // level indentation
    // 1st, with icon
    "&[data-hasicon]>$content": { paddingLeft: `0px` },
    // 1st, no icon
    "&:not([data-hasicon])>$content": {
      paddingLeft: theme.hv.spacing.xs * 1,
    },

    // 2nd, with icon
    "&[data-hasicon]>$group>$node>$content": {
      paddingLeft: 32 + theme.hv.spacing.xs * 2,
    },
    // 2nd, no icon
    "&:not([data-hasicon])>$group>$node>$content": {
      paddingLeft: theme.hv.spacing.xs * 2,
    },

    // 3rd, with icon
    "&[data-hasicon]>$group>$node>$group>$node>$content": {
      paddingLeft: 32 + theme.hv.spacing.xs * 3,
    },
    // 3rd, no icon
    "&:not([data-hasicon])>$group>$node>$group>$node>$content": {
      paddingLeft: theme.hv.spacing.xs * 3,
    },
  },

  /* role="treeitem" element states */
  disabled: {},
  selectable: {},
  unselectable: {},
  collapsed: {
    "&>$group": { display: "none" },
  },
  expanded: {
    "&>$group": { display: "block" },
  },
  selected: {},
  unselected: {},

  noIcon: {},
  withIcon: {},

  contentFocusDisabled: {
    ...focusDisabled,
  },
  contentFocused: {
    ...focused,
  },

  /* role="button" element */
  content: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "32px",
    color: theme.hv.palette.accent.acce1,
    borderLeft: `2px solid transparent`,

    // selected state
    "$selected>&": selected(theme),

    // hover
    ":not($disabled):not($selected)>&:hover": hover(theme),
    ":not($disabled)$selected>&:hover": {},

    // focus
    ":not($disabled):not($selected)>&:focus": hover(theme),

    "&[disabled], &:active": {
      outline: "none",
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
