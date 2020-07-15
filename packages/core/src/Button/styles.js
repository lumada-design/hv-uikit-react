import { fade, hexToRgb } from "@material-ui/core";
import { outlineStyles } from "../Focus/styles";

const setColor = color => ({
  "& svg .color0": {
    fill: color
  }
});

const styles = theme => {
  const base1RGB = hexToRgb(theme.hv.palette.base.base1);
  const convertedColor = fade(base1RGB, 0.3);
  const convertedColorDisabled = fade(base1RGB, 0.1);

  return {
    root: {
      textTransform: "none",
      "&:hover,&:focus": {},
      "&:active": {},
      "&:focus": {
        ...outlineStyles
      },
      minWidth: "70px",
      padding: theme.spacing(0, "xs"),
      cursor: "pointer",
      height: "32px",
      minHeight: "32px",
      borderRadius: "2px",
      ...theme.hv.typography.highlightText
    },
    rootIcon: {
      padding: 0,
      height: "unset",
      width: "unset",
      minHeight: "unset",
      minWidth: "unset",
      ...theme.hv.typography.highlightText
    },

    primary: {
      color: theme.hv.palette.atmosphere.atmo1,
      backgroundColor: theme.hv.palette.accent.acce2,
      "&:hover,&:focus": {
        backgroundColor: theme.hv.palette.accent.acce2h
      },
      "&:active": {
        backgroundColor: theme.hv.palette.accent.acce2
      },
      "&$primaryDisabled": {
        color: theme.hv.palette.atmosphere.atmo5,
        backgroundColor: theme.hv.palette.atmosphere.atmo3,
        cursor: "not-allowed",
        pointerEvents: "auto"
      },
      "&$primaryDisabled&:hover": {
        backgroundColor: theme.hv.palette.atmosphere.atmo3,
        color: theme.hv.palette.atmosphere.atmo5,
        cursor: "not-allowed",
        pointerEvents: "auto"
      }
    },
    primaryDisabled: {},
    secondary: {
      color: theme.hv.palette.accent.acce1,
      backgroundColor: theme.hv.palette.atmosphere.atmo1,
      border: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,
      "&:hover,&:focus": {
        backgroundColor: theme.hv.palette.atmosphere.atmo3,
        border: `1px solid ${theme.hv.palette.atmosphere.atmo4}`
      },
      "&:active": {
        backgroundColor: theme.hv.palette.atmosphere.atmo1
      },
      "&$secondaryDisabled": {
        color: theme.hv.palette.atmosphere.atmo5,
        backgroundColor: theme.hv.palette.atmosphere.atmo3,
        border: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,
        cursor: "not-allowed",
        pointerEvents: "auto"
      },
      "&$secondaryDisabled&:hover": {
        backgroundColor: theme.hv.palette.atmosphere.atmo3,
        color: theme.hv.palette.atmosphere.atmo5,
        border: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,
        cursor: "not-allowed",
        pointerEvents: "auto"
      }
    },
    secondaryDisabled: {},

    ghost: {
      color: theme.hv.palette.accent.acce1,
      backgroundColor: "transparent",
      "&:hover,&:focus": {
        backgroundColor: theme.hv.palette.atmosphere.atmo3
      },
      "&:active": {
        backgroundColor: "transparent"
      },
      "&$ghostDisabled": {
        backgroundColor: "transparent",
        color: theme.hv.palette.atmosphere.atmo5,
        border: "none",
        cursor: "not-allowed",
        pointerEvents: "auto"
      },
      "&$ghostDisabled&:hover": {
        backgroundColor: "transparent",
        color: theme.hv.palette.atmosphere.atmo5,
        border: "none",
        cursor: "not-allowed",
        pointerEvents: "auto"
      }
    },
    ghostDisabled: {},
    semantic: {
      color: theme.hv.palette.base.base2,
      backgroundColor: "transparent",
      "&:hover,&:focus": {
        backgroundColor: convertedColor
      },
      "&:active": {
        backgroundColor: convertedColor
      },
      "&$semanticDisabled": {
        color: theme.hv.palette.atmosphere.atmo7,
        backgroundColor: convertedColorDisabled,
        border: "none",
        cursor: "not-allowed",
        pointerEvents: "auto"
      },
      "&$semanticDisabled&:hover": {
        backgroundColor: convertedColorDisabled,
        color: theme.hv.palette.atmosphere.atmo7,
        border: "none",
        cursor: "not-allowed",
        pointerEvents: "auto"
      }
    },
    semanticDisabled: {},
    startIcon: {
      marginLeft: -8,
      marginRight: 0
    },

    primarySVG: {
      ...setColor(theme.hv.palette.accent.acce0),
      "&$primaryDisabled": {
        ...setColor(theme.hv.palette.atmosphere.atmo7)
      }
    },
    secondarySVG: {
      ...setColor(theme.hv.palette.accent.acce1),
      "&$secondaryDisabled": {
        ...setColor(theme.hv.palette.atmosphere.atmo7)
      }
    },
    ghostSVG: {
      ...setColor(theme.hv.palette.accent.acce1),
      "&$ghostDisabled": {
        ...setColor(theme.hv.palette.atmosphere.atmo7)
      }
    },
    semanticSVG: {
      ...setColor(theme.hv.palette.base.base2),
      "&$semanticDisabled": {
        ...setColor(theme.hv.palette.atmosphere.atmo7)
      }
    },
    iconSVG: {
      ...setColor(theme.hv.palette.accent.acce1),
      "&$ghostDisabled": {
        ...setColor(theme.hv.palette.atmosphere.atmo7)
      }
    }
  };
};

export default styles;
