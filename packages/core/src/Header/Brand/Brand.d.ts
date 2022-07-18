import * as React from "react";
import { StandardProps } from "@mui/material";

export type HvHeaderBrandClassKey = "root" | "separator";

export interface HvHeaderBrandProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvHeaderBrandClassKey> {
  /**
   * The brand image node.
   */
  logo?: React.ReactNode;
  /**
   * The brand name string.
   */
  name?: string;
}

export default function HvHeaderBrand(props: HvHeaderBrandProps): JSX.Element | null;
