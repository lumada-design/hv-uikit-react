import "focus-within-polyfill";
import focusStyles from "../../../Focus/styles";

const { focused, focusDisabled, externalReference, falseFocus } = focusStyles;

const styles = theme => {
  const hoverColor = theme.hv.palette.atmosphere.atmo4;

  return {
    root: {
      display: "inline",
      "&:hover": {
        "& > [role='button']": {
          backgroundColor: hoverColor
        },
        "&:focus-within": {
          "& > [role='button']": {
            backgroundColor: hoverColor
          }
        }
      },
      // IE fallback code (using focus-within-polyfill)
      "&.focus-within": {
        "& > [role='button']": {
          backgroundColor: hoverColor
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
      },
      "&:focus": {
        backgroundColor: hoverColor
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
  };
};

export default styles;
