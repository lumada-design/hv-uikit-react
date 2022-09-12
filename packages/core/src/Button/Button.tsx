import styled from "@emotion/styled";
import { themeVars } from "theme";
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  const StyledButton = styled.button({
    padding: 20,
    color: themeVars.colors.primary,
    backgroundColor: themeVars.colors.background,
  });

  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

export default Button;
