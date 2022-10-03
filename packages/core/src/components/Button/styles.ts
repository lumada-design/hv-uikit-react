import styled from "@emotion/styled";
import { themeVars, themeVariant, themeUtils } from "theme";
import { ButtonVariants } from "./Button";

export const StyledButton = styled.button<{ variant: ButtonVariants }>(
  {
    textTransform: "none",
    "&:hover,&:focus": {},
    "&:active": {},
    minWidth: "70px",
    padding: `${themeUtils.space(1)} ${themeUtils.space(2)} ${themeUtils.space(
      1
    )} ${themeUtils.space(2)}`,
    cursor: "pointer",
    minHeight: "32px",
    borderRadius: themeVars.dropdown.borderRadius,
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
      primarySubtle: {
        backgroundColor: "transparent",
        border: `1px solid ${themeVars.colors.acce2}`,
        color: themeVars.colors.acce2,
        "&:hover": {
          backgroundColor: themeVars.colors.atmo3,
        },
      },
      primaryGhost: {
        color: themeVars.colors.acce2,
        backgroundColor: "transparent",
        "&:hover": {
          backgroundColor: themeVars.colors.atmo3,
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
      secondaryGhost: {
        color: themeVars.colors.acce1,
        backgroundColor: "transparent",
        "&:hover": {
          backgroundColor: themeVars.colors.atmo3,
        },
      },
    },
  })
);
