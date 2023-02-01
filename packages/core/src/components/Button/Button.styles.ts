import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";

import { outlineStyles } from "utils";
import { transientOptions } from "utils/transientOptions";
import { HvButtonRadius, HvButtonSize, HvButtonVariant } from "./Button";

export interface StyledButtonProps {
  variant?: HvButtonVariant;
  iconOnly?: Boolean;
  size?: HvButtonSize;
  radius?: HvButtonRadius;
  overrideIconColors?: Boolean;
  focusVisibleClassName?: String;
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
    variant,
    iconOnly,
    size,
    radius,
    overrideIconColors,
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

    fontSize: theme.fontSizes.base,
    fontWeight: 600,
    ...(overrideIconColors &&
      variant === "primary" && {
        "& svg .color0": {
          fill: $disabled ? theme.colors.atmo5 : theme.colors.atmo1,
        },
      }),
    ...(overrideIconColors &&
      variant === "primarySubtle" && {
        "& svg .color0": {
          fill: $disabled ? theme.colors.atmo5 : theme.colors.acce2,
        },
      }),
    ...(overrideIconColors &&
      variant === "primaryGhost" && {
        "& svg .color0": {
          fill: $disabled ? theme.colors.atmo5 : theme.colors.acce2,
        },
      }),
    ...(overrideIconColors &&
      variant === "secondarySubtle" && {
        "& svg .color0": {
          fill: $disabled ? theme.colors.atmo5 : theme.colors.acce1,
        },
      }),
    ...(overrideIconColors &&
      variant === "secondaryGhost" && {
        "& svg .color0": {
          fill: $disabled ? theme.colors.atmo5 : theme.colors.acce1,
        },
      }),
    ...(overrideIconColors &&
      variant === "semantic" && {
        "& svg .color0": {
          fill: $disabled ? theme.colors.atmo5 : theme.colors.base2,
        },
      }),
    ...(variant === "primary" && {
      color: $disabled ? theme.colors.atmo5 : theme.colors.atmo1,
      backgroundColor: $disabled ? theme.colors.atmo3 : theme.colors.acce2,
      "&:hover": {
        backgroundColor: theme.colors.acce2h,
      },
      "&:focus-visible": {
        backgroundColor: theme.colors.acce2h,
      },
    }),
    ...(variant === "primarySubtle" && {
      backgroundColor: $disabled ? theme.colors.atmo3 : "transparent",
      border: $disabled
        ? `1px solid ${theme.colors.atmo4}`
        : `1px solid ${theme.colors.acce2}`,
      color: $disabled ? theme.colors.atmo5 : theme.colors.acce2,
      "&:hover": {
        backgroundColor: theme.colors.atmo3,
      },
      "&:focus-visible": {
        backgroundColor: theme.colors.atmo3,
      },
    }),
    ...(variant === "primaryGhost" && {
      color: $disabled ? theme.colors.atmo5 : theme.colors.acce2,
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: $disabled ? "transparent" : theme.colors.atmo3,
      },
      "&:focus-visible": {
        backgroundColor: theme.colors.atmo3,
      },
    }),
    ...(variant === "secondarySubtle" && {
      color: $disabled ? theme.colors.atmo5 : theme.colors.acce1,
      backgroundColor: $disabled ? theme.colors.atmo3 : "transparent",
      border: $disabled
        ? `1px solid ${theme.colors.atmo4}`
        : `1px solid ${theme.colors.atmo4}`,
      "&:hover": {
        backgroundColor: theme.colors.atmo3,
        border: `1px solid ${theme.colors.atmo4}`,
      },
      "&:focus-visible": {
        backgroundColor: theme.colors.atmo3,
      },
    }),
    ...(variant === "secondaryGhost" && {
      color: $disabled ? theme.colors.atmo5 : theme.colors.acce1,
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: $disabled ? "transparent" : theme.colors.atmo3,
      },
      "&:focus-visible": {
        backgroundColor: theme.colors.atmo3,
      },
    }),
    ...(variant === "semantic" && {
      color: $disabled ? theme.colors.atmo5 : theme.colors.base2,
      backgroundColor: $disabled
        ? theme.button.semanticColorDisabled
        : "transparent",
      "&:hover": {
        backgroundColor: theme.button.semanticColor,
      },
    }),
    ...(size === "xs" && {
      height: theme.sizes.xs,
      paddingLeft: theme.space.xs,
      paddingRight: theme.space.xs,
      fontSize: theme.fontSizes.xs,
    }),
    ...(size === "sm" && {
      height: theme.sizes.sm,
      paddingLeft: theme.space.sm,
      paddingRight: theme.space.sm,
      fontSize: theme.fontSizes.sm,
    }),
    ...(size === "md" && {
      height: theme.sizes.md,
      paddingLeft: theme.space.md,
      paddingRight: theme.space.md,
    }),
    ...(size === "lg" && {
      height: theme.sizes.lg,
      paddingLeft: theme.space.lg,
      paddingRight: theme.space.lg,
      fontSize: theme.fontSizes.lg,
    }),
    ...(size === "xl" && {
      height: theme.sizes.xl,
      paddingLeft: theme.space.xl,
      paddingRight: theme.space.xl,
      fontSize: theme.fontSizes.xl,
    }),
    ...(radius === "xs" && { borderRadius: theme.radii.xs }),
    ...(radius === "sm" && { borderRadius: theme.radii.sm }),
    ...(radius === "md" && { borderRadius: theme.radii.md }),
    ...(radius === "lg" && { borderRadius: theme.radii.lg }),
    ...(radius === "xl" && { borderRadius: theme.radii.xl }),
    ...(radius === "none" && { borderRadius: theme.radii.none }),
    ...(radius === "base" && { borderRadius: theme.radii.base }),
    ...(iconOnly && {
      margin: 0,
      padding: 0,
      width: theme.sizes.sm,
      height: theme.sizes.sm,
    }),
    ...(!iconOnly && {
      minWidth: "70px",
    }),
  })
);
