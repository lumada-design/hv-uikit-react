import * as React from "react";
import { StandardProps } from "@mui/material";

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
  semantic?:
    | "sema0"
    | "sema1"
    | "sema2"
    | "sema3"
    | "sema4"
    | "sema5"
    | "sema6"
    | "sema7"
    | "sema8"
    | "sema9"
    | "sema10"
    | "sema11"
    | "sema12"
    | "sema13"
    | "sema14"
    | "sema15"
    | "sema16"
    | "sema17"
    | "sema18"
    | "sema19"
    | "atmo1"
    | "atmo2"
    | "atmo3"
    | "atmo4"
    | "atmo5"
    | "atmo6";
}

export default function HvListViewCell(props: HvListViewCellProps): JSX.Element | null;
