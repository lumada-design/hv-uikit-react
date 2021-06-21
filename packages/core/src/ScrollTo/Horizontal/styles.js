import fade from "../../utils/hexToRgbA";

const styles = (theme) => ({
  root: {
    display: "flex",
    width: "100%",
    padding: "0 30px",
    backgroundColor: fade(theme.palette.atmo2, 0.8),
    margin: 0,
    listStyleType: "none",
    flexWrap: "wrap",
  },
  positionSticky: {
    width: "100%",
    position: "sticky",
    zIndex: theme.zIndex.appBar - 2,
    top: 0,
    left: 0,
  },
  positionFixed: {
    width: "100%",
    position: "fixed",
    zIndex: theme.zIndex.appBar - 2,
    top: 0,
    left: 0,
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - 2*${theme.spacing(4)}px)`,
      marginLeft: `${theme.spacing(4)}px`,
      marginRight: `${theme.spacing(4)}px`,
    },
    [theme.breakpoints.down("sm")]: {
      width: `calc(100% - 2*${theme.spacing(2)}px)`,
      marginLeft: `${theme.spacing(2)}px`,
      marginRight: `${theme.spacing(2)}px`,
    },
  },
});

export default styles;
