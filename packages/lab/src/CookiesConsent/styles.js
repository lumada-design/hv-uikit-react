import { fade, hexToRgb } from "@material-ui/core";

const bannerStyles = ({ hv }) => ({
  root: {
    display: "flex",
    padding: hv.spacing.sm,

    backgroundColor: hv.palette.atmosphere.atmo2,
    boxShadow: hv.shadows[1],
  },
  title: {
    paddingBottom: hv.spacing.xs,
  },
  content: {
    marginRight: hv.spacing.sm,
  },
  actions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& > *": {
      "&:first-child": {
        marginRight: hv.spacing.xs,
      },
    },
  },
});

const dialogStyles = ({ hv }) => ({
  background: {
    background: fade(hexToRgb(hv.palette.atmosphere.atmo4), 0.8),
  },
  paper: {
    background: `${hv.palette.atmosphere.atmo1}`,
    padding: "0px",
    overflow: "auto",
    boxShadow: hv.shadows[1],
  },
});

export { bannerStyles, dialogStyles };
