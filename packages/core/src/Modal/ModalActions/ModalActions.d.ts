import { DialogActionsProps, StandardProps } from "@material-ui/core";

export type HvModalActionsProps = StandardProps<DialogActionsProps, HvModalActionsClassKey>;

export type HvModalActionsClassKey = "root" | "spacing";

export default function HvModalActions(props: HvModalActionsProps): JSX.Element | null;
