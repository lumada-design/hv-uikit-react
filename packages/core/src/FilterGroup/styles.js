import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
  dropdownPanel: {
    backgroundColor: theme.hv.palette.atmosphere.atmo1,
  },
  actionBar: {
    width: "100%",
  },
  labelContainer: {
    display: "flex",
    alignItems: "flex-start",
  },
  label: {
    paddingBottom: "6px",
    display: "block",
  },
}));

export default styles;
