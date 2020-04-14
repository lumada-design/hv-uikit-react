import { StandardProps, TabProps } from "@material-ui/core";

export interface HvTabProps extends StandardProps<TabProps, HvTabClassKey> {}

export type HvTabClassKey = "root" | "labelContainer" | "selected" | "disabled";

export default function HvTab(props: HvTabProps): JSX.Element | null;
