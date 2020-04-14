import { fade, hexToRgb } from "@material-ui/core";

export const boxShadow = color => ({
  boxShadow: `0 0 0 ${color}, 0 6px 12px ${fade(hexToRgb(color), 0.12)}`
});

const styles = theme => ({
  root: {
    height: 50
  },
  backgroundColor: {
    backgroundColor: theme.hv.palette.atmosphere.atmo1
  },
  header: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "100%",
    padding: `0 ${theme.hv.spacing.sm}px`,
    ...boxShadow(theme.hv.palette.accent.acce1),
    "& > *:not(nav)": {
      zIndex: 2
    }
  }
});

export default styles;
