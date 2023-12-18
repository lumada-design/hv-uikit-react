import { HvDropdownProps, HvDropdown } from "@core/Dropdown";
import { HvListValue } from "@core/List";

export interface HvDropdownColumnCellProp {
  /** Values to render in the dropdown. */
  values: HvListValue[];
  /** Placeholder text for when the dropdown is empty. */
  placeholder: string;
  /** The whether the dropdown is disabled. */
  disabled: boolean;
  /** Function called when there is change on the dropdown. */
  onChange?: (value: HvListValue) => void;
  /** Extra props to be passed onto the dropdown. */
  dropdownProps?: HvDropdownProps;
}

export const HvDropdownColumnCell = ({
  values,
  disabled,
  onChange,
  placeholder,
  dropdownProps,
}: HvDropdownColumnCellProp): JSX.Element => {
  return (
    <HvDropdown
      onChange={(item) => {
        onChange?.(item as HvListValue);
      }}
      placeholder={placeholder}
      disabled={disabled}
      values={values}
      disablePortal
      {...dropdownProps}
    />
  );
};
