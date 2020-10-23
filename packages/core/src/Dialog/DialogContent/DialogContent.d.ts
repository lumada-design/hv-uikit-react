import { DialogContentProps, StandardProps } from "@material-ui/core";

export type HvDialogContentClassKey = "root" | "textContent";

export type HvDialogContentProps = StandardProps<DialogContentProps, HvDialogContentClassKey>;

export default function HvDialogContent(props: HvDialogContentProps): JSX.Element | null;
