import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
  },
  linearProgressContainer: {
    width: "100%",
    margin: "auto",
  },
  linearProgress: {
    height: 8,
  },
  linearProgressColorPrimary: {
    backgroundColor: theme.hv.palette.atmosphere.atmo4,
  },
  linearProgressBarColorPrimary: {
    backgroundColor: theme.hv.palette.semantic.sema1,
  },
  linearProgressBarColorSecondary: {
    backgroundColor: theme.hv.palette.accent.acce1,
  },
}));

export default useStyles;
