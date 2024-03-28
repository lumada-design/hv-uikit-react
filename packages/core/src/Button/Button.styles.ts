import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../utils/classes";
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
    "&:hover": {
      backgroundColor: theme.colors.containerBackgroundHover,
    },
    "&:focus-visible": {
      ...outlineStyles,
      backgroundColor: theme.colors.containerBackgroundHover,
    },

    // Default button - no size specified
    fontFamily: theme.fontFamily.body,
    ...theme.typography.label,
    height: "32px",
    border: "1px solid currentcolor",
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
    cursor: "not-allowed",
    color: theme.colors.secondary_60,
    borderColor: theme.colors.atmo3,
    backgroundColor: theme.colors.atmo3,
    "&:hover, &:focus-visible": {
      backgroundColor: theme.colors.atmo3,
      borderColor: theme.colors.atmo3,
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
  subtle: {
    backgroundColor: "transparent",
    "&$disabled": {
      backgroundColor: "transparent",
      "&:hover, &:focus-visible": {
        backgroundColor: "transparent",
      },
    },
  },
  ghost: {
    borderColor: "transparent",
    backgroundColor: "transparent",
    "&$disabled": {
      borderColor: "transparent",
      backgroundColor: "transparent",
      "&:hover, &:focus-visible": {
        borderColor: "transparent",
        backgroundColor: "transparent",
      },
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

export const getColoringStyle = (color: string, type?: string) => {
  if (type)
    return {
      color: theme.colors[color !== "warning" ? color : `${color}_140`],
    };

  const bg = theme.colors[color !== "warning" ? color : `${color}_120`];
  const hoverBg =
    theme.colors[color !== "warning" ? `${color}_80` : `${color}_140`];
  return {
    color: theme.colors.atmo1,
    backgroundColor: bg,
    borderColor: bg,
    "&:hover, &:focus-visible": {
      backgroundColor: hoverBg,
      borderColor: hoverBg,
    },
  };
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
  const { color, ...typoProps } = theme.typography[typography];
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
