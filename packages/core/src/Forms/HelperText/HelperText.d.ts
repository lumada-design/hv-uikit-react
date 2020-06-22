import { StandardProps } from "@material-ui/core";

export interface HvInfoTextProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvInfoTextClassKey> {
  /**
   * The text to be shown by the helper text as a notification for the user.
   */
  notification?: string;
  /**
   * If ´true´ the input is disabled.
   */
  disabled?: boolean;
}

export type HvInfoTextClassKey = "helperText" | "showText" | "helperDisabled" | "@global";

export default function HvInfoText(props: HvInfoTextProps): JSX.Element | null;
