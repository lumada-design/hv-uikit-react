import { CSSInterpolation } from "@emotion/serialize";
import { theme } from "@hitachivantara/uikit-styles";

import { outlineStyles } from "../utils/focusUtils";
import { createClasses } from "../utils/classes";
import { HvButtonRadius, HvButtonSize } from "./types";

export const { staticClasses, useClasses } = createClasses("HvButton", {
  root: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    textTransform: "none",
    cursor: "pointer",
    whiteSpace: "nowrap",

    // Background color common for almost all variants
    "&:hover:not($disabled)": {
      backgroundColor: theme.colors.containerBackgroundHover,
    },
    "&:focus-visible": {
      ...outlineStyles,
      "&:not($disabled)": {
        backgroundColor: theme.colors.containerBackgroundHover,
      },
    },

    // Default button - no size specified
    ...theme.typography.label,
    height: "32px",
    borderRadius: theme.radii.base,
    padding: theme.spacing(0, "sm"),
  },
  startIcon: {
    marginLeft: `calc(-1 * ${theme.space.xs})`,
  },
  endIcon: {
    marginRight: `calc(-1 * ${theme.space.xs})`,
  },
  focusVisible: {},
  disabled: {
    color: theme.colors.secondary_60,
    border: "none",
    backgroundColor: "transparent",
    cursor: "not-allowed",
  },
  icon: {
    margin: 0,
    padding: 0,
    height: "fit-content",
    minWidth: "unset",
  },
  primary: {
    color: theme.colors.atmo1,
    backgroundColor: theme.colors.primary,
    "&:not($disabled)": {
      "&:hover, &:focus-visible": {
        backgroundColor: theme.colors.primary_80,
      },
    },
  },
  primarySubtle: {
    color: theme.colors.primary,
    backgroundColor: "transparent",
    border: "1px solid currentColor",
  },
  primaryGhost: {
    color: theme.colors.primary,
    backgroundColor: "transparent",
    "&$disabled": {
      backgroundColor: "transparent",
    },
  },
  secondarySubtle: {
    color: theme.colors.secondary,
    backgroundColor: "transparent",
    border: "1px solid currentColor",
  },
  secondaryGhost: {
    color: theme.colors.secondary,
    backgroundColor: "transparent",
    "&$disabled": {
      backgroundColor: "transparent",
    },
  },
  semantic: {
    color: theme.colors.base_dark,
    backgroundColor: "transparent",
    "&:not($disabled)": {
      "&:hover, &:focus-visible": {
        backgroundColor: "rgba(251, 252, 252, 0.3)",
      },
    },
    "&$disabled": {
      backgroundColor: "rgba(251, 252, 252, 0.1)",
    },
  },
  secondary: {},
  ghost: {},
});

export const getRadiusStyles = (radius: HvButtonRadius): CSSInterpolation => ({
  borderRadius: theme.radii[radius],
});

// TODO - remove xs and xl in v6 since they are not DS spec
const sizes = {
  xs: { height: "24px", space: "sm", typography: "captionLabel" },
  sm: { height: "24px", space: "sm", typography: "captionLabel" },
  md: { height: "32px", space: "sm", typography: "label" },
  lg: { height: "48px", space: "md", typography: "label" },
  xl: { height: "48px", space: "md", typography: "label" },
};

export const getSizeStyles = (size: HvButtonSize): CSSInterpolation => {
  const { height, space, typography } = sizes[size];
  const { color, ...typoProps } = theme.typography[typography];
  return {
    height,
    padding: theme.spacing(0, space),
    ...typoProps,
  };
};

export const getIconSizeStyles = (size: HvButtonSize): CSSInterpolation => {
  const { height } = sizes[size];
  return {
    height,
    width: height,
  };
};

export const getOverrideColors = (): CSSInterpolation => ({
  "& svg .color0": {
    fill: "currentcolor",
  },
});
