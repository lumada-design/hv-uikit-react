import * as React from "react";
import { StandardProps } from "@material-ui/core";
import { HvActionsCommonProps } from "../Actions";

export interface HvBulkActionsLabelsProp {
  /**
   * Label applied to the Select All when no item is selected.
   */
  selectAll?: string;
  /**
   * Label applied to the Select All across all pages.
   */
  selectAllPages?: string;
  /**
   * Label applied to the Select All across all pages when all elements are selected.
   */
  deselectAllPages: string;
}

export interface HvBulkActionsProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvBulkActionsClassKey>,
    HvActionsCommonProps {
  /**
   * Labels
   */
  labels?: HvBulkActionsLabelsProp;
  /**
   * Custom label for select all checkbox
   */
  selectAllLabel?: React.ReactNode;
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
}

export type HvBulkActionsClassKey =
  | "root"
  | "editMode"
  | "actions"
  | "selectAllContainer"
  | "selectAll"
  | "selectAllPages";

export default function HvBulkActions(props: HvBulkActionsProps): JSX.Element | null;
