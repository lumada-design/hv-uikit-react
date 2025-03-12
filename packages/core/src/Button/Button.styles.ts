import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme, type HvSize } from "@hitachivantara/uikit-styles";

import { outlineStyles } from "../utils/focusUtils";

export const { staticClasses, useClasses } = createClasses("HvButton", {
  /** applied to the root element */
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
        backgroundColor: theme.colors.bgHover,
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
    border: "none",
    outline: "1px solid transparent",
    outlineOffset: -1,
    borderRadius: `var(--radius, ${theme.radii.base})`,
    padding: theme.spacing(0, "sm"),
  },
  /** applied to the _left_ icon container */
  startIcon: {
    marginLeft: theme.spacing(-1),
  },
  /** applied to the _right_ icon container */
  endIcon: {
    marginRight: theme.spacing(-1),
  },
  focusVisible: {},
  /** applied to the root element when disabled */
  disabled: {
    cursor: "not-allowed",
    color: theme.colors.textDisabled,
    "&,:hover,:focus-visible": {
      backgroundColor: "transparent",
      outlineColor: "transparent",
    },
  },
  /** applied to the root element when is icon-only */
  icon: {
    margin: 0,
    padding: 0,
    height: "fit-content",
  },
  /** applied to the root element when using the `contained` variant */
  contained: {
    color: theme.colors.textDimmed, // `color-contrast(var(--color) vs ${colors.textDimmed}, ${colors.textLight}, ${colors.textDark})`,
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
  /** applied to the root element when using the `subtle` variant */
  subtle: {
    outlineColor: "currentcolor",
  },
  /** applied to the root element when using the `ghost` variant */
  ghost: {},
  /** applied to the root element when using the `semantic` variant */
  semantic: {
    color: theme.colors.textDark,
    backgroundColor: "transparent",
    outlineColor: "transparent",
    "&:hover, &:focus-visible": {
      backgroundColor: theme.alpha("textLight", 0.3),
    },
    "&:active": {
      backgroundColor: theme.alpha("textLight", 0.5),
    },
    "&$disabled": {
      backgroundColor: theme.alpha("textLight", 0.1),
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
