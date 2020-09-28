import * as React from "react";
import { StandardProps } from "@material-ui/core";

export type HvLoginContainerClassKey = "container" | "item" | "formContainer";

export interface HvLoginContainerProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvLoginContainerClassKey> {
  /**
   *  The path for the custom background image.
   */
  customBackground?: string;
}

export default function HvLoginContainer(props: HvLoginContainerProps): JSX.Element | null;
