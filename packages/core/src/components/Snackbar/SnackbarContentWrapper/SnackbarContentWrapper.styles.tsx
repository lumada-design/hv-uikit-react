import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import SnackbarContent, {
  snackbarContentClasses,
} from "@mui/material/SnackbarContent";
import { CSSProperties } from "react";
import { transientOptions } from "utils/transientOptions";

export const StyledSnackbarContent = styled(
  SnackbarContent,
  transientOptions
)(({ $variant }: { $variant: string }) => ({
  ...($variant === "success" && {
    backgroundColor: theme.colors.sema8,
  }),
  ...($variant === "error" && {
    backgroundColor: theme.colors.sema9,
  }),
  ...($variant === "default" && {
    backgroundColor: theme.colors.sema7,
  }),
  ...($variant === "warning" && {
    backgroundColor: theme.colors.sema20,
  }),
  [`&.${snackbarContentClasses.root}`]: {
    width: "310px",
    minHeight: "52px",
    maxHeight: "92px",
    padding: theme.spacing(1),
    boxShadow: "none",
  },
  [`& .${snackbarContentClasses.message}`]: {
    padding: 0,
    width: "100%",
  },
}));

export const StyledMessageSpan = styled("div")({
  display: "flex",
  alignItems: "center",
  minHeight: "32px",
});

export const StyledMessageText = styled("div")({
  ...(theme.typography.body as CSSProperties),
  padding: `0 ${theme.spacing(1)}`,
  color: theme.colors.base2,
  fontFamily: theme.fontFamily.body,
  maxHeight: "72px",
  wordBreak: "break-word",
});

export const StyledAction = styled("div")({
  textAlign: "right",
});
