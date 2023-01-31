import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import DialogTitle from "@mui/material/DialogTitle";
import { transientOptions } from "utils/transientOptions";

export const StyledTitle = styled(
  DialogTitle,
  transientOptions
)(({ $fullscreen }: { $fullscreen: boolean }) => ({
  padding: theme.spacing(2),
  margin: 0,
  ...(!$fullscreen && {
    flex: 1,
  }),
}));

export const StyledMessageContainer = styled("div")({
  display: "flex",
  alignItems: "center",
});

export const StyledTextWithIcon = styled(
  "div",
  transientOptions
)(({ $hasIcon }: { $hasIcon: boolean }) => ({
  ...($hasIcon && {
    marginLeft: theme.spacing(1),
    // 32px is the icon width
    marginRight: `calc(32px + ${theme.spacing(1)})`,
  }),
}));
