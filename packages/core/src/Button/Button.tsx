import styled from "@emotion/styled";
import { themeVars, themeVariant } from "theme";

type ButtonVariants = "big" | "small";
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "small",
  onClick,
}) => {
  const StyledButton = styled("button")<{ variant?: string }>(
    {
      padding: 10,
      color: themeVars.colors.background,
      backgroundColor: themeVars.colors.primary,
    },
    themeVariant({
      variants: {
        big: {
          fontSize: themeVars.fontSizes.lg,
        },
        small: {
          fontSize: themeVars.fontSizes.sm,
        },
      },
    })
  );

  return (
    <StyledButton variant={variant} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default Button;
