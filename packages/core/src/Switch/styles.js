const switchWidth = 52;

const thumbPosition = {
  position: "relative",
  left: -16,
  width: 16,
  height: 16
};

const styles = theme => ({
  root: {
    display: "inline-flex",
    height: 22
  },
  switch: {
    padding: 0,
    width: switchWidth,
    height: 22,
    cursor: "pointer"
  },

  switchBase: {
    width: switchWidth,
    height: 22,
    padding: 0,
    // increase CSS specificity
    "&:hover": {
      backgroundColor: "transparent"
    },
    "&$checked": {
      transform: "translateX(32px)",
      "& + $track": {
        opacity: 1
      },
      "&:hover": {
        backgroundColor: "transparent"
      }
    }
  },

  track: {
    borderRadius: 16,
    border: `solid 1px ${theme.hv.palette.accent.acce1}`,
    backgroundColor: theme.hv.palette.atmosphere.atmo2,
    opacity: "unset"
  },

  thumb: {
    ...thumbPosition,
    border: `solid 1px ${theme.hv.palette.accent.acce1}`,
    backgroundColor: theme.hv.palette.atmosphere.atmo2
  },

  checked: {},

  disabled: {
    color: theme.hv.palette.atmosphere.atmo4,
    borderColor: theme.hv.palette.atmosphere.atmo6,
    cursor: "no-drop",
    "& + $track": {
      backgroundColor: `${theme.hv.palette.atmosphere.atmo4} !important`,
      border: `solid 1px ${theme.hv.palette.atmosphere.atmo6}`,
      opacity: "1 !important",
      cursor: "no-drop"
    },
    "& $thumb": {
      backgroundColor: `${theme.hv.palette.atmosphere.atmo4}`,
      border: `solid 1px ${theme.hv.palette.atmosphere.atmo6}`
    }
  },

  disabledLabel: {
    ...theme.hv.typography.placeholderText,
    height: `${theme.hv.spacing.sm}px`,
    cursor: "no-drop"
  },

  labelDeselected: {
    ...theme.hv.typography.normalText,
    height: `${theme.hv.spacing.sm}px`,
    cursor: "pointer"
  },
  labelSelected: {
    height: `${theme.hv.spacing.sm}px`,
    cursor: "default"
  },

  leftLabel: {
    paddingRight: `${theme.hv.spacing.xs}px`
  },

  rightLabel: {
    paddingLeft: `${theme.hv.spacing.xs}px`
  },

  checkedIcon: {
    ...thumbPosition,
    backgroundColor: theme.hv.palette.atmosphere.atmo1,
    border: "none",
    borderRadius: "50%"
  }
});

export default styles;
