import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  switchProperties: {
    cursor: "pointer",
    display: "inline-flex",
  },
  switchYes: {
    marginLeft: "10px",
  },
  switchNo: {
    marginRight: "10px",
  },
}));

export default useStyles;
