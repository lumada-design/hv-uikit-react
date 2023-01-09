import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { HvTypographyVariants } from "./Typography";

export const StyledTypography = styled("div")(
  ({
    variant,
    link = false,
  }: {
    variant: HvTypographyVariants;
    link?: boolean;
  }) => ({
    color: theme.colors.acce1,
    ...(link && {
      color: theme.colors.acce2,
      textDecoration: "underline",
    }),
    ...(variant === "display" && {
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.xl4,
      lineHeight: theme.lineHeights.xl3,
    }),
    ...(variant === "display" && {
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.xl4,
      lineHeight: theme.lineHeights.xl3,
    }),
    ...(variant === "title1" && {
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.xl3,
      lineHeight: theme.lineHeights.xl2,
    }),
    ...(variant === "title2" && {
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.xl2,
      lineHeight: theme.lineHeights.xl,
    }),
    ...(variant === "title3" && {
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.xl,
      lineHeight: theme.lineHeights.lg,
    }),
    ...(variant === "title4" && {
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.lg,
      lineHeight: theme.lineHeights.lg,
    }),
    ...(variant === "body" && {
      fontWeight: theme.fontWeights.normal,
      fontSize: theme.fontSizes.base,
      lineHeight: theme.lineHeights.base,
    }),
    ...(variant === "label" && {
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.base,
      lineHeight: theme.lineHeights.base,
    }),
    ...(variant === "caption1" && {
      fontWeight: theme.fontWeights.normal,
      fontSize: theme.fontSizes.sm,
      lineHeight: theme.lineHeights.sm,
    }),
    ...(variant === "caption2" && {
      fontWeight: theme.fontWeights.normal,
      fontSize: theme.fontSizes.xs,
      lineHeight: theme.lineHeights.sm,
    }),
  })
);
