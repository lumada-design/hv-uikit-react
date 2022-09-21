import styled from "@emotion/styled";
import { themeVars, themeVariant } from "theme";
import { useTheme } from "hooks";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Use the variant prop to change the visual style of the Button. */
  variant: "solid" | "subtle" | "outline" | "ghost";

  /** Use the size prop to change the size of the Button. */
  size: "xs" | "sm" | "md" | "lg" | "xl";
}

/**
 * The Button component is used to trigger an action or event.
 */
const Button: React.FC<ButtonProps> = ({
  children,
  variant = "solid",
  size = "md",
  onClick,
}) => {
  const { spacing } = useTheme();

  const ButtonStyled = styled("button")<{ variant: string; size: string }>(
    {
      color: themeVars.colors.atmo1,
      backgroundColor: themeVars.colors.acce1,
      marginLeft: spacing(12),
      marginTop: themeVars.spacing[5],
      outline: "1px solid black",
    },
    themeVariant({
      variants: {
        solid: {
          fontSize: themeVars.fontSizes.lg,
        },
        subtle: {
          fontSize: themeVars.fontSizes.sm,
        },
        outline: {
          fontSize: themeVars.fontSizes.xs,
        },
        ghost: {
          fontSize: themeVars.fontSizes.base,
        },
      },
    }),
    themeVariant({
      prop: "size",
      variants: {
        xs: {
          padding: themeVars.spacing[1],
        },
        sm: {
          padding: themeVars.spacing[2],
        },
        md: {
          padding: themeVars.spacing[3],
        },
        lg: {
          padding: themeVars.spacing[4],
        },
        xl: {
          padding: themeVars.spacing[5],
        },
      },
    })
  );

  return (
    <ButtonStyled variant={variant} size={size} onClick={onClick}>
      {children}
    </ButtonStyled>
  );
};

export default Button;
