import { CSSProperties } from "react";
import { StyledTypography } from "./Typography.styles";

export type TypographyVariants =
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

export interface TypographyProps {
  as?: keyof typeof TypographyMap;
  /** Use the variant prop to change the visual style of the Typography. */
  variant?: TypographyVariants;
  css?: CSSProperties;
  className?: string;
  children: React.ReactNode;
}

/**
 * Typography component is used to render text and paragraphs within an interface.
 */
export const Typography = ({
  children,
  as = "body1",
  variant = "body",
  className,
}: TypographyProps) => {
  const Component = TypographyMap[as];

  return (
    <StyledTypography as={Component} className={className} variant={variant}>
      {children}
    </StyledTypography>
  );
};

if (process.env.NODE_ENV !== "production") {
  Typography.displayName = "Typography";
}
