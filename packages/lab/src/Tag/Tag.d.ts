import * as React from "react";
import { StandardProps } from "@material-ui/core";
import { HvSemanticColorKeys } from "@hitachivantara/uikit-react-core";

export type Semantic = HvSemanticColorKeys;

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
