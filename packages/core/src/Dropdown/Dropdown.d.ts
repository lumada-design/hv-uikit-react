import * as React from "react";
import { StandardProps } from "@material-ui/core";
import { ListValueProp, ListLabelsProp } from "../List";

export interface DropDownLabelsProp extends ListLabelsProp {
  title: string;
  select: string;
  cancelLabel: string;
  applyLabel: string;
  multiSelectionAction: string;

  // inherits: selectAll, selectionConjunction;
  //selectAll: string;
  // TODO: deprecate in favour of List's selectionConjunction ?
  multiSelectionConjunction: string;
}

export interface HvDropdownProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvDropdownClassKey> {
  /**
   * The list to be rendered by the dropdown.
   */
  values?: ListValueProp[];
  /**
   * If ´true´ the dropdown is multiselect, if ´false´ the dropdown is single select.
   */
  multiSelect?: boolean;
  /**
   * If ´true´ the dropdown is rendered with a search bar, if ´false´ there won't be a search bar.
   */
  showSearch?: boolean;
  /**
   * If ´true´ the dropdown is disabled unable to be interacted, if ´false´ it is enabled.
   */
  disabled?: boolean;
  /**
   * If ´true´ the dropdown starts opened if ´false´ it starts closed.
   */
  expanded?: boolean;
  /**
   * If 'true' the dropdown will notify on the first render.
   */
  notifyChangesOnFirstRender?: boolean;
  /**
   * An object containing all the labels for the dropdown.
   *
   * - title: Label title for the dropdown.
   * - select: The default when there are no options available.
   * - selectAll: The label used for the All checkbox action.
   * - cancelLabel: The label used for the cancel button.
   * - applyLabel: The label used for the apply button.
   * - multiSelectionAction: The label used preceding the multiselection count.
   * - multiSelectionConjunction: The label used in the middle of the multiselection count.
   */
  labels?: DropDownLabelsProp;
  /**
   * If ´true´ and none element selected,
   * single select has default (first) label selected.
   */
  selectDefault?: boolean;
  /**
   * If ´true´ the dropdown will show tooltips when user mouseenter text in list
   */
  hasTooltips?: boolean;
  /**
   * Disable the portal behavior.
   * The children stay within it's parent DOM hierarchy.
   */
  disablePortal?: boolean;
  /**
   * If ´true´, selection can be toggled when single selection.
   */
  singleSelectionToggle?: boolean;
}

export type HvDropdownClassKey =
  | "root"
  | "rootOpen"
  | "rootDisabled"
  | "label"
  | "header"
  | "selection"
  | "arrow"
  | "headerDisabled"
  | "icon"
  | "truncate"
  | "selectionDisabled";

export default function HvDropdown(props: HvDropdownProps): JSX.Element | null;
