import { clsx } from "clsx";
import React, { forwardRef, ReactElement, useMemo } from "react";
import { useTheme } from "@core/hooks";
import { PolymorphicComponentRef, PolymorphicRef } from "@core/types";
import {
  StyledButton,
  StyledChildren,
  StyledContentDiv,
  StyledIconSpan,
} from "./Button.styles";
import buttonClasses, { HvButtonClasses } from "./buttonClasses";

export const buttonVariant = [
  "primary",
  "primarySubtle",
  "primaryGhost",
  "secondarySubtle",
  "secondaryGhost",
  "semantic",
  // deprecated props
  "secondary",
  "ghost",
] as const;
export type HvButtonVariant = (typeof buttonVariant)[number];

export const buttonSize = ["xs", "sm", "md", "lg", "xl"] as const;
export type HvButtonSize = (typeof buttonSize)[number];

export const buttonRadius = [
  "none",
  "base",
  "round",
  "circle",
  "full",
] as const;
export type HvButtonRadius = (typeof buttonRadius)[number];

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
 *
 * @param variant the variant of the button
 * @returns       the normalized variant in DS 5 API
 */
const mapVariant = (
  variant: HvButtonVariant,
  theme?: string
): HvButtonVariant => {
  if (theme !== "ds3") {
    if (variant === "secondary") {
      console.warn(
        "Button variant 'secondary' is deprecated. Please use 'secondarySubtle'."
      );
      return "secondarySubtle";
    }
    if (variant === "ghost") {
      console.warn(
        "Button variant 'ghost' is deprecated. Please use 'primaryGhost'."
      );
      return "primaryGhost";
    }
  }
  return variant;
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
      id,
      classes,
      children,
      variant = "primary",
      onClick,
      disabled = false,
      className,
      startIcon,
      endIcon,
      icon = false,
      size,
      radius = "base",
      overrideIconColors = true,
      component: Component = "button",
      ...others
    } = props;

    const { activeTheme } = useTheme();

    const onFocusHandler = (event) => {
      event.target.classList.add("HvIsFocusVisible");
      event.target.classList.add(buttonClasses.focusVisible);
      if (classes?.focusVisible) {
        event.target.classList.add(classes.focusVisible);
      }
    };

    const onBlurHandler = (event) => {
      event.target.classList.remove("HvIsFocusVisible");
      event.target.classList.remove(buttonClasses.focusVisible);
      if (classes?.focusVisible) {
        event.target.classList.remove(classes.focusVisible);
      }
    };

    const StyledComponent = useMemo(() => StyledButton(Component), [Component]);

    return (
      <StyledComponent
        id={id}
        ref={ref}
        className={clsx(className, classes?.root, buttonClasses.root)}
        onClick={onClick}
        disabled={disabled}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
        $variant={mapVariant(variant, activeTheme?.name)}
        $iconOnly={!!icon}
        $size={size}
        $radius={radius}
        $overrideIconColors={overrideIconColors}
        $disabled={disabled}
        $startIcon={!!startIcon}
        $endIcon={!!endIcon}
        {...others}
      >
        <StyledContentDiv>
          {startIcon && (
            <StyledIconSpan
              className={clsx(classes?.startIcon, buttonClasses.startIcon)}
            >
              {startIcon}
            </StyledIconSpan>
          )}
          {children && <StyledChildren>{children}</StyledChildren>}
          {endIcon && (
            <StyledIconSpan
              className={clsx(classes?.endIcon, buttonClasses.endIcon)}
            >
              {endIcon}
            </StyledIconSpan>
          )}
        </StyledContentDiv>
      </StyledComponent>
    );
  }
);
