import { makeStyles } from "@material-ui/core";

const styles = makeStyles({
  root: {
    display: "inline-flex",
    width: "100%",
    justifyContent: "space-between",
  },
  leftControl: {
    display: "inline-flex",
    alignItems: "flex-end",
  },
  rightControl: {
    display: "inline-flex",
    alignItems: "flex-end",
    gap: 10,
  },
  sortInput: {
    minWidth: 200,
  },
});

export default styles;
