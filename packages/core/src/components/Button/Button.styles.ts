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
    cursor: "pointer",
    "&:hover": {},
    "&:focus": {},
    "&.HvIsFocusVisible": {
      ...outlineStyles,
    },
    "&:active": {},
    ...($disabled && {
      cursor: "not-allowed",
      pointerEvents: "auto",
    }),
    fontSize: theme.fontSizes.base,
    fontWeight: 600,
    ...(overrideIconColors &&
      variant === "primary" && {
        "& svg .color0": {
          fill: theme.colors.atmo1,
        },
        ...($disabled && {
          "& svg .color0": {
            fill: theme.colors.atmo5,
          },
        }),
      }),
    ...(overrideIconColors &&
      variant === "primarySubtle" && {
        "& svg .color0": {
          fill: theme.colors.acce2,
        },
        ...($disabled && {
          "& svg .color0": {
            fill: theme.colors.atmo5,
          },
        }),
      }),
    ...(overrideIconColors &&
      variant === "primaryGhost" && {
        "& svg .color0": {
          fill: theme.colors.acce2,
        },
        ...($disabled && {
          "& svg .color0": {
            fill: theme.colors.atmo5,
          },
        }),
      }),
    ...(overrideIconColors &&
      variant === "secondarySubtle" && {
        "& svg .color0": {
          fill: theme.colors.acce1,
        },
        ...($disabled && {
          "& svg .color0": {
            fill: theme.colors.atmo5,
          },
        }),
      }),
    ...(overrideIconColors &&
      variant === "secondaryGhost" && {
        "& svg .color0": {
          fill: theme.colors.acce1,
        },
        ...($disabled && {
          "& svg .color0": {
            fill: theme.colors.atmo5,
          },
        }),
      }),
    ...(overrideIconColors &&
      variant === "semantic" && {
        "& svg .color0": {
          fill: theme.colors.base2,
        },
        ...($disabled && {
          "& svg .color0": {
            fill: theme.colors.atmo5,
          },
        }),
      }),
    ...(variant === "primary" && {
      color: theme.colors.atmo1,
      backgroundColor: theme.colors.acce2,
      "&:hover": {
        backgroundColor: theme.colors.acce2h,
      },
      ...($disabled && {
        color: theme.colors.atmo5,
        backgroundColor: theme.colors.atmo3,
      }),
      "&:focus-visible": {
        backgroundColor: theme.colors.acce2h,
      },
    }),
    ...(variant === "primarySubtle" && {
      backgroundColor: "transparent",
      border: `1px solid ${theme.colors.acce2}`,
      color: theme.colors.acce2,
      "&:hover": {
        backgroundColor: theme.colors.atmo3,
      },
      "&:focus-visible": {
        backgroundColor: theme.colors.atmo3,
      },
      ...($disabled && {
        color: theme.colors.atmo5,
        backgroundColor: theme.colors.atmo3,
        border: `1px solid ${theme.colors.atmo4}`,
      }),
    }),
    ...(variant === "primaryGhost" && {
      color: theme.colors.acce2,
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: theme.colors.atmo3,
      },
      "&:focus-visible": {
        backgroundColor: theme.colors.atmo3,
      },
      ...($disabled && {
        color: theme.colors.atmo5,
        "&:hover": {
          backgroundColor: "transparent",
        },
      }),
    }),
    ...(variant === "secondarySubtle" && {
      color: theme.colors.acce1,
      backgroundColor: "transparent",
      border: `1px solid ${theme.colors.atmo4}`,
      "&:hover": {
        backgroundColor: theme.colors.atmo3,
        border: `1px solid ${theme.colors.atmo4}`,
      },
      "&:focus-visible": {
        backgroundColor: theme.colors.atmo3,
      },
      ...($disabled && {
        color: theme.colors.atmo5,
        backgroundColor: theme.colors.atmo3,
        border: `1px solid ${theme.colors.atmo4}`,
      }),
    }),
    ...(variant === "secondaryGhost" && {
      color: theme.colors.acce1,
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: theme.colors.atmo3,
      },
      "&:focus-visible": {
        backgroundColor: theme.colors.atmo3,
      },
      ...($disabled && {
        color: theme.colors.atmo5,
        "&:hover": {
          backgroundColor: "transparent",
        },
      }),
    }),
    ...(variant === "semantic" && {
      color: theme.colors.base2,
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: theme.button.semanticColor,
      },
      ...($disabled && {
        color: theme.colors.atmo5,
        backgroundColor: theme.button.semanticColorDisabled,
      }),
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
