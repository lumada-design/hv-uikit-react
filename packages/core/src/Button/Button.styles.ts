import { createClasses } from "@hitachivantara/uikit-react-utils";
import { getColor, theme } from "@hitachivantara/uikit-styles";

import { outlineStyles } from "../utils/focusUtils";
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
    ":hover": {
      backgroundColor: "hsl(from var(--color) h s calc(l * 0.9) / .2)",
    },
    ":focus-visible": {
      ...outlineStyles,
      backgroundColor: "hsl(from var(--color) h s calc(l * 0.9) / .2)",
    },

    // Default button - no size specified
    fontFamily: theme.fontFamily.body,
    ...theme.typography.label,
    color: "var(--color)",
    backgroundColor: "transparent",
    height: "var(--HvButton-height)",
    border: "1px solid var(--color)",
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
    "--color": theme.colors.atmo3,
    cursor: "not-allowed",
    color: theme.colors.secondary_60,
    backgroundColor: "transparent",
    "&:hover, &:focus-visible": {
      backgroundColor: "transparent",
    },
  },
  icon: {
    margin: 0,
    padding: 0,
    height: "fit-content",
    "& > *": {
      margin: -1,
    },
  },
  subtle: {},
  ghost: {
    borderColor: "transparent",
    "&$disabled": {
      borderColor: "transparent",
    },
    "&:hover, &:focus-visible": {
      borderColor: "transparent",
    },
  },
  contained: {
    color: theme.colors.atmo1, // `color-contrast(var(--color) vs ${theme.colors.base_light}, ${theme.colors.base_dark})`,
    backgroundColor: "var(--color)",
    "&:hover, &:focus-visible": {
      backgroundColor: "color-mix(in srgb, var(--color) 90%, #333)",
      borderColor: "color-mix(in srgb, var(--color) 90%, #333)",
    },
    "&$disabled, &$disabled:hover": {
      backgroundColor: theme.colors.atmo3,
    },
  },
  semantic: {
    color: theme.colors.base_dark,
    backgroundColor: "transparent",
    borderColor: "transparent",
    "&:hover, &:focus-visible": {
      backgroundColor: "rgba(251, 252, 252, 0.3)",
    },
    "&$disabled": {
      backgroundColor: "rgba(251, 252, 252, 0.1)",
    },
  },

  // TODO - remove in v6
  primary: {},
  primarySubtle: {},
  primaryGhost: {},
  secondarySubtle: {},
  secondaryGhost: {},

  // Deprecated (DS3)
  secondary: {},
});

export const getColoringStyle = (color: string) => {
  return { "--color": getColor(color) };
};

export const getRadiusStyles = (radius: HvButtonRadius) => ({
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

export const getSizeStyles = (size: HvButtonSize) => {
  const { height, space, typography } = sizes[size];
  const { color, ...typoProps } =
    theme.typography[typography as keyof typeof theme.typography];
  return {
    height,
    padding: theme.spacing(0, space),
    ...typoProps,
  };
};

export const getIconSizeStyles = (size: HvButtonSize) => {
  const { height } = sizes[size];
  return {
    height,
    width: height,
  };
};

export const getOverrideColors = () => ({
  "& svg .color0": {
    fill: "currentcolor",
  },
});
