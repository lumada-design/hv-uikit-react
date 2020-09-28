import { CardContentProps, StandardProps } from "@material-ui/core";

export type HvCardContentClassKey = "content";

export type HvCardContentProps = StandardProps<CardContentProps, HvCardContentClassKey>;

export default function HvCardContent(props: HvCardContentProps): JSX.Element | null;
