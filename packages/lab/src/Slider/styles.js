const styles = (theme) => ({
  root: {
    "& .rc-slider-handle": {
      cursor: "pointer",
      marginTop: "-8px",
      "&:active": {
        cursor: "grab",
      },
    },
    zIndex: 0,
  },
  dot: {
    position: "absolute",
    bottom: "-1px",
    marginLeft: "0px",
    width: "1px",
    height: "4px",
    border: "none",
    borderRadius: "0%",
    backgroundColor: theme.hv.palette.atmosphere.atmo4,
    cursor: "pointer",
    verticalAlign: "middle",
    zIndex: "-3",
  },
  rail: {
    backgroundColor: theme.hv.palette.atmosphere.atmo4,
    height: "1px",
    zIndex: "-3",
  },
  knobInner: {
    borderColor: "transparent",
    boxShadow: "none",
    backgroundColor: theme.hv.palette.accent.acce1,
    width: "16px",
    height: "16px",
  },
  knobOuter: {
    position: "relative",
    borderColor: "transparent",
    borderRadius: "50%",
    boxShadow: "none",
    backgroundColor: theme.hv.palette.atmosphere.atmo4,
    width: "32px",
    height: "32px",
    top: "-80%",
    left: "-80%",
    zIndex: "-1",
  },
  knobHidden: {
    display: "none",
  },
  knobHiddenLast: {
    borderColor: "transparent",
    height: "3px",
    width: "2px",
    marginLeft: "-1px",
    border: "none",
    borderRadius: "0",
    marginTop: "0px",
    left: "100%",
    touchAction: "none",
    cursor: "default",
  },
  track: {
    backgroundColor: theme.hv.palette.accent.acce1,
    height: "3px",
    zIndex: "-1",
    marginTop: "-1px",
  },
  mark: {
    ...theme.hv.typography.vizText,
    fontFamily: theme.hv.typography.fontFamily,
    top: "-2px",
  },
  sliderTooltip: {
    "& .rc-slider-tooltip-inner": {
      background: theme.hv.palette.atmosphere.atmo1,
      borderRadius: 0,
      maxWidth: "532px",
      height: "100%",
      padding: `${theme.hv.spacing.sm}px`,
      ...theme.hv.typography.normalText,
      fontFamily: theme.hv.typography.fontFamily,
      boxShadow: "none",
    },
    "& .rc-slider-tooltip-arrow": {
      visibility: "hidden",
    },
  },
});

export default styles;
