import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
      flexDirection: "column",
    },
    row: {
      minHeight: 94,
    },
    vertical: {
      display: "flex",
      flexDirection: "column",
    },
    horizontal: {
      display: "flex",

      "& > div:not(:last-child)": {
        marginRight: theme.hv.spacing.md,

        [theme.breakpoints.down("md")]: {
          marginRight: theme.hv.spacing.md / 2,
        },
      },
    },
    datePicker: {
      flex: "0 1 320px",
    },
    timePicker: {
      flex: "0 1 200px",
    },
  };
});

export default useStyles;
