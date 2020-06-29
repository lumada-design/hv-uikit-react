import { StandardProps } from "@material-ui/core";
import { HvFormStatus } from "../FormElement";

export interface HvInputAdornmentProps
extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvInputAdornmentClassKey> {
  /**
   * The icon to be added into the input.
   */
  icon: React.ReactNode;
  /**
   * When the input aligment should be displayed
   */
  showWhen?: HvFormStatus;
  /**
   * If the icon display is influenced by an external actor, i.e. hover on input
   */
  isShown?: boolean;
}

export type HvInputAdornmentClassKey =
  | "icon"
  | "adornmentButton"
  | "hideIcon"

export default function HvInputAdornment(props: HvInputAdornmentProps): JSX.Element | null;
