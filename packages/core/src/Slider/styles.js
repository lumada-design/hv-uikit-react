import { outlineStyles } from "../Focus/styles";

const styles = (theme) => {
  const ring = {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    border: `9px solid ${theme.hv.palette.accent.acce1}`,
    opacity: "20%",
    content: "''",
    position: "absolute",
    top: "-10px",
    left: "-10px",
  };
  const border = {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    border: `2px solid ${theme.hv.palette.atmosphere.atmo1}`,
    content: "''",
    position: "absolute",
    top: "-4px",
    left: "-4px",
  };
  const dragSquare = {
    cursor: "grab",
    width: "calc(100% - 40px)",
    left: "20px",
    height: "27px",
    position: "absolute",
    top: "-12px",
    content: "''",
    background: "transparent",
    borderTop: `12px solid ${theme.hv.palette.atmosphere.atmo3}`,
    borderBottom: `12px solid ${theme.hv.palette.atmosphere.atmo3}`,
    zIndex: "-2",
  };
  const dot = {
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
  };

  return {
    root: {},
    rootDisabled: {
      cursor: "not-allowed",
      "& .rc-slider-disabled": {
        background: "transparent",
      },
    },
    sliderContainer: {
      marginBottom: "18px",
      padding: "0 23px",
    },
    error: {
      padding: "0 8px",
    },
    trackDragging: {
      cursor: "grabbing",
      "& .rc-slider-track": {
        "&::before": {
          ...dragSquare,
          cursor: "grabbing",
        },
      },
    },
    trackStandBy: {
      "& .rc-slider-track": {
        "&:hover": {
          "&::before": {
            ...dragSquare,
          },
        },
      },
    },
    sliderRoot: {
      zIndex: 0,
    },
    rootRange: {},
    handleContainer: {
      "& .rc-slider-handle": {
        cursor: "pointer",
        marginTop: "-8px",
        opacity: 1,
        "&:active": {
          cursor: "grab",
          "&::before": {
            ...ring,
          },
          "&::after": {
            ...border,
          },
        },
        "&:hover": {
          "&::before": {
            ...ring,
          },
          "&::after": {
            ...border,
          },
        },
        // Note about the usage of `!important below`: the way the rc-slider allows us to
        // style the knobs is through inline styles. This means that the `box-shadow`, which
        // is an inline style and is set to `none` to prevent the default rc-slider style to
        // show, can't be overriden for the focus scenario unless we use the `!important` flag.
        "&:focus-visible": {
          ...outlineStyles,
          boxShadow: "0 0 0 1px #52A8EC, 0 0 0 4px rgba(29,155,209,.3)!important",
        },
      },
    },
    handle: {},
    handleContainerDisabled: {
      "& .rc-slider-handle": {
        cursor: "not-allowed",
        marginTop: "-8px",
        opacity: 1,
        "&:active": {
          cursor: "not-allowed",
        },
        "&:hover": {
          cursor: "not-allowed",
        },
      },
    },
    handleHiddenContainer: {
      display: "none",
    },
    labelContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "12px",
      marginLeft: "20px",
      marginRight: "20px",
    },
    labelIncluded: {
      justifyContent: "space-between",
    },
    onlyInput: {
      justifyContent: "flex-end",
    },
    label: {},
    dot: {
      ...dot,
    },
    dotDisabled: {
      ...dot,
      cursor: "not-allowed",
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
    disabledMark: {
      ...theme.hv.typography.vizText,
      fontFamily: theme.hv.typography.fontFamily,
      color: `${theme.hv.palette.atmosphere.atmo5}`,
      cursor: "not-allowed",
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
  };
};

export default styles;
