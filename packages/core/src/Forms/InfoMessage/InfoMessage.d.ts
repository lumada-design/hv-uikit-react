import { StandardProps } from "@mui/material";

export type HvInfoMessageClassKey = "root" | "infoDisabled" | "gutter";

export interface HvInfoMessageProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvInfoMessageClassKey> {
  /**
   * If `true` the input is disabled.
   */
  disabled?: boolean;
  /**
   * If `true` the info message won't have margins.
   */
  disableGutter?: boolean;
}

export default function HvInfoMessage(props: HvInfoMessageProps): JSX.Element | null;
