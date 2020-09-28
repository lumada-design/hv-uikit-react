import { StandardProps, TabsProps } from "@material-ui/core";

export type HvTabsClassKey = "root" | "flexContainer" | "indicator" | "scroller";

export type HvTabsProps = StandardProps<TabsProps, HvTabsClassKey>;

export default function HvTabs(props: HvTabsProps): JSX.Element | null;
