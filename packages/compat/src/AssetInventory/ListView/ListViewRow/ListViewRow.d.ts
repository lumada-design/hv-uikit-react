import * as React from "react";
import { StandardProps } from "@mui/material";
import { HvCheckBoxProps } from "@hitachivantara/uikit-react-core";
import { ListViewConfiguration } from "..";

export type HvListViewRowClassKey = "root";

export interface HvListViewRowProps
  extends StandardProps<React.HTMLAttributes<HTMLTableSectionElement>, HvListViewRowClassKey> {
  /**
   * This value is provided by the asset inventory list view and contains necessary configurations for the columns.
   */
  viewConfiguration?: ListViewConfiguration;
  /**
   *  The function that will be executed when the row is selected.
   */
  onSelection?: (event: React.FormEvent<HTMLDivElement>) => void;
  /**
   * Whether the checkbox is selected or not.
   *
   * Note: if this value is specified the checkbox becomes a controlled component and it's state should be set from outside.
   */
  checked?: boolean;
  /**
   * Properties to be passed onto the checkbox component, the values of the object are equivalent to the
   * HvCheckbox API.
   */
  checkboxProps?: HvCheckBoxProps;
  /**
   *  The border to the right of the checkbox
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
}

export default function HvListViewRow(props: HvListViewRowProps): JSX.Element | null;
