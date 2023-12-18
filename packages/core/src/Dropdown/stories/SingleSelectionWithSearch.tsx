import { HvDropdown } from "@hitachivantara/uikit-react-core";

export const SingleSelectionWithSearch = () => (
  <HvDropdown
    aria-label="With search"
    showSearch
    values={[
      { label: "value 1" },
      { label: "value 2", selected: true },
      { label: "value 3" },
      { label: "value 4" },
    ]}
  />
);
