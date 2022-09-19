import styled from "@emotion/styled";
import { useTheme } from "hooks";
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
  const { spacingFn } = useTheme();

  const StyledButton = styled("button")<{ variant?: string }>(
    {
      color: themeVars.colors.background,
      backgroundColor: themeVars.colors.primary,
      padding: spacingFn(3),
      marginLeft: spacingFn(10),
      marginTop: themeVars.spacing[5],
      outline: "1px solid black",
    },
    themeVariant({
      variants: {
        big: {
          fontSize: themeVars.fontSizes.xl,
        },
        small: {
          fontSize: themeVars.fontSizes.sm,
        },
      },
    })
  );

  return (
    <StyledButton variant={variant} onClick={onClick}>
      <span>
        left margin and padding
        <br />
        should change with theme
      </span>
      <br />
      <br />
      {children}
    </StyledButton>
  );
};

export default Button;
