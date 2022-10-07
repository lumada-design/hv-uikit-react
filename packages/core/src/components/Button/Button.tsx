import { CSSProperties } from "react";
import { StyledButton } from "./styles";

export type ButtonVariant =
  | "primary"
  | "primarySubtle"
  | "primaryGhost"
  | "secondarySubtle"
  | "secondaryGhost"
  // deprecated props
  | "secondary"
  | "ghost";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Use the variant prop to change the visual style of the Button. */
  variant?: ButtonVariant;
  sx?: CSSProperties;
  className?: string;
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
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  onClick,
  className,
}) => {
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

export default Button;

if (process.env.NODE_ENV !== "production") {
  Button.displayName = "Button";
}
