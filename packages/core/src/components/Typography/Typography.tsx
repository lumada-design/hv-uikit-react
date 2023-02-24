import { forwardRef, Ref, useMemo, CSSProperties } from "react";
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
  display: "h1",
  title1: "h1",
  title2: "h2",
  title3: "h3",
  title4: "h4",
  body: "p",
  label: "label",
  caption1: "p",
  caption2: "p",
  // LEGACY
  "5xlTitle": "h1",
  "4xlTitle": "h1",
  xxlTitle: "h1",
  lTitle: "h2",
  sTitle: "h4",
  xxsTitle: "h6",
  sectionTitle: "p",
  placeholderText: "p",
  link: "p",
  disabledText: "p",
  selectedNavText: "p",
  vizTextDisabled: "p",
  xsInlineLink: "p",
} as const;

const getStyledComponent = (c: any) =>
  styled(
    c,
    transientOptions
  )(
    ({
      $variant,
      $link = false,
      $disabled = false,
      $noWrap = false,
    }: {
      $variant: HvTypographyVariants | HvTypographyLegacyVariants;
      $link?: boolean;
      $disabled?: boolean;
      $noWrap?: boolean;
    }) => ({
      ...($variant === "display" && {
        ...(theme.typography.display as CSSProperties),
      }),
      ...($variant === "title1" && {
        ...(theme.typography.title1 as CSSProperties),
      }),
      ...($variant === "title2" && {
        ...(theme.typography.title2 as CSSProperties),
      }),
      ...($variant === "title3" && {
        ...(theme.typography.title3 as CSSProperties),
      }),
      ...($variant === "title4" && {
        ...(theme.typography.title4 as CSSProperties),
      }),
      ...($variant === "body" && {
        ...(theme.typography.body as CSSProperties),
      }),
      ...($variant === "label" && {
        ...(theme.typography.label as CSSProperties),
      }),
      ...($variant === "caption1" && {
        ...(theme.typography.caption1 as CSSProperties),
      }),
      ...($variant === "caption2" && {
        ...(theme.typography.caption2 as CSSProperties),
      }),
      // LEGACY
      ...($variant === "5xlTitle" && {
        ...(theme.typography["5xlTitle"] as CSSProperties),
      }),
      ...($variant === "4xlTitle" && {
        ...(theme.typography["4xlTitle"] as CSSProperties),
      }),
      ...($variant === "xxlTitle" && {
        ...(theme.typography.xxlTitle as CSSProperties),
      }),
      ...($variant === "lTitle" && {
        ...(theme.typography.lTitle as CSSProperties),
      }),
      ...($variant === "sTitle" && {
        ...(theme.typography.sTitle as CSSProperties),
      }),
      ...($variant === "xxsTitle" && {
        ...(theme.typography.xxsTitle as CSSProperties),
      }),
      ...($variant === "sectionTitle" && {
        ...(theme.typography.sectionTitle as CSSProperties),
        textTransform: "uppercase",
      }),
      ...($variant === "placeholderText" && {
        ...(theme.typography.placeholderText as CSSProperties),
      }),
      color: theme.colors.acce1,
      // ADDED PROPS
      ...($link && {
        color: theme.colors.acce2,
        textDecoration: "underline",
        cursor: "pointer",
      }),
      ...($disabled && {
        color: theme.colors.atmo5,
      }),
      ...($noWrap && {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }),
    })
  );

export type HvTypographyProps = HvBaseProps<HTMLElement, { disabled }> & {
  component?: React.ReactNode | React.ElementType;
  /** Use the variant prop to change the visual style of the Typography. */
  variant?: HvTypographyVariants | HvTypographyLegacyVariants;
  /** If `true` the typography will display the look of a link. */
  link?: boolean;
  /** If `true` the typography will display the look of a disabled state. */
  disabled?: boolean;
  /** If `true`, the text will have a bottom margin. */
  paragraph?: boolean;
  /**
   * If `true`, the text will not wrap, but instead will truncate with a text overflow ellipsis.
   *
   * Note that text overflow can only happen with block or inline-block level elements
   * (the element needs to have a width in order to overflow).
   */
  noWrap?: boolean;
};

/**
 * Typography component is used to render text and paragraphs within an interface.
 */
export const HvTypography = forwardRef(
  (props: HvTypographyProps, ref: Ref<HTMLDivElement>) => {
    const {
      children,
      className,
      component,
      variant = "body",
      link = false,
      disabled = false,
      noWrap = false,
      paragraph = false,
      ...others
    } = props;

    const mappedVariant = mapVariant(variant);

    const comp =
      component || (paragraph ? "p" : HvTypographyMap[mappedVariant] || "span");

    const StyledComponent = useMemo(
      () => getStyledComponent(comp || "p"),
      [comp]
    );

    return (
      <StyledComponent
        ref={ref}
        className={className}
        $variant={mappedVariant}
        $link={link}
        $disabled={disabled}
        $noWrap={noWrap}
        {...others}
      >
        {children}
      </StyledComponent>
    );
  }
);
