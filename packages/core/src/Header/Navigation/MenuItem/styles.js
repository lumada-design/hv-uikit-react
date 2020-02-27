import "focus-within-polyfill";

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
  menubarItem: {
    borderTop: `2px solid transparent`,
    borderBottom: `2px solid transparent`
  },
  selectedItem: {
    borderTop: `2px solid ${theme.hv.palette.accent.acce3}`
  },
  menuItem: {
    border: "none",
    display: "inline-flex",
    alignItems: "center"
  },
  button: {
    border: "none",
    background: "none",
    cursor: "pointer",
    padding: `6px ${theme.hv.spacing.sm}px`,
    "&:active": {
      outline: "none"
    }
  }
});

export default styles;
