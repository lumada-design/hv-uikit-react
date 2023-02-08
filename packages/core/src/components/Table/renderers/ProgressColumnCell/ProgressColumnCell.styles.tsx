import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import {
  LinearProgress as MuiLinearProgress,
  linearProgressClasses as MuiLinearProgressClasses,
} from "@mui/material";

export const StyledRoot = styled("div")({
  display: "flex",
  width: "100%",
});

export const StyledContainer = styled("div")({
  width: "100%",
  margin: "auto",
});

export const StyledLinearProgress = styled(MuiLinearProgress)({
  height: 8,

  [`&.${MuiLinearProgressClasses.root}`]: {
    backgroundColor: theme.colors.atmo4,
  },

  [`& .${MuiLinearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.colors.atmo4,
  },

  [`& .${MuiLinearProgressClasses.barColorPrimary}`]: {
    backgroundColor: theme.colors.sema1,
  },

  [`& .${MuiLinearProgressClasses.barColorSecondary}`]: {
    backgroundColor: theme.colors.acce1,
  },
});
