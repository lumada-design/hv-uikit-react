import styled from "@emotion/styled";
import { theme, themeVariant } from "@hitachivantara/uikit-styles";
import { TypographyVariants } from "./Typography";

export const StyledTypography = styled.div<{ variant: TypographyVariants }>(
  {
    color: theme.colors.acce1,
  },
  themeVariant({
    variants: {
      display: {
        fontWeight: theme.fontWeights.semibold,
        fontSize: theme.fontSizes.xl4,
        lineHeight: theme.lineHeights.xl3,
      },
      title1: {
        fontWeight: theme.fontWeights.semibold,
        fontSize: theme.fontSizes.xl3,
        lineHeight: theme.lineHeights.xl2,
      },
      title2: {
        fontWeight: theme.fontWeights.semibold,
        fontSize: theme.fontSizes.xl2,
        lineHeight: theme.lineHeights.xl,
      },
      title3: {
        fontWeight: theme.fontWeights.semibold,
        fontSize: theme.fontSizes.xl,
        lineHeight: theme.lineHeights.lg,
      },
      title4: {
        fontWeight: theme.fontWeights.semibold,
        fontSize: theme.fontSizes.lg,
        lineHeight: theme.lineHeights.lg,
      },
      body: {
        fontWeight: theme.fontWeights.normal,
        fontSize: theme.fontSizes.base,
        lineHeight: theme.lineHeights.base,
      },
      label: {
        fontWeight: theme.fontWeights.semibold,
        fontSize: theme.fontSizes.base,
        lineHeight: theme.lineHeights.base,
      },
      caption1: {
        fontWeight: theme.fontWeights.normal,
        fontSize: theme.fontSizes.sm,
        lineHeight: theme.lineHeights.sm,
      },
      caption2: {
        fontWeight: theme.fontWeights.normal,
        fontSize: theme.fontSizes.xs,
        lineHeight: theme.lineHeights.sm,
      },
    },
  })
);
