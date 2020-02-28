import { fade, hexToRgb } from "@material-ui/core";
import { outlineStyles } from "../Focus/styles";

const setColor = color => ({
  color,
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
      ...setColor(theme.hv.palette.accent.acce0),
      backgroundColor: theme.hv.palette.accent.acce2,
      "&:hover": {
        backgroundColor: theme.hv.palette.accent.acce2h
      },
      "&:active": {
        backgroundColor: theme.hv.palette.accent.acce2
      },
      "&$primaryDisabled": {
        backgroundColor: theme.hv.palette.atmosphere.atmo4,
        color: theme.hv.palette.atmosphere.atmo7,
        cursor: "not-allowed",
        pointerEvents: "auto"
      },
      "&$primaryDisabled&:hover": {
        backgroundColor: theme.hv.palette.atmosphere.atmo4,
        color: theme.hv.palette.atmosphere.atmo7,
        cursor: "not-allowed",
        pointerEvents: "auto"
      }
    },
    primaryDisabled: {
      backgroundColor: theme.hv.palette.atmosphere.atmo4,
      ...setColor(theme.hv.palette.atmosphere.atmo7),
      cursor: "not-allowed"
    },
    secondary: {
      backgroundColor: theme.hv.palette.atmosphere.atmo1,
      ...setColor(theme.hv.palette.accent.acce1),
      border: `1px solid ${theme.hv.palette.atmosphere.atmo6}`,
      "&:hover": {
        backgroundColor: theme.hv.palette.atmosphere.atmo4,
        border: `1px solid ${theme.hv.palette.atmosphere.atmo4}`
      },
      "&:active": {
        backgroundColor: theme.hv.palette.atmosphere.atmo1
      },
      "&$secondaryDisabled": {
        backgroundColor: theme.hv.palette.atmosphere.atmo4,
        color: theme.hv.palette.atmosphere.atmo7,
        border: "none",
        cursor: "not-allowed",
        pointerEvents: "auto"
      },
      "&$secondaryDisabled&:hover": {
        backgroundColor: theme.hv.palette.atmosphere.atmo4,
        color: theme.hv.palette.atmosphere.atmo7,
        border: "none",
        cursor: "not-allowed",
        pointerEvents: "auto"
      }
    },
    secondaryDisabled: {
      backgroundColor: theme.hv.palette.atmosphere.atmo4,
      ...setColor(theme.hv.palette.atmosphere.atmo7),
      cursor: "not-allowed",
      border: "none"
    },
    ghost: {
      ...setColor(theme.hv.palette.accent.acce1),
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: theme.hv.palette.atmosphere.atmo4
      },
      "&:active": {
        backgroundColor: "transparent"
      },
      "&$ghostDisabled": {
        backgroundColor: "transparent",
        color: theme.hv.palette.atmosphere.atmo7,
        border: "none",
        cursor: "not-allowed",
        pointerEvents: "auto"
      },
      "&$ghostDisabled&:hover": {
        backgroundColor: "transparent",
        color: theme.hv.palette.atmosphere.atmo7,
        border: "none",
        cursor: "not-allowed",
        pointerEvents: "auto"
      }
    },
    ghostDisabled: {
      backgroundColor: "transparent",
      ...setColor(theme.hv.palette.atmosphere.atmo7),
      cursor: "not-allowed"
    },
    ghostSecondary: {
      ...setColor(theme.hv.palette.accent.acce2),
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: theme.hv.palette.atmosphere.atmo4
      },
      "&:active": {
        backgroundColor: "transparent"
      },
      "&$ghostSecondaryDisabled": {
        backgroundColor: "transparent",
        color: theme.hv.palette.atmosphere.atmo7,
        border: "none",
        cursor: "not-allowed",
        pointerEvents: "auto"
      },
      "&$ghostSecondaryDisabled&:hover": {
        backgroundColor: "transparent",
        color: theme.hv.palette.atmosphere.atmo7,
        border: "none",
        cursor: "not-allowed",
        pointerEvents: "auto"
      }
    },
    ghostSecondaryDisabled: {
      backgroundColor: "transparent",
      ...setColor(theme.hv.palette.atmosphere.atmo7),
      cursor: "not-allowed"
    },
    semantic: {
      ...setColor(theme.hv.palette.base.base2),
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: convertedColor
      },
      "&:active": {
        backgroundColor: convertedColor
      },
      "&$semanticDisabled": {
        backgroundColor: convertedColorDisabled,
        ...setColor(theme.hv.palette.atmosphere.atmo7),
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
    semanticDisabled: {
      backgroundColor: convertedColorDisabled,
      color: theme.hv.palette.atmosphere.atmo7,
      cursor: "not-allowed"
    },
    startIcon: {
      marginLeft: -8,
      marginRight: 0
    }
  };
};

export default styles;
