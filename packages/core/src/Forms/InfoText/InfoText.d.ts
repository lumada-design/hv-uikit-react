import { StandardProps } from "@material-ui/core";

export interface HvInfoTextInputProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvInfoTextClassKey> {
  /**
   * Describes the current state of the info text
   */
  infoTextStatus?: string;
  /**
   * Id to be applied to the root node.
   */
  id?: string;
  /**
   * The text to be shown by the info text.
   */
  label?: string;
  /**
   * When this text is to be rendered.
   */
  showWhen: "standBy" | "valid" | "invalid";
  /**
   * If ´true´ the input is disabled.
   */
  disabled?: boolean;
}

export type HvInfoTextClassKey = "infoText" | "showText" | "infoDisabled" | "@global";

export default function HvInfoText(props: HvInfoTextInputProps): JSX.Element | null;
