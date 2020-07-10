import { StandardProps, BoxProps } from "@material-ui/core";

export type HvBoxProps = StandardProps<BoxProps, HvBoxClassKey>;

export type HvBoxClassKey = "root";

export default function HvBox(props: HvBoxProps): JSX.Element | null;
