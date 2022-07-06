import { StandardProps } from "@material-ui/core";
import { PopperProps } from "@material-ui/core/Popper";
import { ListLabelsProp, ListValueProp, HvListProps } from "../List";
import { HvFormElementProps, HvBaseDropdownProps } from "..";

export interface DropDownLabelsProp extends ListLabelsProp {
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
  | "labelContainer"
  | "label"
  | "description"
  | "dropdown"
  | "arrow"
  | "placeholder"
  | "selectionDisabled"
  | "rootList"
  | "dropdownHeader"
  | "dropdownHeaderInvalid"
  | "dropdownHeaderOpen"
  | "dropdownListContainer";

export interface HvDropdownProps
  extends StandardProps<HvFormElementProps, HvDropdownClassKey, "onChange"> {
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
   * When uncontrolled, defines the initial expanded state.
   */
  defaultExpanded?: boolean;
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
   * If `true` the dropdown width depends size of content if `false` the width depends on the header size.
   * Defaults to `false`.
   */
  variableWidth?: boolean;
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
  /**
   * Extra props passed to the list
   */
  listProps?: Partial<HvListProps>;
  /**
   * Extra props passed to the base dropdown
   */
  baseDropdownProps?: Partial<HvBaseDropdownProps>;
  /**
   * Callback called when the user cancels the changes.
   *
   * Called when the cancel button is used and when the user clicks outside the open container.
   *
   * @param {object} event The event source of the callback.
   */
  onCancel?: (event: Event) => void;
  /**
   * Callback called when dropdown changes the expanded state.
   *
   * @param {object} event The event source of the callback.
   * @param {boolean} open If the dropdown new state is open (`true`) or closed (`false`).
   */
  onToggle?: (event: Event, open: boolean) => void;
  /**
   * Callback called when the user clicks outside the open container.
   *
   * @param {object} event The event source of the callback.
   */
  onClickOutside?: (event: Event) => void;
  /**
   * Experimental. Height of the dropdown, in case you want to control it from a prop. Styles can also be used through dropdownListContainer class. Required in case virtualized is used
   */
  height?: number;
  /**
   * Experimental. Uses dropdown in a virtualized form, where not all options are rendered initially. Good for use cases with a lot of options.
   */
  virtualized?: boolean;
}

export default function HvDropdown(props: HvDropdownProps): JSX.Element | null;
