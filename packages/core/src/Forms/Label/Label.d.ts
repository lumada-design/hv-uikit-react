import { StandardProps } from "@mui/material";

export type HvLabelClassKey = "root" | "labelDisabled" | "childGutter";

export interface HvLabelProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvLabelClassKey> {
  /**
   * The text to be shown by the label.
   */
  label?: React.ReactNode;
  /**
   * If `true` the label is displayed with a disabled style.
   */
  disabled?: boolean;
  /**
   * The id of the form element the label is bound to.
   */
  htmlFor?: string;
  /**
   * If `true`, the label will indicate that the form element is required (an `*` after the label text).
   */
  required?: boolean;
}

export default function HvLabel(props: HvLabelProps): JSX.Element | null;
