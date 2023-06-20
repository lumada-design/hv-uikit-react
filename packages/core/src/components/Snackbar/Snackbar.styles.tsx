import { theme } from "@hitachivantara/uikit-styles";
import { createClasses } from "@core/utils";

export const { useClasses, staticClasses } = createClasses("HvSnackbar", {
  root: {},
  anchorOriginTopRight: {
    top: theme.space.xs,
    right: theme.space.xs,
  },
  anchorOriginTopLeft: {
    top: theme.space.xs,
    left: theme.space.xs,
  },
  anchorOriginTopCenter: {
    top: theme.space.xs,
  },
  anchorOriginBottomCenter: {
    bottom: theme.space.xs,
  },
  anchorOriginBottomLeft: {
    bottom: theme.space.xs,
    left: theme.space.xs,
  },
  anchorOriginBottomRight: {
    bottom: theme.space.xs,
    right: theme.space.xs,
  },
});
