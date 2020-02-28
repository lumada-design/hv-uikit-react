const root = theme => ({
  position: "relative",
  background: theme.hv.palette.atmosphere.atmo1,
  height: "32px",
  paddingLeft: `${theme.hv.spacing.xs}px`,
  paddingRight: `${theme.hv.spacing.md}px`
});

const icon = {
  position: "absolute",
  top: 0,
  right: 0,
  width: "30px",
  height: "30px"
};

const styles = theme => ({
  rootWithoutInput: {
    ...root(theme),
    border: `1px solid ${theme.hv.palette.atmosphere.atmo6}`
  },
  rootWithInput: {
    ...root(theme),
    border: `1px solid ${theme.hv.palette.accent.acce1}`
  },

  input: {
    border: "none",
    height: "30px",
    width: "100%",
    background: "transparent",
    ...theme.hv.typography.normalText,
    "&:focus": {
      outline: "none"
    },
    "&::placeholder": {
      ...theme.hv.typography.normalText,
      color: theme.hv.typography.disabledText.color
    },
    "&::-ms-clear": {
      display: "none"
    }
  },
  icon: {
    ...icon
  },
  iconClear: {
    ...icon,
    cursor: "pointer"
  }
});

export default styles;
