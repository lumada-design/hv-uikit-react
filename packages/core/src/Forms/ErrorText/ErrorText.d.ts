import { StandardProps } from "@material-ui/core";

export interface HvErrorTextProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvInfoTextClassKey> {
  /**
   * Describes the current state of the error text.
   */
  errorTextStatus?: string;
  /**
   * The text to be shown by the error text.
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

export type HvInfoTextClassKey = "errorText" | "showText" | "errorTextDisabled" | "@global";

export default function HvErrorText(props: HvErrorTextProps): JSX.Element | null;
