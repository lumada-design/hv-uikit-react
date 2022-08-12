import { HvDropdownProps, ListValueProp } from "../../..";

export interface HvDropdownColumnCellProps {
  /**
   * values to render in the dropdown.
   */
  values: ListValueProp[];
  /**
   * Placeholder text for when the dropdown is empty.
   */
  placeholder: string;
  /**
   * The whether the dropdown is disabled.
   */
  disabled: boolean;
  /**
   * Function called when there is change on the dropdown.
   */
  onChange?: (value: ListValueProp) => void;
  /**
   * Extra props to be passed onto the dropdown.
   */
  dropdownProps?: HvDropdownProps;
}
