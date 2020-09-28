import { StandardProps, AppBarProps } from "@material-ui/core";

export type HvHeaderClassKey = "root" | "header" | "backgroundColor";

export type HvHeaderProps = StandardProps<AppBarProps, HvHeaderClassKey>;

export default function HvHeader(props: HvHeaderProps): JSX.Element | null;
