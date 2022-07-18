import * as React from "react";
import { StandardProps } from "@mui/material";

export type Semantic =
  | "sema1"
  | "sema2"
  | "sema3"
  | "sema4"
  | "sema5"
  | "sema6"
  | "sema7"
  | "sema8"
  | "sema9"
  | "sema10"
  | "sema11"
  | "sema12"
  | "sema13"
  | "sema14"
  | "sema15"
  | "sema16"
  | "sema17"
  | "sema18"
  | "sema19"
  | "sema20";

  export type HvTagClassKey =
  | "label"
  | "square"
  | "round"
  | "deleteIconSmall"
  | "disabled";



  export interface HvTagsProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvTagClassKey, "color"> {
  /**
   * An array of strings representing the colors to override in the icon.
   * Each element inside the array will override a diferent color.
   */
   color?: string | string[];

  /**
   * Custom text to show in place of count.
   * Note showCount and label are mutually exclusive.
   * showCount is ignored when label is specified at the same time.
   */
   label?: string;
  /**
   * Sets one of the standard semantic palette colors of the icon
   */
  semantic?: Semantic;


  shape: string,

  /**
 * The disabled property of the Tag.
 */
   disabled: string,

/**
 * The cancel icon is shown based on this property
 */
 showCancelIcon:boolean,

}

export default function HvTag(props: HvTagsProps): JSX.Element | null;
