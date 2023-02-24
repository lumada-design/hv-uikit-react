import styled from "@emotion/styled";
import { outlineStyles } from "utils";
import { transientOptions } from "utils/transientOptions";

export const StyledRoot = styled(
  "div",
  transientOptions
)(({ $hideIcon }: { $hideIcon: boolean }) => ({
  // adornment
  backgroundColor: "transparent",
  border: "none",
  padding: 0,
  margin: 0,
  // adornmentIcon
  cursor: "default",
  pointerEvents: "none",
  ...($hideIcon && {
    display: "none",
  }),
}));

export const StyledIcon = styled("div")({
  width: 32,
  height: 32,
});

export const StyledButton = styled(
  "button",
  transientOptions
)(({ $hideIcon }: { $hideIcon: boolean }) => ({
  // adornment
  backgroundColor: "transparent",
  border: "none",
  padding: 0,
  margin: 0,
  // adornmentButton
  cursor: "pointer",
  "&:focus": {
    ...outlineStyles,
  },
  ...($hideIcon && {
    display: "none",
  }),
}));
