import { themeVars, themeVariant, themeUtils } from "theme";

const styles = [
  {
    textTransform: "none",
    "&:hover,&:focus": {},
    "&:active": {},
    minWidth: "70px",
    padding: `${themeUtils.spacing(1)} ${themeUtils.spacing(
      2
    )} ${themeUtils.spacing(1)} ${themeUtils.spacing(2)}`,
    cursor: "pointer",
    minHeight: "32px",
    borderRadius: themeVars.border.radius,
    fontSize: themeVars.fontSizes.base,
    fontWeight: 600,
  },
  themeVariant({
    variants: {
      primary: {
        color: themeVars.colors.atmo1,
        backgroundColor: themeVars.colors.acce2,
        "&:hover": {
          backgroundColor: themeVars.colors.acce2h,
        },
      },
      secondarySubtle: {
        color: themeVars.colors.acce1,
        backgroundColor: "transparent",
        border: `1px solid ${themeVars.colors.atmo4}`,
        "&:hover": {
          backgroundColor: themeVars.colors.atmo3,
          border: `1px solid ${themeVars.colors.atmo4}`,
        },
      },
      primaryGhost: {
        color: themeVars.colors.acce2,
        backgroundColor: "transparent",
        "&:hover": {
          backgroundColor: themeVars.colors.atmo3,
        },
      },
      primarySubtle: {
        backgroundColor: "transparent",
        border: `1px solid ${themeVars.colors.acce2}`,
        color: themeVars.colors.acce2,
        "&:hover": {
          backgroundColor: themeVars.colors.atmo3,
        },
      },
      secondaryGhost: {
        color: themeVars.colors.acce1,
        backgroundColor: "transparent",
        "&:hover": {
          backgroundColor: themeVars.colors.atmo3,
        },
      },
    },
  }),
];

export default styles;
