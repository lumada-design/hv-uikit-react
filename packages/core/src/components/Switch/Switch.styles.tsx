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
  marginBottom: theme.space.xs,
});

export const StyledSwitchContainer = styled(
  "div",
  transientOptions
)(({ $invalid }: { $invalid: boolean }) => ({
  height: "32px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  borderBottom: "1px solid transparent",

  ...($invalid && {
    paddingBottom: theme.switch.invalidPaddingBottom,
    borderBottom: `1px solid ${theme.colors.sema4}`,
  }),
}));
