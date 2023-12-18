import { HvDropdown } from "@hitachivantara/uikit-react-core";

export const MultiSelection = () => (
  <HvDropdown
    multiSelect
    showSearch
    label="Dropdown Title"
    values={[
      { label: "value 1" },
      { label: "value 2", selected: true },
      { label: "value 3" },
      { label: "value 4" },
    ]}
  />
);
