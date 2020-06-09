import { StandardProps } from "@material-ui/core";

export interface HvInfoTextInputProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvInfoTextClassKey> {
  /**
   * Id to be applied to the root node.
   */
  id?: string;
  /**
   * The text to be shown by the info text.
   */
  label?: string;
  /**
   * If ´true´ the input is disabled.
   */
  disabled?: boolean;
  children?: React.ReactNode;
}

export type HvInfoTextClassKey = "root" | "labelDisabled" | "childGutter";

export default function HvInfoText(props: HvInfoTextInputProps): JSX.Element | null;
