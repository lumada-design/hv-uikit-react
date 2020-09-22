const styles = theme => ({
  root: {
    display: "none"
  },
  topBorder: {
    borderTop: `solid 1px ${theme.hv.palette.semantic.sema4}`
  },
  topGutter: { paddingTop: 8 },
  warningText: {
    color: theme.hv.palette.semantic.sema4,
    paddingRight: theme.hv.spacing.xs
  },
  defaultIcon: {
    minWidth: "32px"
  },
  showText: {
    display: "flex"
  },
  "@global": {
    "input:-webkit-autofill": {
      "-webkit-box-shadow": `0 0 0px 1000px ${theme.hv.palette.atmosphere.atmo1} inset`,
      "-webkit-text-fill-color": theme.hv.typography.normalText.color
    }
  }
});

export default styles;
