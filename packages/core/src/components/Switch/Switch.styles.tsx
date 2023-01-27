import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { transientOptions } from "utils/transientOptions";
import { HvLabel, HvFormElement } from "components";

export const StyledFormElement = styled(
  HvFormElement,
  transientOptions
)({
  display: "inline-flex",
  flexDirection: "column",
  alignItems: "flex-start",
});

export const StyledLabel = styled(HvLabel)({
  marginBottom: theme.switch.labelMarginBottom,
});

export const StyledSwitchContainer = styled(
  "div",
  transientOptions
)(({ $invalid }: { $invalid: boolean }) => ({
  height: theme.switch.containerHeight,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  borderBottom: theme.switch.containerBorderBottom,

  ...($invalid && {
    borderBottom: theme.switch.containerBorderBottom,
  }),
}));
