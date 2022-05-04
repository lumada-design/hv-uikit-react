import { StandardProps } from "@mui/material";

export type HvCharCounterClassKey = "root" | "counterDisabled" | "overloaded" | "gutter";

export interface HvCharCounterProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvCharCounterClassKey> {
  /**
   * The string that separtes the current char quantity from the max quantity.
   */
  separator: string;
  /**
   * The maximum allowed length of the characters.
   */
  maxCharQuantity: number;
  /**
   * The current char quantity to be rendered.
   */
  currentCharQuantity?: number;
  /**
   * If `true` the input is disabled.
   */
  disabled?: boolean;
  /**
   * If `true` the info message won't have margins.
   */
  disableGutter?: boolean;
}

export default function HvCharCounter(props: HvCharCounterProps): JSX.Element | null;
