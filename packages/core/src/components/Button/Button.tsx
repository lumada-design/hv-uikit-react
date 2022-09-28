import { useMemo } from "react";
import Box from "../Box";
import { getStyles } from "./Button.styles";

export type ButtonProps = {
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
};

const Button: React.FC<ButtonProps> = (props) => {
  const { children, variant = "primary", size = "medium", ...rest } = props;

  const styles = useMemo(() => {
    return getStyles({
      variant,
      size,
    });
  }, [variant, size]);

  return (
    <Box as={"button"} css={styles} {...rest}>
      {children}
    </Box>
  );
};

export default Button;

if (process.env.NODE_ENV !== "production") {
  Button.displayName = "Button";
}
