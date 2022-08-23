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
    padding: 0,
    cursor: "pointer",
  },

  switch: {
    padding: 0,
    width: switchWidth,
    height: 16,

    "&$readOnly $switchBase": {
      cursor: "default",
    },
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
    height: 16,
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
      opacity: 1,
    },
  },

  readOnly: {},

  focusVisible: {
    borderRadius: "8px",
    ...outlineStyles,
  },
});

export default styles;
