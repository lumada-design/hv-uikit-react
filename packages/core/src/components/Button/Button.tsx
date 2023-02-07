import React, { CSSProperties, forwardRef, ReactElement } from "react";
import {
  StyledButton,
  StyledChildren,
  StyledContentDiv,
  StyledIconSpan,
} from "./Button.styles";
import { HvButtonClasses } from "./buttonClasses";

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

export type HvButtonRadius = "xs" | "sm" | "md" | "lg" | "xl" | "none" | "base";

export interface HvButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Use the variant prop to change the visual style of the Button. */
  variant?: HvButtonVariant;
  sx?: CSSProperties;
  icon?: boolean;
  className?: string;
  startIcon?: ReactElement;
  size?: HvButtonSize;
  radius?: HvButtonRadius;
  overrideIconColors?: boolean;
  selected?: boolean;
  classes?: HvButtonClasses;
}

/**
 * Normalize the button variant. It's meant to give us some retro-compatibility with
 * the DS 3.6 API.
 *
 * @param variant the variant of the button
 * @returns       the normalized variant in DS 5 API
 */
const mapVariant = (variant: HvButtonVariant): HvButtonVariant => {
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
  return variant;
};

const onFocusHandler = (event) => {
  event.target.classList.add("HvIsFocusVisible");
};

const onBlurHandler = (event) => {
  event.target.classList.remove("HvIsFocusVisible");
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
      size = "md",
      radius = "base",
      overrideIconColors = true,
      ...others
    }: HvButtonProps = props;

    return (
      <StyledButton
        id={id}
        className={className}
        ref={ref}
        onClick={onClick}
        disabled={disabled}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
        $variant={mapVariant(variant)}
        $iconOnly={!!icon}
        $size={size}
        $radius={radius}
        $overrideIconColors={overrideIconColors}
        $disabled={!!disabled}
        {...others}
      >
        <StyledContentDiv>
          {startIcon && <StyledIconSpan>{startIcon}</StyledIconSpan>}
          {children && <StyledChildren>{children}</StyledChildren>}
        </StyledContentDiv>
      </StyledButton>
    );
  }
);
