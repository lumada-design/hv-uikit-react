const styles = theme => ({
  table: {
    fontSize: 14,
    width: "100%",
    borderCollapse: "collapse",
    "& tr": {},
    "& th": {
      padding: "7px 20px",
      textAlign: "left",
      height: "52px",
      ...theme.hv.typography.highlightText,
      background: theme.hv.palette.atmosphere.atmo1,
      borderBottom: `1px solid ${theme.hv.palette.atmosphere.atmo5}`,
      verticalAlign: "top"
    },
    "& td": {
      padding: "0 20px",
      ...theme.hv.typography.normalText,
      lineHeight: "32px",
      minWidth: "150px",
      borderBottom: `1px solid ${theme.hv.palette.atmosphere.atmo5}`
    }
  }
});

export default styles;
