import styled from "@emotion/styled";
import styles from "./styles";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Use the variant prop to change the visual style of the Button. */
  variant:
    | "primary"
    | "primarySubtle"
    | "primaryGhost"
    | "secondarySubtle"
    | "secondaryGhost"
    // deprecated props
    | "secondary"
    | "ghost";
}

const ButtonStyled = styled("button")<{ variant: string }>(styles);

/**
 * Normalize the button variant. It's meant to give us some retro-compatibility with
 * the DS 3.6 API.
 *
 * @param variant the variant of the button
 * @returns       the normalized variant in DS 5 API
 */
const normalizeVariant = (variant: string): string => {
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
 * The Button component is used to trigger an action or event.
 */
const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  onClick,
}) => {
  const normaizedVariant = normalizeVariant(variant);
  return (
    <ButtonStyled variant={normaizedVariant} onClick={onClick}>
      {children}
    </ButtonStyled>
  );
};

export default Button;
