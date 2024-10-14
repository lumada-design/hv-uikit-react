import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme, type HvSize } from "@hitachivantara/uikit-styles";

import { outlineStyles } from "../utils/focusUtils";

export const { staticClasses, useClasses } = createClasses("HvButton", {
  root: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    textTransform: "none",
    cursor: "pointer",
    whiteSpace: "nowrap",

    // Background color common for almost all variants
    ":where(:not($disabled))": {
      ":hover, :focus-visible": {
        backgroundColor: theme.colors.containerBackgroundHover,
      },
    },
    ":focus-visible": {
      ...outlineStyles,
    },

    // clickable targets should be at least 24x24
    minWidth: 24,
    minHeight: 24,

    // Default button - no size specified
    fontFamily: theme.fontFamily.body,
    ...theme.typography.label,
    color: "var(--color, currentcolor)",
    backgroundColor: "transparent",
    height: "var(--HvButton-height)",
    border: "1px solid transparent",
    borderRadius: `var(--radius, ${theme.radii.base})`,
    padding: theme.spacing(0, "sm"),
  },
  startIcon: {
    marginLeft: theme.spacing(-1),
  },
  endIcon: {
    marginRight: theme.spacing(-1),
  },
  focusVisible: {},
  disabled: {
    cursor: "not-allowed",
    color: theme.colors.secondary_60,
    backgroundColor: "transparent",
    borderColor: "transparent",
    ":hover, :focus-visible": {
      backgroundColor: "transparent",
      borderColor: "transparent",
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
  contained: {
    color: theme.colors.atmo1,
    backgroundColor: "var(--color)",
    // use experimental color-contrast function if available
    "&:not($disabled)": {
      color: `color-contrast(var(--color) vs ${theme.colors.atmo1}, ${theme.colors.base_light}, ${theme.colors.base_dark})`,
    },
    "&:hover, &:focus-visible": {
      backgroundColor: "color-mix(in srgb, var(--color), black 20%)",
    },
    "&:active": {
      backgroundColor: "color-mix(in srgb, var(--color), black 30%)",
    },
  },
  subtle: {
    borderColor: "currentcolor",
  },
  ghost: {},
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

// TODO - remove xs and xl in v6 since they are not DS spec
const sizes: Record<
  string,
  { height: string; space?: HvSize; fontSize?: keyof typeof theme.fontSizes }
> = {
  xs: { height: "24px", fontSize: "sm" },
  sm: { height: "24px", fontSize: "sm" },
  md: { height: "32px" },
  lg: { height: "48px", space: "md" },
  xl: { height: "48px", space: "md" },
};

export const getSizeStyles = (size: HvSize) => {
  const { height, space, fontSize } = sizes[size];
  return {
    height,
    padding: space && theme.spacing(0, space),
    fontSize: fontSize && theme.fontSizes[fontSize],
  };
};

export const getIconSizeStyles = (size: HvSize) => {
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
