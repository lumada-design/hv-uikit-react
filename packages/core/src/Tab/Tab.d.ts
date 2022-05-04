import { StandardProps, TabProps } from "@mui/material";

export type HvTabClassKey = "root" | "labelContainer" | "selected" | "disabled";

export type HvTabProps = StandardProps<TabProps, HvTabClassKey>;

export default function HvTab(props: HvTabProps): JSX.Element | null;
