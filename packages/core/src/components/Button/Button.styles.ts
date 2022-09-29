import { css, CSSObject } from "@emotion/react";
import { themeVars, themeUtils } from "theme";
import type { ButtonProps } from "./Button";

export const variantStyles: {
  [variant in NonNullable<ButtonProps["variant"]>]: CSSObject;
} = {
  primary: {
    color: themeVars.colors.atmo1,
    backgroundColor: themeVars.colors.acce2,
    ":hover": {
      backgroundColor: themeVars.colors.acce2h,
    },
  },
  secondary: {
    color: themeVars.colors.acce1,
    backgroundColor: "transparent",
    ":hover": {
      backgroundColor: themeVars.colors.atmo3,
    },
  },
};

export const sizeStyles: {
  [variant in NonNullable<ButtonProps["size"]>]: CSSObject;
} = {
  small: {
    minWidth: 80,
    lineHeight: themeVars.lineHeight.snug,
  },
  medium: {
    minWidth: 120,
    lineHeight: themeVars.lineHeight.normal,
  },
  large: {
    minWidth: 148,
    lineHeight: themeVars.lineHeight.relaxed,
  },
};

const baseStyles: CSSObject = {
  textTransform: "none",
  "&:hover,&:focus": {},
  "&:active": {},
  minWidth: "70px",
  padding: `${themeUtils.spacing(1)} ${themeUtils.spacing(
    2
  )} ${themeUtils.spacing(1)} ${themeUtils.spacing(2)}`,
  cursor: "pointer",
  minHeight: "32px",
  borderRadius: themeVars.radii.sm,
  fontSize: themeVars.fontSize.base,
  fontWeight: themeVars.fontWeight.normal,
};

export const getStyles = ({
  variant,
  size,
}: Pick<ButtonProps, "variant" | "size">): ReturnType<typeof css> => {
  const styles = {
    ...baseStyles,
    ...(variant && variantStyles[variant]),
    ...(size && sizeStyles[size]),
  };

  return css(styles);
};
