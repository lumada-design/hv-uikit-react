import { CardMediaProps, StandardProps } from "@mui/material";

export type HvCardMediaClassKey = "root" | "media";

export type HvCardMediaProps = StandardProps<CardMediaProps<"div", { component?: "div" }>, HvCardMediaClassKey>;

export default function HvCardMedia(props: HvCardMediaProps): JSX.Element | null;
