import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { HvBaseRadio, HvFormElement, HvLabel } from "components";
import { outlineStyles } from "utils";
import { transientOptions } from "utils/transientOptions";

export const StyledHvBaseRadio = styled(
  HvBaseRadio,
  transientOptions
)(({ $invalidRadio }: { $invalidRadio: boolean }) => ({
  height: theme.radio.height,

  ...($invalidRadio && {
    borderBottom: theme.radio.invalidRadioBottomBorder,
  }),

  "& svg": {
    outline: "none",
    boxShadow: "none",
  },
}));

export const StyledHvFormElement = styled(HvFormElement)({
  display: theme.radio.display,
});

export const StyledDivContainer = styled(
  "div",
  transientOptions
)(
  ({
    $invalidContainer,
    $focusVisible,
  }: {
    $invalidContainer: boolean;
    $focusVisible: boolean;
  }) => ({
    cursor: "pointer",
    display: theme.radio.containerDisplay,

    height: theme.radio.containerHeight,

    transitionProperty: theme.radio.containerTransitionProperty,
    transitionDuration: theme.radio.containerTransitionDuration,
    transitionTimingFunction: theme.radio.containerTransitionTimingFunction,
    transitionDelay: theme.radio.containerTransitionDelay,

    "&:hover": {
      backgroundColor: theme.radio.containerHoverBackgroundColor,
    },
    ...($invalidContainer && {
      borderBottom: theme.radio.invalidRadioBottomBorder,
    }),

    ...($focusVisible && {
      backgroundColor: theme.radio.containerFocusBackgroundColor,
      ...outlineStyles,
    }),
  })
);

export const StyledHvLabel = styled(
  HvLabel,
  transientOptions
)(({ $disabled }: { $disabled: boolean }) => ({
  overflow: theme.radio.labelOverflow,
  textOverflow: theme.radio.labelTextOverflow,
  verticalAlign: theme.radio.labelVerticalAlign,
  paddingRight: theme.radio.labelPaddingRight,
  fontWeight: theme.radio.labelFontWeight,
  cursor: "pointer",
  height: theme.radio.labelHeight,
  lineHeight: theme.radio.labelLineHeight,
  width: theme.radio.labelWidth,
  ...($disabled && {
    color: theme.radio.labelDisabledColor,
    cursor: "not-allowed",
  }),
}));
