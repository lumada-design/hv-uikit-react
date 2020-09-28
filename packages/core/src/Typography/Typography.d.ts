import * as React from "react";
import { StandardProps } from "@material-ui/core";

export type HvTypographyClassKey =
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
  | "highlightText"
  | "normalText"
  | "placeholderText"
  | "link"
  | "disabledText"
  | "selectedNavText"
  | "vizText"
  | "vizTextDisabled"
  | "xsInlineLink";

export interface HvTypographyProps
  extends StandardProps<React.HTMLAttributes<HTMLSpanElement>, HvTypographyClassKey> {
  /**
   * The selected typography.
   */
  variant?:
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
    | "highlightText"
    | "normalText"
    | "placeholderText"
    | "link"
    | "disabledText"
    | "selectedNavText"
    | "vizText"
    | "vizTextDisabled"
    | "xsInlineLink";

  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   * By default, it maps the variant to a good default headline component.
   */
  component?: React.ElementType;

  /**
   * If `true`, the text will have a bottom margin.
   */
  paragraph?: boolean;

  /**
   * If `true`, the text will not wrap, but instead will truncate with a text overflow ellipsis.
   *
   * Note that text overflow can only happen with block or inline-block level elements
   * (the element needs to have a width in order to overflow).
   */
  noWrap: boolean;
}

export default function HvTypography(props: HvTypographyProps): JSX.Element | null;
