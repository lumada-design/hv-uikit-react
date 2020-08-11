import { CardMediaProps, StandardProps } from "@material-ui/core";

export type HvCardMediaProps = StandardProps<CardMediaProps, HvCardMediaClassKey>;

export type HvCardMediaClassKey = "root" | "media";

export default function HvCardMedia(props: HvCardMediaProps): JSX.Element | null;
