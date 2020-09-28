import { outlineStyles } from "../Focus/styles";

const switchWidth = 32;

const thumbPosition = {
  position: "relative",
  left: -9,
  width: 12,
  height: 12,
};

const styles = (theme) => ({
  root: {
    display: "inline-flex",
    alignItems: "center",
    height: 32,
    cursor: "pointer",
  },
  focus: {
    ...outlineStyles,
  },

  switch: {
    padding: 0,
    width: switchWidth,
    height: 16,
  },

  switchBase: {
    width: switchWidth,
    height: 16,
    padding: 0,
    // increase CSS specificity
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&$checked": {
      transform: "translateX(16px)",
      "& + $track": {
        opacity: 1,
        backgroundColor: theme.hv.palette.accent.acce1,
      },
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
  },

  track: {
    opacity: 1,
    borderRadius: 15,
    left: 17,
    top: 8,
    border: `solid 1px ${theme.hv.palette.accent.acce1}`,
    backgroundColor: theme.hv.palette.atmosphere.atmo2,
  },

  thumb: {
    ...thumbPosition,
    border: `solid 1px ${theme.hv.palette.accent.acce1}`,
    backgroundColor: theme.hv.palette.atmosphere.atmo1,
    marginLeft: 2,
    marginTop: 0,
  },

  checked: {},

  disabled: {
    cursor: "not-allowed",

    "& $switch": {
      cursor: "not-allowed",
    },

    "& $thumb": {
      backgroundColor: `${theme.hv.palette.atmosphere.atmo3}`,
      border: `solid 1px ${theme.hv.palette.atmosphere.atmo5}`,
    },

    "& $switchBase + $track": {
      backgroundColor: `${theme.hv.palette.atmosphere.atmo3}`,
      border: `solid 1px ${theme.hv.palette.atmosphere.atmo5}`,
    },
  },

  disabledLabel: {
    ...theme.hv.typography.placeholderText,
  },

  leftLabel: {
    paddingRight: `${theme.hv.spacing.xs}px`,
  },

  rightLabel: {
    paddingLeft: `${theme.hv.spacing.xs}px`,
  },
});

export default styles;
