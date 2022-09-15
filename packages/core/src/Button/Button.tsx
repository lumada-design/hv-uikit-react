import styled from "@emotion/styled";
import { themeVars } from "theme";
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string;
}

const Button: React.FC<ButtonProps> = ({ children, variant, onClick }) => {
  const StyledButton = styled.button<{ variant?: string }>({}, (props) => ({
    padding: 20,
    color: themeVars.colors.primary,
    backgroundColor: themeVars.colors.background,
    fontSize:
      props.variant === "big"
        ? themeVars.typography.title
        : themeVars.typography.normal,
  }));

  return (
    <StyledButton variant={variant} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default Button;
