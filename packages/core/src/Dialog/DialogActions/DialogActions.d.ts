import { DialogActionsProps, StandardProps } from "@material-ui/core";

export type HvDialogActionsClassKey = "root" | "spacing";

export type HvDialogActionsProps = StandardProps<DialogActionsProps, HvDialogActionsClassKey>;

export default function HvDialogActions(props: HvDialogActionsProps): JSX.Element | null;
