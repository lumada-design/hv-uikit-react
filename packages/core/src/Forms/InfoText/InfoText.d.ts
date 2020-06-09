import { StandardProps } from "@material-ui/core";

export interface HvInfoTextProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvInfoTextClassKey> {
  /**
   * Describes the current state of the info text
   */
  infoTextStatus?: string;
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

export default function HvInfoText(props: HvInfoTextProps): JSX.Element | null;
