import * as React from "react";
import { StandardProps } from "@material-ui/core";

export type HvCarouselClassKey = "root" | "step" | "stepper" | "stepperCount";

export interface HvCarouselProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvCarouselClassKey> {
  /**
   * The array of images/videos to show.
   */
  value: {
    name?: string;
    url: string;
    type: "video" | "image";
    props?: Record<string, unknown>;
  }[];
}

export default function HvCarousel(props: HvCarouselProps): JSX.Element | null;
