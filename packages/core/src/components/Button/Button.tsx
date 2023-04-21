import { clsx } from "clsx";
import { useTheme } from "@core/hooks";
import React, { forwardRef, ReactElement } from "react";
import {
  StyledButton,
  StyledChildren,
  StyledContentDiv,
  StyledIconSpan,
} from "./Button.styles";
import buttonClasses, { HvButtonClasses } from "./buttonClasses";

export type HvButtonVariant =
  | "primary"
  | "primarySubtle"
  | "primaryGhost"
  | "secondarySubtle"
  | "secondaryGhost"
  | "semantic"
  // deprecated props
  | "secondary"
  | "ghost";

export type HvButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export type HvButtonRadius = "none" | "base" | "round" | "circle" | "full";

export interface HvButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Use the variant prop to change the visual style of the Button. */
  variant?: HvButtonVariant;
  /** Whether the Button is an icon-only button. */
  icon?: boolean;
  /** Class names to be applied. */
  className?: string;
  /** Element placed before the children. */
  startIcon?: ReactElement;
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
export const HvButton = forwardRef<HTMLButtonElement, HvButtonProps>(
  (props, ref) => {
    const {
      id,
      classes,
      children,
      variant = "primary",
      onClick,
      disabled,
      className,
      startIcon,
      icon = false,
      size,
      radius = "base",
      overrideIconColors = true,
      ...others
    }: HvButtonProps = props;

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

    return (
      <StyledButton
        id={id}
        className={clsx(className, classes?.root, buttonClasses.root)}
        ref={ref}
        onClick={onClick}
        disabled={disabled}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
        $variant={mapVariant(variant, activeTheme?.name)}
        $iconOnly={!!icon}
        $size={size}
        $radius={radius}
        $overrideIconColors={overrideIconColors}
        $disabled={!!disabled}
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
        </StyledContentDiv>
      </StyledButton>
    );
  }
);
