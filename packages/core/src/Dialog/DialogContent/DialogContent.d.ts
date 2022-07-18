import { DialogContentProps, StandardProps } from "@mui/material";

export type HvDialogContentClassKey = "root" | "textContent";

export interface HvDialogContentProps
  extends StandardProps<DialogContentProps, HvDialogContentClassKey> {
  /**
   * Content should be indented in relationship to the Dialog title.
   */
  indentContent?: boolean;
}

export default function HvDialogContent(props: HvDialogContentProps): JSX.Element | null;
