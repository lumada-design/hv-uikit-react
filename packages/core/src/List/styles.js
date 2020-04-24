const selected = theme => ({
  background: theme.hv.palette.accent.acce1,
  color: theme.hv.palette.atmosphere.atmo1,
  "& *": {
    background: theme.hv.palette.accent.acce1,
    color: theme.hv.palette.atmosphere.atmo1
  }
});

const hover = theme => ({
  background: theme.hv.palette.atmosphere.atmo4,
  "& *": {
    background: theme.hv.palette.atmosphere.atmo4
  }
});

const hoverActive = theme => ({
  ...selected(theme),
  "& svg *.color0": {
    fill: theme.hv.palette.atmosphere.atmo1
  }
});

const styles = theme => ({
  root: {},
  list: {
    display: "block",
    padding: 0,
    margin: 0,
    marginTop: 2
  },
  listItem: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "32px",
    listStyleType: "none",
    cursor: "pointer",
    "&:not($disabled):not($selected):hover": hover(theme),
    "&:not($disabled):not($selector):hover:active": hoverActive(theme),
    "&:not(:last-child)": {
      marginBottom: "8px"
    },
    "&$condensed": {
      marginBottom: 0
    }
  },
  condensed: {},
  selector: {},
  selectorContainer: {
    width: "100%"
  },
  selected: selected(theme),
  selectAll: {
    "& > span": {
      ...theme.hv.typography.highlightText
    }
  },
  disabled: {
    cursor: "not-allowed",
    "& *": {
      cursor: "not-allowed"
    }
  },
  textDisabled: {
    ...theme.hv.typography.placeholderText
  },
  label: {
    padding: `0 ${theme.hv.spacing.xs}px`
  },
  labelIconLeftPadding: {
    paddingLeft: 0
  },
  noIconLeftPadding: {
    paddingLeft: `${theme.hv.spacing.md}px`
  },
  truncate: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  box: {
    width: "32px",
    height: "32px",
    marginLeft: "auto"
  }
});

export default styles;
