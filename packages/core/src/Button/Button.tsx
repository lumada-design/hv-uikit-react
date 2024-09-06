import { useMemo } from "react";
import {
  useDefaultProps,
  useTheme,
  type ExtractNames,
} from "@hitachivantara/uikit-react-utils";
import { HvBaseTheme } from "@hitachivantara/uikit-styles";

import {
  fixedForwardRef,
  PolymorphicComponentRef,
  PolymorphicRef,
} from "../types/generic";
import {
  staticClasses as buttonClasses,
  getColoringStyle,
  getIconSizeStyles,
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
  theme?: HvBaseTheme,
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
      `Button variant '${variant}' is deprecated. Please use '${mappedVariant}'.`,
    );
  }

  return mappedVariant || variant;
};

/**
 * Button component is used to trigger an action or event.
 */
export const HvButton = fixedForwardRef(function HvButton<
  C extends React.ElementType = "button",
>(props: HvButtonProps<C>, ref: PolymorphicRef<C>) {
  const {
    classes: classesProp,
    children,
    variant: variantProp, // TODO - should we split into two props (color and type) in v6?
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
    selected,
    style,
    ...others
  } = useDefaultProps("HvButton", props);
  const { classes, css, cx } = useClasses(classesProp);
  const { activeTheme } = useTheme();
  const variant = mapVariant(
    variantProp ?? (icon ? "secondaryGhost" : "primary"),
    activeTheme?.base,
  );

  const handleClick: HvButtonProps["onClick"] = (e) => {
    if (disabled) return;
    onClickProp?.(e);
  };

  const handleMouseDown: HvButtonProps["onMouseDown"] = (e) => {
    if (disabled) return;
    onMouseDownProp?.(e);
  };

  const [color, type] = useMemo(() => {
    const result = variant.split(/(?=[A-Z])/);
    if (
      result[0] === "ghost" ||
      result[0] === "semantic" ||
      (result[0] === "secondary" && !result[1])
    )
      return [];
    return result.map((x) => x.toLowerCase());
  }, [variant]);

  const sizeStyles = useMemo(
    () =>
      size ? (icon ? getIconSizeStyles(size) : getSizeStyles(size)) : undefined,
    [size, icon],
  );

  return (
    <Component
      ref={ref}
      style={{
        ...style,
        "--HvButton-height": sizeStyles ? sizeStyles.height : "32px",
      }}
      className={cx(
        classes.root,
        type && classes[type as keyof HvButtonClasses],
        color && css(getColoringStyle(color, type)),
        classes[variant as keyof HvButtonClasses], // Placed after type and color CSS for DS3 override
        radius && css(getRadiusStyles(radius)),
        overrideIconColors && css(getOverrideColors()),
        {
          [classes.icon]: icon,
          [classes.disabled]: disabled,
        },
        sizeStyles && css(sizeStyles),
        className,
      )}
      data-color={color}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      {...(Component === "button" && { type: "button" })}
      {...(disabled && {
        disabled: !focusableWhenDisabled,
        tabIndex: focusableWhenDisabled ? 0 : -1,
        "aria-disabled": true,
      })}
      {...(selected && { "aria-pressed": selected })}
      {...others}
    >
      {startIcon && <span className={classes.startIcon}>{startIcon}</span>}
      {children}
      {endIcon && <span className={classes.endIcon}>{endIcon}</span>}
    </Component>
  );
});
