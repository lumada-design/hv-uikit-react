import { StandardProps } from "@material-ui/core";

export interface HvInfoMessageProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvInfoMessageClassKey> {
  /**
   * The text to be shown by the info text.
   */
  label?: React.ReactNode;
  /**
   * If ´true´ the input is disabled.
   */
  disabled?: boolean;
}

export type HvInfoMessageClassKey = "root" | "infoDisabled" | "gutter";

export default function HvInfoMessage(props: HvInfoMessageProps): JSX.Element | null;
