import { CardMediaProps, StandardProps } from "@material-ui/core";

export type HvCardMediaClassKey = "root" | "media";

export type HvCardMediaProps = StandardProps<CardMediaProps, HvCardMediaClassKey>;

export default function HvCardMedia(props: HvCardMediaProps): JSX.Element | null;
