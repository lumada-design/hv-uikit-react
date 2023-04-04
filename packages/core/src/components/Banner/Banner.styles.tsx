import styled from "@emotion/styled";
import Snackbar, { snackbarClasses } from "@mui/material/Snackbar";
import { theme } from "@hitachivantara/uikit-styles";
import { transientOptions } from "~/utils/transientOptions";

export const StyledSnackbar = styled(
  Snackbar,
  transientOptions
)(({ $isOpen }: { $isOpen: boolean }) => ({
  [`&.${snackbarClasses.root}`]: {
    ...($isOpen && {
      minWidth: `calc(100% - ${theme.space.sm})`,
    }),
    ...(!$isOpen && {
      display: "none",
    }),
  },
  [`&.${snackbarClasses.anchorOriginTopCenter}`]: {
    top: theme.space.xs,
  },
  [`&.${snackbarClasses.anchorOriginBottomCenter}`]: {
    bottom: theme.space.xs,
  },
}));
