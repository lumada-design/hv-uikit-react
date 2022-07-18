import * as React from "react";
import { StandardProps } from "@mui/material";
import { HvActionsGenericCommonProps } from "../ActionsGeneric";
import { HvCheckBoxProps } from "..";

export type HvBulkActionsClassKey =
  | "root"
  | "semantic"
  | "actions"
  | "selectAllContainer"
  | "selectAll"
  | "selectAllPages";

export interface HvBulkActionsProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvBulkActionsClassKey>,
    HvActionsGenericCommonProps {
  /**
   * Custom label for select all checkbox
   */
  selectAllLabel?: React.ReactNode;
  /**
   * Custom label for select all pages button
   */
  selectAllPagesLabel?: React.ReactNode;
  /**
   * Whether select all pages element should be visible
   */
  showSelectAllPages?: boolean;
  /**
   * The total number of elements
   */
  numTotal?: number;
  /**
   * The number of elements currently selected
   */
  numSelected?: number;
  /**
   * Function called when the "select all" Checkbox is toggled.
   */
  onSelectAll?: (event: React.MouseEvent) => void;
  /**
   * Function called when the "select all pages" Button is clicked toggled.
   */
  onSelectAllPages?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  /**
   *  Whether actions should be all disabled
   */
  actionsDisabled?: boolean;
  /**
   * Whether the bulk actions should use the semantic styles when there are selected elements.
   */
  semantic?: boolean;
  /**
   * Properties to be passed onto the checkbox component, the values of the object are equivalent to the
   * HvCheckbox API.
   */
  checkboxProps?: HvCheckBoxProps;
}

export default function HvBulkActions(props: HvBulkActionsProps): JSX.Element | null;
