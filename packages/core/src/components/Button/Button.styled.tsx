import styled from "@emotion/styled";
import { themeVars, themeVariant } from "theme";

const Styled = styled("button")<{ variant: string; size: string }>(
  {
    color: themeVars.colors.atmo1,
    backgroundColor: themeVars.colors.acce1,
    marginTop: themeVars.spacing[5],
    outline: "1px solid black",
  },
  themeVariant({
    variants: {
      solid: {
        fontSize: themeVars.fontSizes.base,
      },
      subtle: {
        fontSize: themeVars.fontSizes.lg,
      },
      outline: {
        fontSize: themeVars.fontSizes.sm,
      },
      ghost: {
        fontSize: themeVars.fontSizes.xs,
      },
    },
    size: {
      xs: {},
      sm: {},
      md: {},
      lg: {},
      xl: {},
    },
  })
);

export default Styled;
