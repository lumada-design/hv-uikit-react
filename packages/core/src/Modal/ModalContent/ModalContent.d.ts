import { DialogContentProps, StandardProps } from "@material-ui/core";

export interface HvModalContentProps
  extends StandardProps<DialogContentProps, HvModalContentClassKey> {}

export type HvModalContentClassKey = "root" | "textContent";

export default function HvModalContent(props: HvModalContentProps): JSX.Element | null;
