import * as React from "react";
import { StandardProps } from "@material-ui/core";

export interface ListValueProp {
  id?: string;
  label: React.ReactNode;
  searchValue?: string;
  selected?: boolean;
  disabled?: boolean;
  isHidden?: boolean;
  icon?:
    | React.ReactNode
    | ((params: { isDisabled?: boolean; isSelected?: boolean }) => React.ReactNode);
  showNavIcon?: boolean;
  path?: string;
  params?: object;
}

export interface ListLabelsProp {
  selectAll?: string;
  selectionConjunction?: string;
}

export type HvListClassKey =
  | "root"
  | "virtualizedRoot"
  | "selectorRoot"
  | "selectorContainer"
  | "box"
  | "truncate"
  | "item"
  | "itemSelector"
  | "icon"
  | "focus"
  | "link"
  | "selectAllSelector";

export interface HvListProps
  extends StandardProps<React.HTMLAttributes<HTMLUListElement>, HvListClassKey> {
  /**
   * A list containing the elements to be rendered.
   *
   * - id: The id of the item.
   * - label: The label of the element to be rendered.
   * - searchValue: Text used when filtering the list. Used when label is a node.
   * - selected: The selection state of the element.
   * - disabled: The disabled state of the element.
   * - isHidden: Is item visible.
   * - icon: The icon.
   * - showNavIcon: If true renders the navigation icon on the right.
   * - path: The path to navigate to.
   */
  values: ListValueProp[];
  /**
   * If true renders a multi select list.
   */
  multiSelect?: boolean;
  /**
   * If true renders select all option for multi selection lists with selectors.
   * note: It will only be rendered if multiSelect and useSelector props are set to true.
   */
  showSelectAll?: boolean;
  /**
   * An object containing all the labels for the dropdown.
   *
   * - selectAll: The label used for the All checkbox action.
   * - selectionConjunction: The label used in the middle of the multiselection count.
   */
  labels?: ListLabelsProp;
  /**
   * If true renders list items with radio or checkbox selectors.
   */
  useSelector?: boolean;
  /**
   * If `true` the list items will show the selection state.
   */
  selectable?: boolean;
  /**
   * If `true`, selection can be toggled when single selection.
   */
  singleSelectionToggle?: boolean;
  /**
   * If `true` the list will be rendered without vertical spacing.
   */
  condensed?: boolean;
  /**
   * If `true` the dropdown will show tooltips when user mouseenter text in list
   */
  hasTooltips?: boolean;
  /**
   * Experimental. Height of the dropdown, in case you want to control it from a prop. Styles can also be used through dropdownListContainer class. Required in case virtualized is used
   */
  height?: number;
  /**
   * Experimental. Uses dropdown in a virtualized form, where not all options are rendered initially. Good for use cases with a lot of options.
   */
  virtualized?: boolean;
}

export default function HvList(props: HvListProps): JSX.Element | null;
