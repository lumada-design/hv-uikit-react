import { DialogProps, StandardProps } from "@material-ui/core";

export type HvDialogClassKey = "root" | "background" | "paper" | "closeButton";

export interface HvDialogProps extends StandardProps<DialogProps, HvDialogClassKey> {
  /**
   * Element id that should be focus when the dialog opens.
   */
  firstFocusable?: string;
  /**
   * Title for the button close.
   */
  buttonTitle?: string;
  /**
   * Set the dialog to fullscreen mode.
   */
  fullscreen?: boolean;
}

export default function HvDialog(props: HvDialogProps): JSX.Element | null;
