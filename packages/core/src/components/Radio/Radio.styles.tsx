import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { HvBaseRadio, HvFormElement, HvLabel } from "components";
import { CSSProperties } from "react";
import { outlineStyles } from "utils";
import { transientOptions } from "utils/transientOptions";

export const StyledHvBaseRadio = styled(
  HvBaseRadio,
  transientOptions
)(({ $invalid }: { $invalid: boolean }) => ({
  height: "32px",

  ...($invalid && {
    borderBottom: `1px solid ${theme.colors.sema4}`,

    "&:hover": {
      borderBottomLeftRadius: "0px",
      borderBottomRightRadius: "0px",
    },
  }),

  "& svg": {
    outline: "none",
    boxShadow: "none",
  },
}));

export const StyledHvFormElement = styled(HvFormElement)({
  display: "inline-block",
});

export const StyledDivContainer = styled(
  "div",
  transientOptions
)(
  ({
    $invalid,
    $focusVisible,
    $disabled,
  }: {
    $disabled: boolean;
    $invalid: boolean;
    $focusVisible: boolean;
  }) => ({
    cursor: "pointer",
    display: "flex",
    height: "32px",
    transitionProperty: "background-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    transitionDelay: "0ms",

    "&:hover": {
      backgroundColor: theme.radio.hoverColor,
      borderRadius: theme.radio.borderRadius,

      ...($invalid && {
        borderBottomLeftRadius: "0px",
        borderBottomRightRadius: "0px",
      }),
    },

    ...($disabled && {
      cursor: "not-allowed",
    }),

    ...($invalid && {
      borderBottom: `1px solid ${theme.colors.sema4}`,
    }),

    ...($focusVisible && {
      backgroundColor: theme.colors.atmo3,
      ...outlineStyles,
    }),
  })
);

export const StyledHvLabel = styled(
  HvLabel,
  transientOptions
)(({ $disabled }: { $disabled: boolean }) => ({
  overflow: "hidden",
  textOverflow: "ellipsis",
  verticalAlign: "middle",
  paddingRight: theme.spacing(1.25),
  whiteSpace: "nowrap",
  ...(theme.typography.body as CSSProperties),
  cursor: "pointer",
  height: "32px",
  lineHeight: "32px",
  width: "100%",

  ...($disabled && {
    color: theme.colors.atmo5,
    cursor: "not-allowed",
  }),
}));
