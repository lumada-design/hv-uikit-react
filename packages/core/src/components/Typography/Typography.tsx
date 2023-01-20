import { forwardRef, Ref, ElementType, useMemo } from "react";
import { isString } from "lodash";
import { HvBaseProps } from "../../types";
import { styled } from "@mui/system";
import { transientOptions } from "utils/transientOptions";
import { theme } from "@hitachivantara/uikit-styles";

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
  label: "label",
} as const;

const getStyledComponent = (c: any) =>
  styled(
    c,
    transientOptions
  )(
    ({
      variant,
      $link = false,
    }: {
      variant: HvTypographyVariants;
      $link?: boolean;
    }) => ({
      color: theme.colors.acce1,
      ...($link && {
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

export type HvTypographyProps = HvBaseProps & {
  as?: keyof typeof HvTypographyMap | ElementType;
  /** Use the variant prop to change the visual style of the Typography. */
  variant?: HvTypographyVariants;
  link?: boolean;
  className?: string;
  children: React.ReactNode;
  htmlFor?: string;
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

    const component = isString(as) ? HvTypographyMap[as] : as;
    const StyledComponent = useMemo(
      () => getStyledComponent(component),
      [component]
    );

    return (
      <StyledComponent
        ref={ref}
        className={className}
        variant={variant}
        $link={link}
        {...others}
      >
        {children}
      </StyledComponent>
    );
  }
);
