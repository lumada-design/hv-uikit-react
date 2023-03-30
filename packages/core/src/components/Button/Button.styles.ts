import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { outlineStyles } from "utils";
import { transientOptions } from "utils/transientOptions";
import { HvButtonRadius, HvButtonSize, HvButtonVariant } from "./Button";

export interface StyledButtonProps {
  $radius?: HvButtonRadius;
  $size?: HvButtonSize;
  $variant?: HvButtonVariant;
  $iconOnly?: Boolean;
  $overrideIconColors?: Boolean;
  $disabled?: Boolean;
}

export const StyledContentDiv = styled.div<{}>({
  display: "flex",
  alignItems: "center",
  height: "100%",
  overflow: "visible",
});

export const StyledIconSpan = styled.span<{}>({
  marginRight: theme.button.marginIconRight,
  marginLeft: theme.button.marginIconLeft,
});

export const StyledChildren = styled.span<{}>({
  whiteSpace: "nowrap",
  display: "flex",
});

export const StyledButton = styled(
  "button",
  transientOptions
)(
  ({
    $variant,
    $iconOnly,
    $size,
    $radius,
    $overrideIconColors,
    $disabled,
  }: StyledButtonProps) => ({
    display: "inline-flex",
    justifyContent: "center",
    textTransform: "none",
    cursor: $disabled ? "not-allowed" : "pointer",
    ...($disabled && {
      pointerEvents: "auto",
    }),
    "&:hover": {},
    "&:focus": {},
    "&.HvIsFocusVisible": {
      ...outlineStyles,
    },
    "&:active": {},

    // default button - no size specified
    fontFamily: theme.fontFamily.body,
    fontSize: theme.fontSizes.base,
    fontWeight: 600,
    lineHeight: "11px",
    letterSpacing: 0,
    height: "32px",
    borderRadius: theme.button.borderRadius,
    padding: theme.button.padding,

    ...($overrideIconColors &&
      $variant === "primary" && {
        "& svg .color0": {
          fill: $disabled ? theme.colors.secondary_60 : theme.colors.atmo1,
        },
      }),
    ...($overrideIconColors &&
      $variant === "primarySubtle" && {
        "& svg .color0": {
          fill: $disabled ? theme.colors.secondary_60 : theme.colors.primary,
        },
      }),
    ...($overrideIconColors &&
      $variant === "primaryGhost" && {
        "& svg .color0": {
          fill: $disabled ? theme.colors.secondary_60 : theme.colors.primary,
        },
      }),
    ...($overrideIconColors &&
      $variant === "secondarySubtle" && {
        "& svg .color0": {
          fill: $disabled ? theme.colors.secondary_60 : theme.colors.secondary,
        },
      }),
    ...($overrideIconColors &&
      $variant === "secondaryGhost" && {
        "& svg .color0": {
          fill: $disabled ? theme.colors.secondary_60 : theme.colors.secondary,
        },
      }),
    ...($overrideIconColors &&
      $variant === "semantic" && {
        "& svg .color0": {
          fill: $disabled ? theme.colors.secondary_60 : theme.colors.base_dark,
        },
      }),
    ...($variant === "primary" && {
      color: $disabled ? theme.colors.secondary_60 : theme.colors.atmo1,
      backgroundColor: $disabled ? theme.colors.atmo3 : theme.colors.primary,
      "&:hover": {
        backgroundColor: $disabled
          ? theme.colors.atmo3
          : theme.colors.primary_80,
      },
      "&:focus-visible": {
        backgroundColor: theme.colors.primary_80,
      },
    }),
    ...($variant === "primarySubtle" && {
      backgroundColor: $disabled ? theme.colors.atmo3 : "transparent",
      border: $disabled
        ? `1px solid ${theme.colors.atmo4}`
        : `1px solid ${theme.colors.primary}`,
      color: $disabled ? theme.colors.secondary_60 : theme.colors.primary,
      "&:hover": {
        backgroundColor: $disabled
          ? theme.colors.atmo3
          : theme.button.hoverColor,
      },
      "&:focus-visible": {
        backgroundColor: $disabled
          ? theme.colors.atmo3
          : theme.button.hoverColor,
      },
    }),
    ...($variant === "primaryGhost" && {
      color: $disabled ? theme.colors.secondary_60 : theme.colors.primary,
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: $disabled ? "transparent" : theme.button.hoverColor,
      },
      "&:focus-visible": {
        backgroundColor: $disabled ? "transparent" : theme.button.hoverColor,
      },
    }),
    ...($variant === "secondarySubtle" && {
      color: $disabled ? theme.colors.secondary_60 : theme.colors.secondary,
      backgroundColor: $disabled
        ? theme.colors.atmo3
        : theme.button.secondaryBackgroundColor,
      border: $disabled
        ? `1px solid ${theme.colors.atmo4}`
        : `1px solid ${theme.colors.atmo4}`,
      "&:hover": {
        backgroundColor: $disabled
          ? theme.colors.atmo3
          : theme.button.hoverColor,
        border: `1px solid ${theme.colors.atmo4}`,
      },
      "&:focus-visible": {
        backgroundColor: $disabled
          ? theme.colors.atmo3
          : theme.button.hoverColor,
      },
    }),
    ...($variant === "secondaryGhost" && {
      color: $disabled ? theme.colors.secondary_60 : theme.colors.secondary,
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: $disabled ? "transparent" : theme.button.hoverColor,
      },
      "&:focus-visible": {
        backgroundColor: $disabled ? "transparent" : theme.button.hoverColor,
      },
    }),
    ...($variant === "semantic" && {
      color: $disabled ? theme.colors.secondary_60 : theme.colors.base_dark,
      backgroundColor: $disabled
        ? theme.button.semanticColorDisabled
        : "transparent",
      "&:hover": {
        backgroundColor: theme.button.semanticColor,
      },
    }),
    ...($size === "xs" && {
      height: theme.sizes.xs,
      paddingLeft: theme.space.xs,
      paddingRight: theme.space.xs,
      fontSize: theme.fontSizes.xs,
    }),
    ...($size === "sm" && {
      height: theme.sizes.sm,
      paddingLeft: theme.space.sm,
      paddingRight: theme.space.sm,
      fontSize: theme.fontSizes.sm,
    }),
    ...($size === "md" && {
      height: theme.sizes.md,
      paddingLeft: theme.space.md,
      paddingRight: theme.space.md,
    }),
    ...($size === "lg" && {
      height: theme.sizes.lg,
      paddingLeft: theme.space.lg,
      paddingRight: theme.space.lg,
      fontSize: theme.fontSizes.lg,
    }),
    ...($size === "xl" && {
      height: theme.sizes.xl,
      paddingLeft: theme.space.xl,
      paddingRight: theme.space.xl,
      fontSize: theme.fontSizes.xl,
    }),
    ...($radius === "none" && { borderRadius: theme.radii.none }),
    ...($radius === "base" && { borderRadius: theme.radii.base }),
    ...($radius === "round" && { borderRadius: theme.radii.round }),
    ...($radius === "circle" && { borderRadius: theme.radii.circle }),
    ...($radius === "full" && { borderRadius: theme.radii.full }),
    ...($iconOnly && {
      margin: 0,
      padding: 0,
    }),
    ...(!$iconOnly && {
      minWidth: "70px",
    }),
  })
);
