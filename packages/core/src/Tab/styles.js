import { outlineStyles } from "../Focus/styles";

const styles = theme => ({
  root: {
    marginTop: "3px",
    padding: "0 20px",
    minWidth: 70,
    minHeight: 32,
    textTransform: "none",
    fontFamily: theme.hv.typography.fontFamily,
    ...theme.hv.typography.normalText,
    "&:focus, &:hover": {
      "& $tabBorder": {
        height: "1px",
        backgroundColor: theme.hv.palette.atmosphere.atmo5
      }
    },
    "&$selected": {
      color: theme.hv.typography.highlightText.color,
      fontWeight: theme.hv.typography.highlightText.fontWeight,
      lineHeight: theme.hv.typography.highlightText.lineWeight,
      letterSpacing: theme.hv.typography.highlightText.letterSpacing
    },
    "&:focus": {
      ...outlineStyles
    },
    "&$disabled": {
      color: theme.hv.palette.atmosphere.atmo5,
      cursor: "not-allowed",
      pointerEvents: "all",
      opacity: 1,
      "&:focus, &:hover": {
        background: "none",
        "& $tabBorder": {
          backgroundColor: theme.hv.palette.atmosphere.atmo4
        }
      }
    },
    opacity: 1
  },
  tabBorder: {
    position: "absolute",
    left: 0,
    top: "calc(100% - 1px)",
    height: "1px",
    width: "100%",
    backgroundColor: theme.hv.palette.atmosphere.atmo4
  },
  selected: {},
  disabled: {}
});

export default styles;
