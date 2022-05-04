import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
      flexGrow: 1,
    },
    label: {
      paddingBottom: "6px",
    },
    inputContainer: {
      display: "flex",
      alignItems: "baseline",
      flexGrow: 1,
    },
    rangeContainer: {
      display: "flex",
      flexGrow: 1,

      "& > $inputContainer:not(:last-child)": {
        marginRight: theme.hv.spacing.md,

        [theme.breakpoints.down("md")]: {
          marginRight: theme.hv.spacing.md / 2,
        },
      },
    },
    input: {
      flexGrow: 1,
    },
  };
});

export default useStyles;
