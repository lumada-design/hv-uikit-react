import * as React from "react";
import { StandardProps } from "@material-ui/core";

export interface HvTypographyProps
  extends StandardProps<React.HTMLAttributes<HTMLSpanElement>, HvTypographyClassKey> {
  /**
   * Id to be applied to the root node.
   */
  id?: string;

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
    | "selectedText"
    | "disabledButtonText"
    | "placeholderText"
    | "inlineLink"
    | "selectedNavText"
    | "labelText"
    | "infoText"
    | "sLink"
    | "sText"
    | "vizText"
    | "disabledText";

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
   * The text to be set.
   * @required
   */
  children: React.ReactNode;
}

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
  | "highlightText"
  | "normalText"
  | "disabledButtonText"
  | "placeholderText"
  | "inlineLink"
  | "selectedNavText"
  | "labelText"
  | "infoText"
  | "sLink"
  | "sText"
  | "vizText"
  | "disabledText";

export default function HvTypography(props: HvTypographyProps): JSX.Element | null;
