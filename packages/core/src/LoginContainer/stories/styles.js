import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    margin: "auto",
    paddingTop: 150,
    "& h3": {
      textAlign: "center",
    },
  },
  input: {
    marginTop: 40,
  },
  submit: {
    width: 120,
    float: "right",
    marginTop: `${theme.hv.spacing.lg}px`,
  },
  sentenceCase: {
    textTransform: `full-size-kana`,
  },
}));

export default useStyles;
