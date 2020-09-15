// eslint-disable-next-line no-unused-vars
import React from "react";
import { HvDropdown } from "../..";

export default {
  title: "Tests/Dropdown",
  parameters: {
    docs: {
      disable: true,
      page: null
    }
  }
};

export const Expanded = () => (
  <HvDropdown
    id="dropdown12"
    expanded
    multiSelect
    showSearch
    labels={{ title: "Dropdown" }}
    values={[
      { label: "value 1" },
      { label: "value 2" },
      { label: "value 3", selected: true },
      { label: "value 4" },
      { label: "value 5 value 5 value 5 555555555555 value value 5" },
      { label: "value 6" },
      { label: "value 7" },
      { label: "value 8", selected: true },
      { label: "value 9", selected: true },
      { label: "value 10" },
      { label: "value 11" },
      { label: "value 12" }
    ]}
  />
);

Expanded.story = {
  parameters: {
    docs: {
      disable: true
    },
    v3: true
  }
};

export const SingleSelectedValue = () => (
  <HvDropdown
    id="dropdownSelected"
    onChange={item => console.log(item)}
    values={[
      { id: "id-1", label: "value 1" },
      { id: "id-2", label: "value 2" },
      { id: "id-3", label: "value 3", selected: true },
      { id: "id-4", label: "value 4" }
    ]}
  />
);

SingleSelectedValue.story = {
  parameters: {
    docs: {
      disable: true
    },
    v3: true
  }
};
