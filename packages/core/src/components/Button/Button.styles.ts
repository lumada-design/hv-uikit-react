import styled from "@emotion/styled";
import { theme, themeVariant } from "@hitachivantara/uikit-styles";
import { ButtonVariant } from "./Button";

export const StyledButton = styled.button<{ variant: ButtonVariant }>(
  {
    textTransform: "none",
    "&:hover,&:focus": {},
    "&:active": {},
    minWidth: "70px",
    padding: `${theme.spacing(1)} ${theme.spacing(2)} ${theme.spacing(
      1
    )} ${theme.spacing(2)}`,
    cursor: "pointer",
    minHeight: "32px",
    borderRadius: theme.dropdown.borderRadius,
    fontSize: theme.fontSizes.base,
    fontWeight: 600,
  },
  themeVariant({
    variants: {
      primary: {
        color: theme.colors.atmo1,
        backgroundColor: theme.colors.acce2,
        "&:hover": {
          backgroundColor: theme.colors.acce2h,
        },
      },
      primarySubtle: {
        backgroundColor: "transparent",
        border: `1px solid ${theme.colors.acce2}`,
        color: theme.colors.acce2,
        "&:hover": {
          backgroundColor: theme.colors.atmo3,
        },
      },
      primaryGhost: {
        color: theme.colors.acce2,
        backgroundColor: "transparent",
        "&:hover": {
          backgroundColor: theme.colors.atmo3,
        },
      },
      secondarySubtle: {
        color: theme.colors.acce1,
        backgroundColor: "transparent",
        border: `1px solid ${theme.colors.atmo4}`,
        "&:hover": {
          backgroundColor: theme.colors.atmo3,
          border: `1px solid ${theme.colors.atmo4}`,
        },
      },
      secondaryGhost: {
        color: theme.colors.acce1,
        backgroundColor: "transparent",
        "&:hover": {
          backgroundColor: theme.colors.atmo3,
        },
      },
    },
  })
);
