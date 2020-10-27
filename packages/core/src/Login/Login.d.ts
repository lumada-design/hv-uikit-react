import * as React from "react";
import { StandardProps } from "@material-ui/core";

export type HvLoginClassKey = "container" | "item" | "formContainer";

export interface HvLoginProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvLoginClassKey> {
  /**
   *  The path for the custom background image.
   */
  customBackground?: string;
}

export default function HvLogin(props: HvLoginProps): JSX.Element | null;
