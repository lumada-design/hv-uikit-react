import { HvDropdown, HvDropdownProps } from "../../Dropdown";

export interface HvDropdownColumnCellProp extends HvDropdownProps<false> {
  /** Extra props to be passed onto the dropdown. @deprecated pass props directly */
  dropdownProps?: HvDropdownProps<false>;
}

export const HvDropdownColumnCell = ({
  dropdownProps,
  ...others
}: HvDropdownColumnCellProp) => {
  return <HvDropdown {...dropdownProps} {...others} />;
};
