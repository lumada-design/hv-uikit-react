import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme, type HvSize } from "@hitachivantara/uikit-styles";

import { outlineStyles } from "../utils/focusUtils";

export const { staticClasses, useClasses } = createClasses("HvButton", {
  /**
   * Classes applied to the root element
   */
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
    marginLeft: `calc(-1 * ${theme.space.xs})`,
  },
  endIcon: {
    marginRight: `calc(-1 * ${theme.space.xs})`,
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
    color: theme.colors.atmo1, // `color-contrast(var(--color) vs ${colors.atmo1}, ${colors.base_light}, ${colors.base_dark})`,
    backgroundColor: "var(--color)",
    ":where(:not($disabled))": {
      ":hover, :focus-visible": {
        backgroundColor: "color-mix(in srgb, var(--color), black 20%)",
      },
      ":active": {
        backgroundColor: "color-mix(in srgb, var(--color), black 30%)",
      },
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
      backgroundColor: theme.alpha("base_light", 0.3),
    },
    "&:active": {
      backgroundColor: theme.alpha("base_light", 0.5),
    },
    "&$disabled": {
      backgroundColor: theme.alpha("base_light", 0.1),
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
  HvSize,
  { height: string; space?: HvSize; fontSize?: keyof typeof theme.fontSizes }
> = {
  xs: { height: "24px", fontSize: "sm" },
  sm: { height: "24px", fontSize: "sm" },
  md: { height: "32px" },
  lg: { height: "48px", space: "md" },
  xl: { height: "48px", space: "md" },
};

export const getSizeStyles = (size: HvSize) => {
  const { height, space = "sm", fontSize } = sizes[size];
  return {
    height,
    padding: theme.spacing(0, space),
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
