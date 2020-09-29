import { outlineStyles } from "../Focus/styles";

const styles = (theme) => ({
  root: {
    padding: 0,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.hv.palette.atmosphere.atmo3,
    },
    "&:focus-within": {
      "& svg": {
        ...outlineStyles,
      },
    },
  },
  disabled: {
    // ensure more specificity than .MuiButtonBase-root.Mui-disabled and .MuiIconButton-root.Mui-disabled
    "$root&": {
      cursor: "not-allowed",
      pointerEvents: "initial",
    },
    "& svg": {
      "& path:nth-child(2)": {
        fill: theme.hv.palette.atmosphere.atmo5,
      },
    },
  },
});

export default styles;
