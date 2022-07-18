import * as React from "react";
import { StandardProps } from "@mui/material";

export type HvLoginClassKey = "container" | "item" | "formContainer";

export interface HvLoginProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvLoginClassKey> {
  /**
   *  The path for the background image.
   */
  background?: string;
}

export default function HvLogin(props: HvLoginProps): JSX.Element | null;
