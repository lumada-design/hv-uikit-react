import { CSSInterpolation } from "@emotion/serialize";

import { theme } from "@hitachivantara/uikit-styles";

import { outlineStyles } from "@core/utils/focusUtils";
import { createClasses } from "@core/utils/classes";

import { HvButtonRadius, HvButtonSize } from "./types";

export const { staticClasses, useClasses } = createClasses("HvButton", {
  root: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    textTransform: "none",
    cursor: "pointer",
    minWidth: "70px",

    whiteSpace: "nowrap",

    "&:hover": {},
    "&:focus": {},
    "&:focus-visible": { ...outlineStyles },
    "&:active": {},

    // default button - no size specified
    fontFamily: theme.fontFamily.body,
    fontSize: theme.fontSizes.base,
    fontWeight: theme.fontWeights.semibold,
    lineHeight: "11px",
    letterSpacing: 0,
    height: "32px",
    borderRadius: theme.radii.base,
    padding: theme.spacing("xs", "sm"),
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
    borderColor: theme.colors.atmo4,
    backgroundColor: theme.colors.atmo3,
    cursor: "not-allowed",
    pointerEvents: "none",
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
    "&:hover, &:focus-visible": {
      backgroundColor: theme.colors.primary_80,
    },
  },
  primarySubtle: {
    color: theme.colors.primary,
    backgroundColor: "transparent",
    border: `1px solid ${theme.colors.primary}`,
    "&:hover, &:focus-visible": {
      backgroundColor: theme.colors.containerBackgroundHover,
    },
  },
  primaryGhost: {
    color: theme.colors.primary,
    backgroundColor: "transparent",
    "&:hover, &:focus-visible": {
      backgroundColor: theme.colors.containerBackgroundHover,
    },
    "&:disabled": {
      backgroundColor: "transparent",
    },
  },
  secondarySubtle: {
    color: theme.colors.secondary,
    backgroundColor: "transparent",
    border: `1px solid ${theme.colors.secondary}`,
    "&:hover, &:focus-visible": {
      backgroundColor: theme.colors.containerBackgroundHover,
    },
  },
  secondaryGhost: {
    color: theme.colors.secondary,
    backgroundColor: "transparent",
    "&:hover, &:focus-visible": {
      backgroundColor: theme.colors.containerBackgroundHover,
    },
    "&:disabled": {
      backgroundColor: "transparent",
    },
  },
  semantic: {
    color: theme.colors.base_dark,
    backgroundColor: "transparent",
    "&:hover, &:focus-visible": {
      backgroundColor: "rgba(251, 252, 252, 0.3)",
    },
    "&:disabled": {
      backgroundColor: "rgba(251, 252, 252, 0.1)",
    },
  },
  secondary: {},
  ghost: {},
});

export const getRadiusStyles = (radius: HvButtonRadius): CSSInterpolation => ({
  borderRadius: theme.radii[radius],
});

export const getSizeStyles = (size: HvButtonSize): CSSInterpolation => ({
  height: theme.sizes[size],
  paddingLeft: theme.space[size],
  paddingRight: theme.space[size],
  fontSize: theme.fontSizes[size],
});

export const getOverrideColors = (): CSSInterpolation => ({
  "& svg .color0": {
    fill: "currentcolor",
  },
});
