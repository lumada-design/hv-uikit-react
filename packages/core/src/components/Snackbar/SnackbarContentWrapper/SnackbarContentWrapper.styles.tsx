import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import SnackbarContent, {
  snackbarContentClasses,
} from "@mui/material/SnackbarContent";
import { CSSProperties } from "react";
import { transientOptions } from "@core/utils/transientOptions";

export const StyledSnackbarContent = styled(
  SnackbarContent,
  transientOptions
)(({ $variant }: { $variant: string }) => ({
  ...($variant === "success" && {
    backgroundColor: theme.colors.positive_20,
  }),
  ...($variant === "error" && {
    backgroundColor: theme.colors.negative_20,
  }),
  ...($variant === "default" && {
    backgroundColor: theme.colors.neutral_20,
  }),
  ...($variant === "warning" && {
    backgroundColor: theme.colors.warning_20,
  }),
  [`&.${snackbarContentClasses.root}`]: {
    width: "310px",
    minHeight: "52px",
    maxHeight: "92px",
    padding: theme.space.xs,
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
  padding: `0 ${theme.space.xs}`,
  color: theme.colors.base_dark,
  fontFamily: theme.fontFamily.body,
  maxHeight: "72px",
  wordBreak: "break-word",
});

export const StyledAction = styled("div")({
  textAlign: "right",
});
