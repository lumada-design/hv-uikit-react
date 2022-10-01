import styled from "@emotion/styled";
import { themeVars, themeVariant } from "theme";
import { TypographyVariants } from "./Typography";

export const StyledTypography = styled.p<{ variant: TypographyVariants }>(
  {
    color: themeVars.colors.acce1,
  },
  themeVariant({
    variants: {
      display: {
        fontWeight: themeVars.fontWeights.semibold,
        fontSize: themeVars.fontSizes.xl4,
        lineHeight: themeVars.lineHeights.xl3,
      },
      title1: {
        fontWeight: themeVars.fontWeights.semibold,
        fontSize: themeVars.fontSizes.xl3,
        lineHeight: themeVars.lineHeights.xl2,
      },
      title2: {
        fontWeight: themeVars.fontWeights.semibold,
        fontSize: themeVars.fontSizes.xl2,
        lineHeight: themeVars.lineHeights.xl,
      },
      title3: {
        fontWeight: themeVars.fontWeights.semibold,
        fontSize: themeVars.fontSizes.xl,
        lineHeight: themeVars.lineHeights.lg,
      },
      title4: {
        fontWeight: themeVars.fontWeights.semibold,
        fontSize: themeVars.fontSizes.lg,
        lineHeight: themeVars.lineHeights.lg,
      },
      body: {
        fontWeight: themeVars.fontWeights.normal,
        fontSize: themeVars.fontSizes.base,
        lineHeight: themeVars.lineHeights.base,
      },
      label: {
        fontWeight: themeVars.fontWeights.semibold,
        fontSize: themeVars.fontSizes.base,
        lineHeight: themeVars.lineHeights.base,
      },
      caption1: {
        fontWeight: themeVars.fontWeights.normal,
        fontSize: themeVars.fontSizes.sm,
        lineHeight: themeVars.lineHeights.sm,
      },
      caption2: {
        fontWeight: themeVars.fontWeights.normal,
        fontSize: themeVars.fontSizes.xs,
        lineHeight: themeVars.lineHeights.sm,
      },
    },
  })
);
