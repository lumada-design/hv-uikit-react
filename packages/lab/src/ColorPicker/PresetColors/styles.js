import { makeStyles } from "@material-ui/core";

const styles = makeStyles(() => ({
  colors: {
    display: "flex",
    flexWrap: "wrap",
    position: "relative",
    width: "calc(100% + 5px)",
    margin: "-5px -3px",
    padding: 0,
  },
  swatchWrap: {
    width: "16px",
    height: "16px",
    margin: 5,
  },
  swatch: {
    borderRadius: "3px",
    boxShadow: "inset 0 0 0 1px rgba(0,0,0,.15)",
  },
}));

export default styles;
