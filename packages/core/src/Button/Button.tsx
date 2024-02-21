import { useTheme } from "../hooks/useTheme";
import { useDefaultProps } from "../hooks/useDefaultProps";
import {
  fixedForwardRef,
  PolymorphicComponentRef,
  PolymorphicRef,
} from "../types/generic";
import { ExtractNames } from "../utils/classes";

import {
  staticClasses as buttonClasses,
  getOverrideColors,
  getRadiusStyles,
  getSizeStyles,
  getIconSizeStyles,
  useClasses,
} from "./Button.styles";
import { HvButtonRadius, HvButtonSize, HvButtonVariant } from "./types";

export { buttonClasses };

export type HvButtonClasses = ExtractNames<typeof useClasses>;

export type HvButtonProps<C extends React.ElementType = "button"> =
  PolymorphicComponentRef<
    C,
    {
      /** Use the variant prop to change the visual style of the button. */
      variant?: HvButtonVariant;
      /** Whether the button is an icon-only button. */
      icon?: boolean;
      /** Whether the button is disabled or not. */
      disabled?: boolean;
      /** Class names to be applied. */
      className?: string;
      /** Element placed before the children. */
      startIcon?: React.ReactNode;
      /** Element placed after the children. */
      endIcon?: React.ReactNode;
      /** Button size. */
      size?: HvButtonSize;
      /** Button border radius. */
      radius?: HvButtonRadius;
      /** Defines the default colors of the button are forced into the icon. */
      overrideIconColors?: boolean;
      /** A Jss Object used to override or extend the styles applied. */
      classes?: HvButtonClasses;
      /** Whether the button is selected or not. */
      selected?: boolean;
      /**
       * Whether the button is focusable when disabled.
       * Without this property, the accessibility of the button decreases when disabled since it's not read by screen readers.
       * Set this property to `true` when you need the button to still be focusable when disabled for accessibility purposes.
       */
      focusableWhenDisabled?: boolean;
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
export const HvButton = fixedForwardRef(function HvButton<
  C extends React.ElementType = "button"
>(props: HvButtonProps<C>, ref: PolymorphicRef<C>) {
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
    focusableWhenDisabled,
    onClick: onClickProp,
    onMouseDown: onMouseDownProp,
    ...others
  } = useDefaultProps("HvButton", props);
  const { classes, css, cx } = useClasses(classesProp);
  const { activeTheme } = useTheme();
  const variant = mapVariant(
    variantProp ?? (icon ? "secondaryGhost" : "primary"),
    activeTheme?.name
  );

  const handleClick: HvButtonProps["onClick"] = (e) => {
    if (disabled) return;
    onClickProp?.(e);
  };

  const handleMouseDown: HvButtonProps["onMouseDown"] = (e) => {
    if (disabled) return;
    onMouseDownProp?.(e);
  };

  return (
    <Component
      ref={ref}
      className={cx(
        classes.root,
        classes[variant],
        size && !icon && css(getSizeStyles(size)),
        radius && css(getRadiusStyles(radius)),
        overrideIconColors && css(getOverrideColors()),
        {
          [classes.icon]: icon,
          [classes.disabled]: disabled,
        },
        size && icon && css(getIconSizeStyles(size)),
        className
      )}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      {...(Component === "button" && { type: "button" })}
      {...(disabled && {
        disabled: !focusableWhenDisabled,
        tabIndex: focusableWhenDisabled ? 0 : -1,
        "aria-disabled": true,
      })}
      {...others}
    >
      {startIcon && <span className={classes.startIcon}>{startIcon}</span>}
      {children}
      {endIcon && <span className={classes.endIcon}>{endIcon}</span>}
    </Component>
  );
});
