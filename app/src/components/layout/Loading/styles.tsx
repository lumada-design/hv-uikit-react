import { makeStyles } from "@mui/styles";
import { alpha, hexToRgb } from "@mui/material";
import { theme } from "@hitachivantara/uikit-styles";

const styles = makeStyles(() => ({
  error: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  loading: {
    display: "flex",
    width: "100%",
    transition: "background-Color .2s ease",
    backgroundColor: alpha(hexToRgb(theme.colors.atmo1), 0.8),
    zIndex: theme.zIndices.overlay,
  },
}));

export default styles;
