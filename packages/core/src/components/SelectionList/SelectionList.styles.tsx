import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import {
  HvListContainer,
  HvFormElement,
  HvLabel,
  HvInfoMessage,
  HvWarningText,
  HvLabelProps,
  HvWarningTextProps,
  HvInfoMessageProps,
  HvFormElementProps,
} from "@core/components";
import { transientOptions } from "@core/utils/transientOptions";

export const StyledFormElement = styled((props: HvFormElementProps) => (
  <HvFormElement {...props} />
))({
  display: "inline-block",
  padding: 0,
  margin: 0,
});

export const StyledLabel = styled((props: HvLabelProps) => (
  <HvLabel {...props} />
))({
  marginBottom: theme.space.xs,
  float: "left",
});

export const StyledInfoMessage = styled((props: HvInfoMessageProps) => (
  <HvInfoMessage {...props} />
))({
  float: "left",
});

export const StyledError = styled((props: HvWarningTextProps) => (
  <HvWarningText {...props} />
))({
  width: "100%",
  float: "left",
  clear: "both",
});

export const StyledListContainer = styled(
  HvListContainer,
  transientOptions
)(
  ({
    $orientation,
    $validationState,
  }: {
    $orientation: string;
    $validationState: string;
  }) => ({
    display: "flex",
    float: "left",
    clear: "both",
    width: "100%",
    paddingBottom: theme.space.xs,
    ...($orientation === "vertical" && {
      flexDirection: "column",

      // Prevent the focus ring to be hidden by sibling hover background
      "&>*": {
        zIndex: 0,
      },
      "&>*:focus-within": {
        zIndex: 1,
      },
      // IE fallback code (using focus-within-polyfill)
      "&>*.focus-within": {
        zIndex: 1,
      },
    }),
    ...($orientation === "horizontal" && {
      flexDirection: "row",
      flexWrap: "wrap",
      marginLeft: -theme.space.sm,
      "&>*": {
        marginLeft: theme.space.sm,
      },
    }),
    ...($validationState === "invalid" && {
      borderBottom: `1px solid ${theme.colors.negative}`,
    }),
  })
);
