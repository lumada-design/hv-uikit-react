import { StandardProps, AppBarProps } from "@material-ui/core";

export interface HvHeaderProps extends StandardProps<AppBarProps, HvHeaderClassKey> {}

export type HvHeaderClassKey = "root" | "header" | "backgroundColor";

export default function HvHeader(props: HvHeaderProps): JSX.Element | null;
