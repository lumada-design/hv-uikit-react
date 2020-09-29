import * as React from "react";
import { StandardProps } from "@material-ui/core";
import { PopperProps } from "@material-ui/core/Popper";
import { ListLabelsProp, ListValueProp } from "../List";

export interface DropDownLabelsProp extends ListLabelsProp {
  /**
   * Title for the dropdown.
   */
  title?: string;
  /**
   * The default when there are no options available.
   */
  select?: string;
  /**
   * Cancel button label.
   */
  cancelLabel?: string;
  /**
   * Apply button label.
   */
  applyLabel?: string;
  /**
   * The label used preceding the multiselection count.
   */
  multiSelectionAction?: string;
  // TODO: deprecate in favour of List's selectionConjunction ?
  /**
   * The label used in the middle of the multiselection count.
   */
  multiSelectionConjunction?: string;
}

export type HvDropdownClassKey =
  | "root"
  | "dropdown"
  | "label"
  | "arrow"
  | "truncate"
  | "selectionDisabled"
  | "rootList";

export interface HvDropdownProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvDropdownClassKey, "onChange"> {
  /**
   * The list to be rendered by the dropdown.
   */
  values?: ListValueProp[];
  /**
   * If `true` the dropdown is multiselect, if `false` the dropdown is single select.
   */
  multiSelect?: boolean;
  /**
   * If `true` the dropdown is rendered with a search bar, if `false` there won't be a search bar.
   */
  showSearch?: boolean;
  /**
   * If `true` the dropdown is disabled unable to be interacted, if `false` it is enabled.
   */
  disabled?: boolean;
  /**
   * If `true` the dropdown starts opened if `false` it starts closed.
   */
  expanded?: boolean;
  /**
   * If 'true' the dropdown will notify on the first render.
   */
  notifyChangesOnFirstRender?: boolean;
  /**
   * An object containing all the labels for the dropdown.
   */
  labels?: DropDownLabelsProp;
  /**
   * If `true` the dropdown will show tooltips when user mouseenter text in list
   */
  hasTooltips?: boolean;
  /**
   * Disable the portal behavior.
   * The children stay within it's parent DOM hierarchy.
   */
  disablePortal?: boolean;
  /**
   * If `true`, selection can be toggled when single selection.
   */
  singleSelectionToggle?: boolean;
  /**
   * Placement of the dropdown.
   */
  placement?: "left" | "right";
  /**
   * A function to be executed whenever a item is selected in the dropdown, the function receives the selected item(s).
   */
  onChange?: (selected: ListValueProp | ListValueProp[] | undefined) => void;
  /**
   * Properties passed to the underlying Popper component
   */
  popperProps?: Partial<PopperProps>;
}

export default function HvDropdown(props: HvDropdownProps): JSX.Element | null;
