import styled from "@emotion/styled";
import Snackbar, { snackbarClasses } from "@mui/material/Snackbar";
import { theme } from "@hitachivantara/uikit-styles";
import { transientOptions } from "utils/transientOptions";

export const StyledSnackbar = styled(
  Snackbar,
  transientOptions
)(({ $isOpen }: { $isOpen: boolean }) => ({
  [`&.${snackbarClasses.root}`]: {
    ...($isOpen && {
      minWidth: `calc(100% - ${theme.spacing(2)})`,
    }),
    ...(!$isOpen && {
      display: "none",
    }),
  },
  [`&.${snackbarClasses.anchorOriginTopCenter}`]: {
    top: theme.spacing(1),
  },
  [`&.${snackbarClasses.anchorOriginBottomCenter}`]: {
    bottom: theme.spacing(1),
  },
}));
