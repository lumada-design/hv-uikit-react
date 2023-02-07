import styled from "@emotion/styled";
import Snackbar, { snackbarClasses } from "@mui/material/Snackbar";
import { theme } from "@hitachivantara/uikit-styles";

export const StyledSnackbar = styled(Snackbar)({
  [`&.${snackbarClasses.anchorOriginTopRight}`]: {
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
  [`&.${snackbarClasses.anchorOriginTopLeft}`]: {
    top: theme.spacing(1),
    left: theme.spacing(1),
  },
  [`&.${snackbarClasses.anchorOriginTopCenter}`]: {
    top: theme.spacing(1),
  },
  [`&.${snackbarClasses.anchorOriginBottomCenter}`]: {
    bottom: theme.spacing(1),
  },
  [`&.${snackbarClasses.anchorOriginBottomLeft}`]: {
    bottom: theme.spacing(1),
    left: theme.spacing(1),
  },
  [`&.${snackbarClasses.anchorOriginBottomRight}`]: {
    bottom: theme.spacing(1),
    right: theme.spacing(1),
  },
});
