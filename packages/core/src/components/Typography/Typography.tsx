import { forwardRef, Ref, ElementType } from "react";
import { isString } from "lodash";
import { HvBaseProps } from "../../types";
import { StyledTypography } from "./Typography.styles";

export type HvTypographyVariants =
  | "display"
  | "title1"
  | "title2"
  | "title3"
  | "title4"
  | "body"
  | "label"
  | "caption1"
  | "caption2";

const HvTypographyMap = {
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
  div: "div",
} as const;

export type HvTypographyProps = HvBaseProps & {
  as?: keyof typeof HvTypographyMap | ElementType;
  /** Use the variant prop to change the visual style of the Typography. */
  variant?: HvTypographyVariants;
  link?: boolean;
  className?: string;
  children: React.ReactNode;
};

/**
 * Typography component is used to render text and paragraphs within an interface.
 */
export const HvTypography = forwardRef(
  (props: HvTypographyProps, ref: Ref<HTMLDivElement>) => {
    const {
      children,
      as = "body1",
      variant = "body",
      link = false,
      className,
      ...others
    } = props;

    const Component = isString(as) ? HvTypographyMap[as] : as;

    return (
      <StyledTypography
        as={Component}
        ref={ref}
        className={className}
        variant={variant}
        $link={link}
        {...others}
      >
        {children}
      </StyledTypography>
    );
  }
);
