import { makeStyles } from "@mui/styles";

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
  dropdown: {
    marginTop: 38,
    width: "100%",
  },
  checkbox: {
    marginTop: 60,
  },
  submit: {
    width: 120,
    float: "right",
    marginTop: theme.hv.spacing.lg,
  },
  sentenceCase: {
    textTransform: `full-size-kana`,
  },
  customBackgroundPosition: {
    backgroundSize: "cover",
  },
  dropdownWidthFix: {
    width: "100%",
  },
}));

export default useStyles;
