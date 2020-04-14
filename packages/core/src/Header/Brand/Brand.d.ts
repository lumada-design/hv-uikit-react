import * as React from "react";
import { StandardProps } from "@material-ui/core";

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

export type HvHeaderBrandClassKey = "root" | "separator";

export default function HvHeaderBrand(props: HvHeaderBrandProps): JSX.Element | null;
