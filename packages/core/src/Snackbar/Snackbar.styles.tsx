import { theme } from "@hitachivantara/uikit-styles";

import { snackbarClasses } from "@mui/material/Snackbar";

import { createClasses } from "../utils/classes";

export const { useClasses, staticClasses } = createClasses("HvSnackbar", {
  root: {},
  anchorOriginTopRight: {
    [`&.${snackbarClasses.anchorOriginTopRight}`]: {
      top: theme.space.xs,
      right: theme.space.xs,
    },
  },
  anchorOriginTopLeft: {
    [`&.${snackbarClasses.anchorOriginTopLeft}`]: {
      top: theme.space.xs,
      left: theme.space.xs,
    },
  },
  anchorOriginTopCenter: {
    [`&.${snackbarClasses.anchorOriginTopCenter}`]: {
      top: theme.space.xs,
    },
  },
  anchorOriginBottomCenter: {
    [`&.${snackbarClasses.anchorOriginBottomCenter}`]: {
      bottom: theme.space.xs,
    },
  },
  anchorOriginBottomLeft: {
    [`&.${snackbarClasses.anchorOriginBottomLeft}`]: {
      bottom: theme.space.xs,
      left: theme.space.xs,
    },
  },
  anchorOriginBottomRight: {
    [`&.${snackbarClasses.anchorOriginBottomRight}`]: {
      bottom: theme.space.xs,
      right: theme.space.xs,
    },
  },
});
