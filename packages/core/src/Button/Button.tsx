import React, { forwardRef, ReactElement } from "react";

import { useTheme } from "@core/hooks/useTheme";
import { useDefaultProps } from "@core/hooks/useDefaultProps";
import { PolymorphicComponentRef, PolymorphicRef } from "@core/types/generic";
import { ExtractNames } from "@core/utils/classes";

import {
  staticClasses as buttonClasses,
  getOverrideColors,
  getRadiusStyles,
  getSizeStyles,
  useClasses,
} from "./Button.styles";
import { HvButtonRadius, HvButtonSize, HvButtonVariant } from "./types";

export { buttonClasses };

export type HvButtonClasses = ExtractNames<typeof useClasses>;

export type HvButtonProps<C extends React.ElementType = "button"> =
  PolymorphicComponentRef<
    C,
    {
      /** Use the variant prop to change the visual style of the Button. */
      variant?: HvButtonVariant;
      /** Whether the Button is an icon-only button. */
      icon?: boolean;
      /** Whether the Button is disabled or not. */
      disabled?: boolean;
      /** Class names to be applied. */
      className?: string;
      /** Element placed before the children. */
      startIcon?: ReactElement;
      /** Element placed after the children. */
      endIcon?: ReactElement;
      /** Button size. */
      size?: HvButtonSize;
      /** Button border radius. */
      radius?: HvButtonRadius;
      /** Defines the default colors of the button are forced into the icon. */
      overrideIconColors?: boolean;
      /** A Jss Object used to override or extend the styles applied. */
      classes?: HvButtonClasses;
      /** Whether the Button is selected or not. */
      selected?: boolean;
    }
  >;

/**
 * Normalize the button variant. It's meant to give us some retro-compatibility with
 * the DS 3.6 API.
 * @returns the normalized variant in DS 5 API
 */
const mapVariant = (
  variant: HvButtonVariant,
  theme?: string
): HvButtonVariant => {
  if (theme === "ds3") return variant;

  const deprecatedVariantMap: Record<string, HvButtonVariant> = {
    secondary: "secondarySubtle",
    ghost: "primaryGhost",
  };

  const mappedVariant = deprecatedVariantMap[variant];

  if (import.meta.env.DEV && mappedVariant) {
    // eslint-disable-next-line no-console
    console.warn(
      `Button variant '${variant}' is deprecated. Please use '${mappedVariant}'.`
    );
  }

  return mappedVariant || variant;
};

/**
 * Button component is used to trigger an action or event.
 */
export const HvButton: <C extends React.ElementType = "button">(
  props: HvButtonProps<C>
) => React.ReactElement | null = forwardRef(
  <C extends React.ElementType = "button">(
    props: HvButtonProps<C>,
    ref: PolymorphicRef<C>
  ) => {
    const {
      classes: classesProp,
      children,
      variant: variantProp,
      disabled = false,
      className,
      startIcon,
      endIcon,
      icon = false,
      size,
      radius,
      overrideIconColors = true,
      component: Component = "button",
      ...others
    } = useDefaultProps("HvButton", props);
    const { classes, css, cx } = useClasses(classesProp);
    const { activeTheme } = useTheme();
    const variant = mapVariant(
      variantProp ?? (icon ? "secondaryGhost" : "primary"),
      activeTheme?.name
    );

    return (
      <Component
        ref={ref}
        className={cx(
          classes.root,
          classes[variant],
          size && css(getSizeStyles(size)),
          radius && css(getRadiusStyles(radius)),
          overrideIconColors && css(getOverrideColors()),
          {
            [classes.icon]: icon,
            [classes.disabled]: disabled,
          },
          className
        )}
        {...(Component === "button" && { type: "button" })}
        {...(disabled && {
          disabled: true,
          tabIndex: -1,
          "aria-disabled": true,
        })}
        {...others}
      >
        {startIcon && <span className={classes.startIcon}>{startIcon}</span>}
        {children}
        {endIcon && <span className={classes.endIcon}>{endIcon}</span>}
      </Component>
    );
  }
);
