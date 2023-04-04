import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import {
  HvBaseRadio,
  HvFormElement,
  HvFormElementProps,
  HvLabel,
} from "~/components";
import { CSSProperties } from "react";
import { outlineStyles } from "~/utils";
import { transientOptions } from "~/utils/transientOptions";

export const StyledHvBaseRadio = styled(
  HvBaseRadio,
  transientOptions
)(({ $invalid }: { $invalid: boolean }) => ({
  height: "32px",

  ...($invalid && {
    borderBottom: `1px solid ${theme.colors.negative}`,

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

export const StyledHvFormElement = styled((props: HvFormElementProps) => (
  <HvFormElement {...props} />
))({
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
      borderBottom: `1px solid ${theme.colors.negative}`,
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
  paddingRight: theme.space.xs,
  whiteSpace: "nowrap",
  ...(theme.typography.body as CSSProperties),
  cursor: "pointer",
  height: "32px",
  lineHeight: "32px",
  width: "100%",

  ...($disabled && {
    color: theme.colors.secondary_60,
    cursor: "not-allowed",
  }),
}));
