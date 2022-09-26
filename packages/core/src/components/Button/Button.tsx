import styled from "@emotion/styled";
import { useEffect } from "react";
import styles from "./styles";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Use the variant prop to change the visual style of the Button. */
  variant:
    | "primary"
    | "primarySubtle"
    | "primaryGhost"
    | "secondarySubtle"
    | "secondaryGhost";
}

const ButtonStyled = styled("button")<{ variant: string }>(styles);

/**
 * The Button component is used to trigger an action or event.
 */
const Button: React.FC<ButtonProps> = ({
  children,
  variant = "solid",
  onClick,
}) => {
  useEffect(() => console.log("BUTTON"));
  return (
    <ButtonStyled variant={variant} onClick={onClick}>
      {children}
    </ButtonStyled>
  );
};

export default Button;
