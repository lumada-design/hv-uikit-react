import { HvDropdown, HvDropdownProps } from "@hitachivantara/uikit-react-core";

export const Main = (props: HvDropdownProps) => (
  <HvDropdown
    {...props}
    label="Select values"
    values={[
      { label: "value 1" },
      { label: "value 2", selected: true },
      { label: "value 3" },
      { label: "value 4" },
    ]}
  />
);
