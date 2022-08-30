import fade from "../utils/hexToRgbA";
import { outlineStyles } from "../Focus/styles";

const styles = (theme) => ({
  root: {},

  chipRoot: {
    height: 16,
    borderRadius: 0,
    maxWidth: 180,
    "& $focusVisible": {
      backgroundColor: fade(theme.palette.base1, 0.3),
    },
  },

  focusVisible: {},

  primaryButton: {
    background: "transparent",
  },

  label: {
    paddingLeft: theme.hv.spacing.xs,
    paddingRight: theme.hv.spacing.xs,
    ...theme.hv.typography.normalText,
    color: theme.palette.base2,
    "& p": {
      color: theme.hv.palette.base.base2,
    },
  },

  tagButton: {
    width: 16,
    height: 16,
    minWidth: 16,
    minHeight: 16,
    padding: 0,
    margin: 0,
  },

  deleteIcon: {
    marginRight: 0,
    width: 16,
    height: 16,
    minWidth: 16,
    minHeight: 16,
    padding: 0,
    "&:hover": {
      backgroundColor: fade(theme.palette.base1, 0.3),
    },
    "&:focus": {
      ...outlineStyles,
      borderRadius: 0,
    },
    "&:focus:not(:focus-visible)": {
      outline: "0 !important",
      boxShadow: "none !important",
    },
  },
  disabledDeleteIcon: {
    "&:hover": {
      backgroundColor: theme.hv.palette.atmosphere.atmo3,
    },
    "&:focus": {
      backgroundColor: theme.hv.palette.atmosphere.atmo3,
      outline: "none",
      boxShadow: "none",
      outlineOffset: 0,
    },
  },
  titleOverflow: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  categorical: {
    borderRadius: 8,
    "&$clickable": {
      cursor: "pointer",
    },
    "&:hover": {
      borderRadius: 8,
    },
    "& $label > p": {
      color: theme.hv.palette.accent.acce1,
    },
    "&:focus:not(:focus-visible)": {
      outline: "0 !important",
      boxShadow: "none !important",
    },
  },
  clickable: {},

  categoricalFocus: {
    "&:focus": {
      ...outlineStyles,
    },
  },

  disabled: {
    backgroundColor: theme.hv.palette.atmosphere.atmo3,
    cursor: "not-allowed",
    "& $label > p": {
      color: theme.hv.palette.atmosphere.atmo5,
    },
  },

  categoricalDisabled: {
    backgroundColor: theme.hv.palette.atmosphere.atmo3,
    cursor: "not-allowed",
    "& $label > p": {
      color: theme.hv.palette.atmosphere.atmo5,
    },
    "&:hover": {
      backgroundColor: theme.hv.palette.atmosphere.atmo3,
    },
    "&:focus": {
      outline: "none",
    },
  },

  semanticTextColor: {
    color: theme.hv.palette.base.base2,
  },
  categoricalTextColor: {
    color: theme.hv.palette.accent.acce1,
  },
});

export default styles;
