import styled from "@emotion/styled";
import Snackbar, { snackbarClasses } from "@mui/material/Snackbar";
import { theme } from "@hitachivantara/uikit-styles";

export const StyledSnackbar = styled(Snackbar)({
  [`&.${snackbarClasses.anchorOriginTopRight}`]: {
    top: theme.space.xs,
    right: theme.space.xs,
  },
  [`&.${snackbarClasses.anchorOriginTopLeft}`]: {
    top: theme.space.xs,
    left: theme.space.xs,
  },
  [`&.${snackbarClasses.anchorOriginTopCenter}`]: {
    top: theme.space.xs,
  },
  [`&.${snackbarClasses.anchorOriginBottomCenter}`]: {
    bottom: theme.space.xs,
  },
  [`&.${snackbarClasses.anchorOriginBottomLeft}`]: {
    bottom: theme.space.xs,
    left: theme.space.xs,
  },
  [`&.${snackbarClasses.anchorOriginBottomRight}`]: {
    bottom: theme.space.xs,
    right: theme.space.xs,
  },
});
