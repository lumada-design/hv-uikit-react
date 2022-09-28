import { useMemo } from "react";
import Box from "../Box/Box";
import { getStyles } from "./Text.styles";

export type TextProps = {
  as: any;
  color?: string;
};

const Text: React.FC<TextProps> = ({
  as = "span",
  color = "textBody",
  ...props
}) => {
  const styles = useMemo(() => {
    return getStyles({
      as,
    });
  }, [as]);

  return (
    <Box as={as} color={color} css={styles} {...props}>
      {props.children}
    </Box>
  );
};

export default Text;

if (process.env.NODE_ENV !== "production") {
  Text.displayName = "Text";
}
