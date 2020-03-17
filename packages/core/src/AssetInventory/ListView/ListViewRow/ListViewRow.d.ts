import * as React from "react";
import { StandardProps } from "@material-ui/core";
import { ListViewConfiguration } from "..";

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
   * ´true´ if the row should have a checkbox in the the left part to be selectable ´false´ if it is not required.
   */
  isSelectable?: boolean;
  /**
   *  The value the checkbox in the in the left part of the row will return when selected.
   */
  checkboxValue?: string;
  /**
   *  ´true´ if the checkbox is selected or ´false´ if not selected.
   *
   *  Note: if this value is specified the checkbox becomes a controlled component and it's state should be set from outside.
   */
  checkboxSelected?: boolean;
  /**
   *  ´true´ if the checkbox should use the intermediate state when selected ´false´ if not.
   */
  checkboxIndeterminate?: boolean;
  /**
   *  The border to the right of the checkbox
   */
  checkboxSemantic?:
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

type HvListViewRowClassKey = "root";

export default function HvListViewRow(props: HvListViewRowProps): JSX.Element | null;
