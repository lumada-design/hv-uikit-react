import { CSSProperties } from "react";
import { StyledButton } from "./styles";

export type ButtonVariants =
  | "primary"
  | "primarySubtle"
  | "primaryGhost"
  | "secondarySubtle"
  | "secondaryGhost";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants;
  css?: CSSProperties;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  onClick,
  className,
}) => {
  return (
    <StyledButton className={className} variant={variant} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default Button;
