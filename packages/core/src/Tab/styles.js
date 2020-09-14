import { outlineStyles } from "../Focus/styles";

const styles = theme => ({
  root: {
    minWidth: 70,
    padding: "13px 20px",
    textTransform: "none",
    fontFamily: theme.hv.typography.fontFamily,
    ...theme.hv.typography.normalText,
    "&:focus, &:hover": {
      background: theme.hv.palette.atmosphere.atmo4
    },
    "&$selected": {
      fontWeight: 600,
      "&:hover": {
        background: theme.hv.palette.atmosphere.atmo4
      }
    },
    "&$disabled": {
      color: theme.hv.palette.atmosphere.atmo7,
      cursor: "not-allowed",
      pointerEvents: "all",
      opacity: 1,
      "&:focus, &:hover": {
        background: "none"
      }
    },
    opacity: 1
  },
  focusVisible: {
    ...outlineStyles
  },
  selected: {},
  disabled: {}
});

export default styles;
