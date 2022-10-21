import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.hv.palette.atmosphere.atmo1,
    width: "fit-content",
    minWidth: 150,
    boxShadow: theme.hv.shadows[1],
    zIndex: 1000,
  },
  container: {
    padding: theme.hvSpacing("15px", "sm"),
    display: "flex",
    flexDirection: "column",
  },
}));

export default useStyles;
