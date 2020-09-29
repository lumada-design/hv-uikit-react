import mapValues from "lodash/mapValues";

const styles = (theme) => {
  const semantics = mapValues(theme.hv.palette.semantic, (value) => ({
    "&::before": {
      background: value,
    },
  }));

  const atmosphere = mapValues(theme.hv.palette.atmosphere, (value) => ({
    "&::before": {
      background: value,
    },
  }));

  return {
    root: {
      position: "relative",
      padding: `${theme.hv.spacing.xs}px 0 ${theme.hv.spacing.xs}px 0`,
      display: "table-cell",
      verticalAlign: "middle",
    },
    semanticBar: {
      "&::before": {
        content: "''",
        height: "100%",
        width: 2,
        display: "block",
        background: theme.hv.palette.semantic.sema1,
        position: "absolute",
        top: 0,
        left: 0,
      },
    },
    ...semantics,
    ...atmosphere,
  };
};

export default styles;
