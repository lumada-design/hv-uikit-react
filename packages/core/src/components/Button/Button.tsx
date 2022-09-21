import ButtonStyled from "./Button.styled";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Use the variant prop to change the visual style of the Button. */
  variant?: "solid" | "subtle" | "outline" | "ghost";

  /** Use the size prop to change the size of the Button. */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

/**
 * The Button component is used to trigger an action or event.
 */
const Button: React.FC<ButtonProps> = ({
  children,
  variant = "default",
  size = "md",
  onClick,
}) => {
  return (
    <ButtonStyled variant={variant} size={size} onClick={onClick}>
      {children}
    </ButtonStyled>
  );
};

export default Button;
