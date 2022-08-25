import * as React from "react";
import { StandardProps } from "@mui/material";

export type HvImageCarouselClassKey = "root";

export type HvImageCarouselProps = StandardProps<
  React.HTMLAttributes<HTMLDivElement>,
  HvImageCarouselClassKey
>;

export default function HvImageCarousel(props: HvImageCarouselProps): JSX.Element | null;
