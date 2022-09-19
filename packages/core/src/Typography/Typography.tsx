import styled from "@emotion/styled";
import { themeVars, themeVariant } from "theme";

type TypographyVariants =
  | "display"
  | "title1"
  | "title2"
  | "title3"
  | "title4"
  | "body"
  | "label"
  | "caption1"
  | "caption2";

const TypographyMap = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subheading1: "h6",
  subheading2: "h6",
  body1: "p",
  body2: "p",
} as const;

export interface TypographyProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  as?: keyof typeof TypographyMap;
  variant?: TypographyVariants;
}

const Typography: React.FC<TypographyProps> = ({
  children,
  as = "body1",
  variant = "body",
}) => {
  const StyledTypography = styled.span<{ variant: TypographyVariants }>(
    {},
    themeVariant({
      variants: {
        display: {
          fontSize: themeVars.fontSizes["4xl"],
          lineHeight: themeVars.lineHeights[6],
        },
        title1: {
          fontSize: themeVars.fontSizes["3xl"],
          lineHeight: themeVars.lineHeights[5],
        },
        title2: {
          fontSize: themeVars.fontSizes["2xl"],
          lineHeight: themeVars.lineHeights[4],
        },
        title3: {
          fontSize: themeVars.fontSizes.xl,
          lineHeight: themeVars.lineHeights[3],
        },
        title4: {
          fontSize: themeVars.fontSizes.lg,
          lineHeight: themeVars.lineHeights[3],
        },
        body: {
          fontSize: themeVars.fontSizes.base,
          lineHeight: themeVars.lineHeights[2],
        },
        label: {
          fontSize: themeVars.fontSizes.base,
          lineHeight: themeVars.lineHeights[2],
        },
        caption1: {
          fontSize: themeVars.fontSizes.sm,
          lineHeight: themeVars.lineHeights[1],
        },
        caption2: {
          fontSize: themeVars.fontSizes.xs,
          lineHeight: themeVars.lineHeights[1],
        },
      },
    })
  );

  const Component = TypographyMap[as];

  return (
    <StyledTypography as={Component} variant={variant}>
      {children}
    </StyledTypography>
  );
};

export default Typography;
