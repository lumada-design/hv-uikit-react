import styled from "@emotion/styled";
import {
  HvBaseInput,
  HvCharCounter,
  HvFormElement,
  HvInfoMessage,
  HvLabel,
  HvWarningText,
} from "components";
import { transientOptions } from "utils/transientOptions";

export const StyledFormElement = styled(
  HvFormElement,
  transientOptions
)(({ $resizable }: { $resizable: boolean }) => ({
  display: "inline-block",
  width: "100%",

  ...($resizable && { width: "100%" }),
}));

export const StyledLabelContainer = styled("div")({
  float: "left",
  display: "flex",
  alignItems: "flex-start",
});

export const StyledLabel = styled((props) => <HvLabel {...props} />)({
  display: "block",
  float: "left",
  paddingBottom: "6px",
});

export const StyledInfoMessage = styled((props) => (
  <HvInfoMessage {...props} />
))({
  display: "block",
  float: "left",
});

export const StyledCharCounter = styled((props) => (
  <HvCharCounter {...props} />
))({
  display: "block",
  float: "right",
  textAlign: "right",
  marginBottom: "6px",
});

export const StyledWarningText = styled((props) => (
  <HvWarningText {...props} />
))({ float: "left" });

export const StyledBaseInput = styled(
  HvBaseInput,
  transientOptions
)(({ $resizable }: { $resizable: boolean }) => ({
  clear: "both",
  float: "left",

  ...($resizable && {
    width: "100%",
    resize: "both",
  }),
}));
