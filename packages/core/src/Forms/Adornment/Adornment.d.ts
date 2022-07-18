import { StandardProps } from "@mui/material";
import { HvFormStatus } from "../FormElement";

export type HvAdornmentClassKey =
  | "root"
  | "icon"
  | "adornment"
  | "adornmentIcon"
  | "adornmentButton"
  | "hideIcon"

export interface HvAdornmentProps
extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvAdornmentClassKey> {
  /**
   * The icon to be added into the input.
   */
  icon: React.ReactNode;
  /**
   * When the input aligment should be displayed
   */
  showWhen?: HvFormStatus;
  /**
   * If this property is defined the adornment visibility will be exclusively controlled by this value.
   */
  isVisible?: boolean;
}

export default function HvAdornment(props: HvAdornmentProps): JSX.Element | null;
