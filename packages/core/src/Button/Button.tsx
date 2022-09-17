import styled from "@emotion/styled";
import { variant as styledSystemVariant } from "@styled-system/variant";
import { themeVars } from "theme";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "normal",
  onClick,
}) => {
  const StyledButton = styled("button")<{ variant?: string }>(
    {
      padding: 20,
      color: themeVars.colors.background,
      backgroundColor: themeVars.colors.primary,
    },
    styledSystemVariant({
      variants: {
        big: {
          fontSize: themeVars.fontSizes.title,
        },
        small: {
          fontSize: themeVars.fontSizes.normal,
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
