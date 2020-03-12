import * as React from "react";
import { StandardProps } from "@material-ui/core";

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
   * Id to be applied to the root node this value is used to identify the checkbox clicks or actions.
   */
  id?: string;
  /**
   * Class names to be applied.
   */
  className?: string;
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: {
    /**
     * Styles applied to the assetinventorylistview root class.
     */
    root?: string;
  };
  /**
   *  The border color of the cell. Must be one of palette semantic colors.
   */
  semantic?:
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
  children: React.ReactNode;
}

type HvListViewCellClassKey = "root" | "semanticBar";

export default function HvListViewCell(props: HvListViewCellProps): JSX.Element | null;
