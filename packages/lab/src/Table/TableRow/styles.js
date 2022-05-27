import { hexToRgb } from "@material-ui/core";
import { alpha } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {
    color: "inherit",
    backgroundColor: "inherit",
    verticalAlign: "middle",
    outline: 0,
    minHeight: 32,
    "tr&": {
      height: 32,
    },
  },
  head: {
    "&:first-child": {
      height: 52,
    },

    "tr&:first-child": {
      height: 52,
    },
  },
  body: {},
  footer: {},
  selected: {},
  expanded: {
    backgroundColor: theme.palette.atmo1,
    "& > *[role=cell]": {
      borderBottom: "none",
    },
  },
  striped: {
    "&:nth-child(even)": {
      backgroundColor: alpha(hexToRgb(theme.palette.atmo1), 0.6),
    },
  },
  hover: {
    transition: theme.transitions.create("background-color", {
      duration: theme.transitions.duration.shortest,
    }),

    "&:hover": {
      backgroundColor: theme.palette.atmo3,
    },
  },
  variantList: {
    borderBottom: 0,
    backgroundColor: theme.palette.atmo1,
    height: 52,
    "&$selected": {
      boxShadow: `1px 1px ${theme.hv.palette.accent.acce1}, -1px -1px ${theme.hv.palette.accent.acce1}, -1px 1px ${theme.hv.palette.accent.acce1}, 1px -1px ${theme.hv.palette.accent.acce1}`,

      "&:hover": {
        boxShadow: `1px 1px ${theme.hv.palette.accent.acce1}, -1px -1px ${theme.hv.palette.accent.acce1}, -1px 1px ${theme.hv.palette.accent.acce1}, 1px -1px ${theme.hv.palette.accent.acce1}`,
        background: theme.hv.palette.atmosphere.atmo1,
      },
    },

    "&:hover": {
      boxShadow: `1px 1px ${theme.hv.palette.atmosphere.atmo4}, -1px -1px ${theme.hv.palette.atmosphere.atmo4}, -1px 1px ${theme.hv.palette.atmosphere.atmo4}, 1px -1px ${theme.hv.palette.atmosphere.atmo4}`,
      background: theme.hv.palette.atmosphere.atmo1,
    },
  },
  variantListHead: {
    height: 16,
    "&:first-child": {
      height: 16,
    },

    "tr&:first-child": {
      height: 16,
    },
  },
});

export default styles;
