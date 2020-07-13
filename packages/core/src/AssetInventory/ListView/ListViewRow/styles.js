const styles = theme => ({
  selectCell: {
    width: "32px",
    display: "table-cell",
    verticalAlign: "middle"
  },
  root: {
    background: theme.hv.palette.atmosphere.atmo1,
    display: "table-row"
  },
  button: {
    padding: `0 ${theme.hv.spacing.xs}px`,
    marginRight: `${theme.hv.spacing.xs}px`,
    position: "relative"
  },
  dropdownMenu: {
    position: "relative"
  },
  selectable: {
    cursor: "pointer",
    "&:hover": {
      outline: `1px solid ${theme.hv.palette.atmosphere.atmo4}`
    }
  },
  selected: {
    outline: `1px solid ${theme.hv.palette.accent.acce1}`,
    "&:hover": {
      outline: `1px solid ${theme.hv.palette.accent.acce1}`
    }
  },
  actionSeparator: {
    width: 1,
    whiteSpace: "nowrap",
    alignItems: "center",
    paddingLeft: `${theme.hv.spacing.xs}px`,
    paddingRight: `${theme.hv.spacing.xs}px`,
    "&::before": {
      content: "''",
      height: "100%",
      width: 2,
      display: "block",
      background: theme.hv.palette.atmosphere.atmo2,
      position: "absolute",
      top: 0,
      left: 0
    },
    "& > button": {
      float: "right"
    }
  },
  checkboxPlacement: {
    display: "flex",
    justifyContent: "center"
  }
});

export default styles;
