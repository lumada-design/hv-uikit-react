import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.hv.palette.atmosphere.atmo1,
    width: "fit-content",
    minWidth: 220,
    boxShadow: theme.hv.shadows[1],
    zIndex: 1000,
  },
  container: {
    padding: theme.hvSpacing("15px", "sm"),
    display: "flex",
    flexDirection: "column",
  },
  containerBorder: {
    borderBottom: `3px solid ${theme.hv.palette.atmosphere.atmo2}`,
  },
  valuesContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  title: {
    marginBottom: 10,
  },
  separator: {
    width: theme.hv.spacing.md,
  },
  thresholdContainer: {
    display: "flex",
    alignItems: "center",
    "& > div": {
      width: 24,
      height: 24,
      "& > svg": {
        marginLeft: 0,
      },
    },
  },
}));

export default useStyles;
