import { BoxProps, StandardProps } from "@material-ui/core";

export type HvPanelClassKey = "root";

export type HvPanelProps = StandardProps<BoxProps, HvPanelClassKey>;

export default function HvPanel(props: HvPanelProps): JSX.Element | null;
