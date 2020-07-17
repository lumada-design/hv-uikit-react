import { StandardProps } from "@material-ui/core";

export interface HvHelperTextProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvHelperTextClassKey> {
  /**
   * The text to be shown by the helper text as a notification for the user.
   */
  notification?: string;
  /**
   * If ´true´ the input is disabled.
   */
  disabled?: boolean;
}

export type HvHelperTextClassKey = "helperText" | "showText" | "helperDisabled" | "@global";

export default function HvHelperText(props: HvHelperTextProps): JSX.Element | null;
