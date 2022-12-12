import React, { CSSProperties, ReactElement, forwardRef } from "react";
import {
  StyledButton,
  StyledChildren,
  StyledContentDiv,
  StyledIconSpan,
} from "./Button.styles";

export type ButtonVariant =
  | "primary"
  | "primarySubtle"
  | "primaryGhost"
  | "secondarySubtle"
  | "secondaryGhost"
  | "semantic"
  // deprecated props
  | "secondary"
  | "ghost";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export type ButtonRadius = "xs" | "sm" | "md" | "lg" | "xl" | "none" | "base";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Use the variant prop to change the visual style of the Button. */
  variant?: ButtonVariant;
  sx?: CSSProperties;
  icon?: Boolean;
  className?: string;
  startIcon?: ReactElement;
  size?: ButtonSize;
  radius?: ButtonRadius;
  overrideIconColors?: Boolean;
}

/**
 * Normalize the button variant. It's meant to give us some retro-compatibility with
 * the DS 3.6 API.
 *
 * @param variant the variant of the button
 * @returns       the normalized variant in DS 5 API
 */
const mapVariant = (variant: ButtonVariant): ButtonVariant => {
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

/**
 * Button component is used to trigger an action or event.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      id,
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
    }: ButtonProps = props;

    return (
      <StyledButton
        id={id}
        className={className}
        ref={ref}
        variant={mapVariant(variant)}
        iconOnly={icon}
        onClick={onClick}
        disabled={disabled}
        size={size}
        radius={radius}
        overrideIconColors={overrideIconColors}
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

Button.displayName = "Button";
