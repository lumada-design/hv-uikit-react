import { forwardRef, Ref, ElementType, useMemo, CSSProperties } from "react";
import { isString } from "lodash";
import { HvBaseProps } from "../../types";
import styled from "@emotion/styled";
import { transientOptions } from "utils/transientOptions";
import { theme } from "@hitachivantara/uikit-styles";
import { mapVariant } from "./utils";

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

export type HvTypographyLegacyVariants =
  | "5xlTitle"
  | "4xlTitle"
  | "3xlTitle"
  | "xxlTitle"
  | "xlTitle"
  | "lTitle"
  | "mTitle"
  | "sTitle"
  | "xsTitle"
  | "xxsTitle"
  | "sectionTitle"
  | "highlightText"
  | "normalText"
  | "placeholderText"
  | "link"
  | "disabledText"
  | "selectedNavText"
  | "vizText"
  | "vizTextDisabled"
  | "xsInlineLink";

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
  a: "a",
  button: "button",
  span: "span",
} as const;

const getStyledComponent = (c: any) =>
  styled(
    c,
    transientOptions
  )(
    ({
      variant,
      $link = false,
      $disabled = false,
    }: {
      variant: HvTypographyVariants | HvTypographyLegacyVariants;
      $link?: boolean;
      $disabled?: boolean;
    }) => ({
      ...(variant === "display" && {
        ...(theme.typography.display as CSSProperties),
      }),
      ...(variant === "title1" && {
        ...(theme.typography.title1 as CSSProperties),
      }),
      ...(variant === "title2" && {
        ...(theme.typography.title2 as CSSProperties),
      }),
      ...(variant === "title3" && {
        ...(theme.typography.title3 as CSSProperties),
      }),
      ...(variant === "title4" && {
        ...(theme.typography.title4 as CSSProperties),
      }),
      ...(variant === "body" && {
        ...(theme.typography.body as CSSProperties),
      }),
      ...(variant === "label" && {
        ...(theme.typography.label as CSSProperties),
      }),
      ...(variant === "caption1" && {
        ...(theme.typography.caption1 as CSSProperties),
      }),
      ...(variant === "caption2" && {
        ...(theme.typography.caption2 as CSSProperties),
      }),
      // LEGACY
      ...(variant === "5xlTitle" && {
        ...(theme.typography["5xlTitle"] as CSSProperties),
      }),
      ...(variant === "4xlTitle" && {
        ...(theme.typography["4xlTitle"] as CSSProperties),
      }),
      ...(variant === "xxlTitle" && {
        ...(theme.typography.xxlTitle as CSSProperties),
      }),
      ...(variant === "lTitle" && {
        ...(theme.typography.lTitle as CSSProperties),
      }),
      ...(variant === "sTitle" && {
        ...(theme.typography.sTitle as CSSProperties),
      }),
      ...(variant === "xxsTitle" && {
        ...(theme.typography.xxsTitle as CSSProperties),
      }),
      ...(variant === "sectionTitle" && {
        ...(theme.typography.sectionTitle as CSSProperties),
        textTransform: "uppercase",
      }),
      ...(variant === "placeholderText" && {
        ...(theme.typography.placeholderText as CSSProperties),
      }),
      color: theme.colors.acce1,
      // ADDED PROPS
      ...($link && {
        color: theme.colors.acce2,
        textDecoration: "underline",
      }),
      ...($disabled && {
        color: theme.colors.atmo5,
      }),
    })
  );

export type HvTypographyProps = HvBaseProps<HTMLElement, { disabled }> & {
  as?: keyof typeof HvTypographyMap | ElementType;
  /** Use the variant prop to change the visual style of the Typography. */
  variant?: HvTypographyVariants | HvTypographyLegacyVariants;
  link?: boolean;
  disabled?: boolean;
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
      disabled = false,
      className,
      ...others
    } = props;

    const mappedVariant = mapVariant(variant);

    const component = isString(as) ? HvTypographyMap[as] : as;
    const StyledComponent = useMemo(
      () => getStyledComponent(component || "div"),
      [component]
    );

    return (
      <StyledComponent
        ref={ref}
        className={className}
        variant={mappedVariant}
        $link={link}
        $disabled={disabled}
        {...others}
      >
        {children}
      </StyledComponent>
    );
  }
);
