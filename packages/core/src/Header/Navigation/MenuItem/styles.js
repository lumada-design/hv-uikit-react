import "focus-within-polyfill";
import focusStyles, { outlineStyles } from "../../../Focus/styles";

const { externalReference, falseFocus } = focusStyles;

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
        outline: "none",
        backgroundColor: hoverColor,
      },
      "&.focus-visible": {
        ...outlineStyles,
      },
    },
    link: {
      display: "block",
      textDecoration: "none",
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
