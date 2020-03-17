import { DialogProps, StandardProps } from "@material-ui/core";

export interface HvModalProps extends StandardProps<DialogProps, HvModalClassKey> {
  /**
   * Element id that should be focus when the modal opens.
   */
  firstFocusable?: string;
  /**
   * Title for the button close.
   */
  buttonTitle?: string;
}

export type HvModalClassKey = "root" | "background" | "paper" | "closeButton";

export default function HvModal(props: HvModalProps): JSX.Element | null;
