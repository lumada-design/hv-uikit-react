import { DialogActionsProps, StandardProps } from "@material-ui/core";

export type HvModalActionsClassKey = "root" | "spacing";

export type HvModalActionsProps = StandardProps<DialogActionsProps, HvModalActionsClassKey>;

export default function HvModalActions(props: HvModalActionsProps): JSX.Element | null;
