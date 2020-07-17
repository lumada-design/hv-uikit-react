import { StandardProps } from "@material-ui/core";

export interface HvLabelProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvLabelClassKey> {
  /**
   * The text to be shown by the info text.
   */
  label?: React.ReactNode;
  /**
   * If ´true´ the input is disabled.
   */
  disabled?: boolean;
}

export type HvLabelClassKey = "root" | "labelDisabled" | "childGutter";

export default function HvLabel(props: HvLabelProps): JSX.Element | null;
