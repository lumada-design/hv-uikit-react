import "focus-within-polyfill";
import focusStyles from "../../../Focus/styles";

const { focused, focusDisabled, externalReference, falseFocus } = focusStyles;

const styles = (theme) => {
  const hoverColor = theme.hv.palette.atmosphere.atmo3;

  return {
    root: {
      display: "inline",
      "&:hover": {
        "& > [role='button']": {
          backgroundColor: hoverColor,
        },
        "&:focus-within": {
          "& > [role='button']": {
            backgroundColor: hoverColor,
          },
        },
      },
      // IE fallback code (using focus-within-polyfill)
      "&.focus-within": {
        "& > [role='button']": {
          backgroundColor: hoverColor,
        },
      },
    },
    selectedItem: {
      borderTop: `2px solid ${theme.hv.palette.accent.acce3}`,
      paddingTop: "2px",
    },
    notSelectedItem: {
      marginTop: "4px",
    },
    button: {
      border: "none",
      cursor: "pointer",
      padding: theme.hvSpacing("8px", "sm"),
      "&:active": {
        outline: "none",
      },
      "&:focus": {
        backgroundColor: hoverColor,
      },
    },
    contentFocusDisabled: {
      ...focusDisabled,
    },
    contentFocused: {
      ...focused,
    },
    externalReference: {
      ...externalReference,
    },
    falseFocus: {
      ...falseFocus,
      top: "4px",
    },
  };
};

export default styles;
