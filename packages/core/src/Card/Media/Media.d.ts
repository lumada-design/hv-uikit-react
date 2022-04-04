import { CardMediaProps, StandardProps } from "@material-ui/core";

export type HvCardMediaClassKey = "root" | "media";

export type HvCardMediaProps = StandardProps<CardMediaProps<"div", { component?: "div" }>, HvCardMediaClassKey>;

export default function HvCardMedia(props: HvCardMediaProps): JSX.Element | null;
