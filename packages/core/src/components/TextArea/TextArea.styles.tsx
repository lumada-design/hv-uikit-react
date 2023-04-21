import styled from "@emotion/styled";
import {
  HvBaseInput,
  HvBaseInputProps,
  HvCharCounter,
  HvCharCounterProps,
  HvFormElement,
  HvFormElementProps,
  HvInfoMessage,
  HvInfoMessageProps,
  HvLabel,
  HvLabelProps,
  HvWarningText,
  HvWarningTextProps,
} from "@core/components";
import { transientOptions } from "@core/utils/transientOptions";

export const StyledFormElement = styled(
  (props: HvFormElementProps) => <HvFormElement {...props} />,
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

export const StyledLabel = styled((props: HvLabelProps) => (
  <HvLabel {...props} />
))({
  display: "block",
  float: "left",
  paddingBottom: "6px",
});

export const StyledInfoMessage = styled((props: HvInfoMessageProps) => (
  <HvInfoMessage {...props} />
))({
  display: "block",
  float: "left",
});

export const StyledCharCounter = styled((props: HvCharCounterProps) => (
  <HvCharCounter {...props} />
))({
  display: "block",
  float: "right",
  textAlign: "right",
  marginBottom: "6px",
});

export const StyledWarningText = styled((props: HvWarningTextProps) => (
  <HvWarningText {...props} />
))({ float: "left" });

export const StyledBaseInput = styled(
  (props: HvBaseInputProps) => <HvBaseInput {...props} />,
  transientOptions
)(({ $resizable }: { $resizable: boolean }) => ({
  clear: "both",
  float: "left",

  ...($resizable && {
    width: "100%",
    resize: "both",
  }),
}));
