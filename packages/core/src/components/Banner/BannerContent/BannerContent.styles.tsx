import styled from "@emotion/styled";
import SnackbarContent, {
  snackbarContentClasses,
} from "@mui/material/SnackbarContent";
import { transientOptions } from "utils/transientOptions";
import { HvBannerVariant } from "../Banner";
import { theme } from "@hitachivantara/uikit-styles";

export const StyledRoot = styled("div")({
  width: "100%",
  position: "relative",
  [`& .${snackbarContentClasses.root}`]: {
    minWidth: "100%",
    position: "relative",
    display: "flex",
    flexWrap: "nowrap",
    boxShadow: "none",
    borderRadius: theme.radii.none,
  },
  [`& .${snackbarContentClasses.message}`]: {
    display: "flex",
    alignItems: "center",
    padding: `${theme.space.xs} 0`,
    paddingLeft: theme.space.sm,
  },
  [`& .${snackbarContentClasses.action}`]: {
    padding: theme.space.xs,
    marginRight: 0,
    flex: "0 0 auto",
    placeSelf: "stretch",
  },
});

export const StyledSnackbarContent = styled(
  SnackbarContent,
  transientOptions
)(({ $variant }: { $variant: HvBannerVariant }) => ({
  padding: 0,
  ...($variant === "success" && {
    backgroundColor: theme.colors.sema8,
  }),
  ...($variant === "warning" && {
    backgroundColor: theme.colors.sema20,
  }),
  ...($variant === "error" && {
    backgroundColor: theme.colors.sema9,
  }),
  ...($variant === "default" && {
    backgroundColor: theme.colors.sema7,
  }),
}));
