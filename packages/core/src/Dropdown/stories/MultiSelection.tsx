import { HvDropdown, HvDropdownProps } from "@hitachivantara/uikit-react-core";

const values = [...Array(80).keys()].map((i) => ({
  label: `value ${i + 1}`,
  selected: i % 6 === 0,
}));

export const MultiSelection = (props: HvDropdownProps<boolean, any>) => (
  <HvDropdown
    multiSelect
    showSearch
    label="Multi Select with search"
    values={values}
    {...props}
  />
);
