import { BoxProps, StandardProps } from "@material-ui/core";

export type HvPanelProps = StandardProps<BoxProps, HvPanelClassKey>;

export type HvPanelClassKey = "root";

export default function HvPanel(props: HvPanelProps): JSX.Element | null;
