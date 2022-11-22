import { CSSProperties } from "react";

import { StyledButton } from "./Button.styles";

export type ButtonVariant =
  | "primary"
  | "primarySubtle"
  | "primaryGhost"
  | "secondarySubtle"
  | "secondaryGhost"
  // deprecated props
  | "secondary"
  | "ghost";

export interface ButtonProps extends BaseProps<HTMLButtonElement> {
  /** Use the variant prop to change the visual style of the Button. */
  variant?: ButtonVariant;
  sx?: CSSProperties;
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
export const Button = ({
  children,
  variant = "primary",
  onClick,
  className,
}: ButtonProps) => {
  return (
    <StyledButton
      className={className}
      variant={mapVariant(variant)}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
};

Button.displayName = "Button";
