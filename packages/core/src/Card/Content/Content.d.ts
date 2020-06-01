import { CardContentProps, StandardProps } from "@material-ui/core";

export type HvCardContentProps = StandardProps<CardContentProps, HvCardContentClassKey>;

export type HvCardContentClassKey = "content";

export default function HvCardContent(props: HvCardContentProps): JSX.Element | null;
