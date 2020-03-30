import React from "react";
import { CardContentProps, StandardProps } from "@material-ui/core";

export interface HvCardContentProps extends StandardProps<CardContentProps, HvCardContentClassKey> {}

export type HvCardContentClassKey = "content";

export default function HvCardContent(props: HvCardContentProps): JSX.Element | null;
