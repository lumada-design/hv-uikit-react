const styles = theme => ({
  topGutter: { marginTop: 8 },
  helperDisabled: {
    color: theme.hv.palette.atmosphere.atmo5,
    display: "none"
  },
  helperText: {
    color: theme.hv.palette.accent.acce1,
    display: "none"
  },
  showText: {
    display: "block"
  },
  "@global": {
    "input:-webkit-autofill": {
      "-webkit-box-shadow": `0 0 0px 1000px ${theme.hv.palette.atmosphere.atmo1} inset`,
      "-webkit-text-fill-color": theme.hv.typography.normalText.color
    }
  }
});

export default styles;
