import { fade, hexToRgb } from "@material-ui/core";

export const boxShadow = color => ({
  boxShadow: `0 0 0 ${color}, 0 6px 12px ${fade(hexToRgb(color), 0.12)}`
});

const styles = theme => ({
  root: {
    display: "flex",
    width: "100%"
  },
  header: {
    zIndex: theme.zIndex.appBar,
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: 50,
    padding: `0 ${theme.hv.spacing.sm}px`,
    borderTop: `4px solid ${theme.hv.palette.accent.acce3}`,
    backgroundColor: theme.hv.palette.atmosphere.atmo1,
    ...boxShadow(theme.hv.palette.accent.acce1),
    "& > *:not(nav)": {
      zIndex: 2
    }
  }
});

export default styles;
