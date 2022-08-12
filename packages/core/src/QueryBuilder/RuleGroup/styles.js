const styles = (theme) => ({
  root: {
    position: "relative",
    padding: theme.hv.spacing.sm,

    marginTop: 12,
    marginBottom: 32,

    border: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,
  },
  subGroup: {
    margin: "40px 14px 32px 20px",
    minHeight: 120,
    paddingBottom: 60,

    "&::before": {
      content: '""',
      position: "absolute",
      zIndex: 2,

      width: 21,
      height: 36,

      borderBottom: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,
      borderLeft: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,

      top: -38,
      left: -42,
    },
    ":not(.topRulesContainer)>&:last-child::after": {
      content: '""',
      position: "absolute",
      zIndex: 1,

      width: 32,
      height: "100%",

      borderLeft: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,

      top: 0,
      left: -22,
    },
  },
  topGroup: {
    margin: theme.hv.spacing.sm,
    backgroundColor: "transparent",
    maxWidth: "100%",
    minWidth: 740,

    paddingBottom: theme.hv.spacing.sm * 3,
  },

  combinator: {
    minWidth: 80,
  },
  topCombinator: {
    position: "absolute",
    top: -theme.hv.spacing.sm,
    left: -theme.hv.spacing.sm,
  },

  combinatorButton: {},

  actionButtonContainer: {
    marginLeft: "auto",

    "&>*": {
      marginLeft: theme.hv.spacing.sm,
    },
  },
  topActionButtonContainer: {
    position: "absolute",
    bottom: -theme.hv.spacing.md * 0.5, // compensating for material grid new spacing
    right: theme.hv.spacing.sm * 1.75, // compensating for material grid new spacing
  },

  removeButton: {},
  topRemoveButton: {
    position: "absolute",
    top: -16,
    right: -16,
    backgroundColor: theme.hv.palette.atmosphere.atmo2,
  },

  topRemoveButtonDisabled: {
    backgroundColor: theme.hv.palette.atmosphere.atmo2,
  },

  rulesContainer: {},

  subRulesContainer: {
    borderLeft: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,

    marginLeft: theme.hv.spacing.sm,
    marginBottom: theme.hv.spacing.md,
    paddingLeft: theme.hv.spacing.sm,

    paddingTop: 7,

    position: "relative",
    left: -41,

    width: "100%",
  },
});

export default styles;
