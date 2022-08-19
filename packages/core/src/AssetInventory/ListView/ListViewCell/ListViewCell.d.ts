import * as React from "react";
import { StandardProps } from "@material-ui/core";
import { HvAtmosphereColorKeys, HvSemanticColorKeys } from "../../..";

export type HvListViewCellClassKey = "root" | "semanticBar";

export interface HvListViewCellProps
  extends StandardProps<React.HTMLAttributes<HTMLTableCellElement>, HvListViewCellClassKey> {
  /**
   * Alignment of the cell correspond to the html attribute.
   */
  align?: string;
  /**
   * Used to identify the cell and apply the correct column styling
   * this value is injected by list view row.
   */
  columnIndex?: number;
  /**
   *  The border color of the cell. Must be one of palette semantic colors.
   */
  semantic?: "sema0" | HvSemanticColorKeys | HvAtmosphereColorKeys;
}

export default function HvListViewCell(props: HvListViewCellProps): JSX.Element | null;
