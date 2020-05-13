import "focus-within-polyfill";
import focusStyles from "../../../Focus/styles";

const { focused, focusDisabled, externalReference, falseFocus } = focusStyles;

const styles = theme => ({
  root: {
    display: "inline",
    "&:hover": {
      "& > [role='button']": {
        backgroundColor: theme.hv.palette.atmosphere.atmo4
      },
      "&:focus-within": {
        "& > [role='button']": {
          backgroundColor: theme.hv.palette.atmosphere.atmo4
        }
      }
    },
    // IE fallback code (using focus-within-polyfill)
    "&.focus-within": {
      "& > [role='button']": {
        backgroundColor: theme.hv.palette.atmosphere.atmo4
      }
    }
  },
  selectedItem: {
    borderTop: `2px solid ${theme.hv.palette.accent.acce3}`
  },
  button: {
    border: "none",
    cursor: "pointer",
    marginTop: 2,
    padding: `6px ${theme.hv.spacing.sm}px`,
    "&:active": {
      outline: "none"
    }
  },
  contentFocusDisabled: {
    ...focusDisabled
  },
  contentFocused: {
    ...focused
  },
  externalReference: {
    ...externalReference
  },
  falseFocus: {
    ...falseFocus,
    top: "4px"
  }
});

export default styles;
