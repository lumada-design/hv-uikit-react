import React from "react";
import { HvDropdown } from "../..";

const countries = [
  { label: "Afghanistan", selected: true },
  { label: "Albania", selected: false },
  { label: "Algeria", selected: false },
  { label: "Andorra", selected: false },
  { label: "Angola", selected: false },
  { label: "Antigua & Deps", selected: true },
  { label: "Argentina", selected: false },
  { label: "Armenia", selected: false },
  { label: "Australia", selected: true },
  { label: "Austria", selected: false },
  { label: "Azerbaijan", selected: true },
  { label: "Bahamas", selected: false },
  { label: "Bahrain", selected: false },
  { label: "Bangladesh", selected: false },
  { label: "Bosnia Herzegovina", selected: false },
  { label: "Botswana", selected: false },
  { label: "Vanuatu", selected: false },
  { label: "Vatican City", selected: true },
  { label: "Venezuela", selected: false },
  { label: "Vietnam", selected: false },
  { label: "Yemen", selected: false },
  { label: "Zambia", selected: false },
  { label: "Zimbabwe", selected: false }
];

export default {
  title: "Components/Dropdown",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvDropdown } from '@hv/uikit-react-core/dist'"
  },
  component: HvDropdown
};

export const Main = () => (
  <div style={{ padding: "10px" }}>
    <HvDropdown multiSelect showSearch values={countries} />
  </div>
);

export const Empty = () => (
  <div style={{ padding: "10px" }}>
    <HvDropdown id="dropdown1" />
  </div>
);

Empty.story = {
  parameters: {
    docs: {
      storyDescription: "Dropdown with no values"
    }
  }
};

export const SingleSelection = () => (
  <div style={{ padding: "10px" }}>
    <HvDropdown
      id="dropdown7"
      onChange={item => console.log(item)}
      values={[
        { id: "id-1", label: "Afghanistan" },
        { id: "id-2", label: "Albania" },
        { id: "id-3", label: "Algeria" },
        { id: "id-4", label: "Andorra" }
      ]}
    />
  </div>
);
SingleSelection.story = {
  parameters: {
    docs: {
      storyDescription: "Support ids to manage selection"
    }
  }
};

export const MultiSelection = () => (
  <div style={{ padding: "10px" }}>
    <HvDropdown
      id="dropdown2"
      multiSelect
      showSearch
      labels={{ title: "Dropdown Title" }}
      values={countries}
    />
  </div>
);

MultiSelection.story = {
  parameters: {
    docs: {
      storyDescription: "Multi-section Dropdown with more than 10 elements"
    }
  }
};

export const MultiSelectionNoSearch = () => (
  <div style={{ padding: "10px" }}>
    <HvDropdown
      id="dropdown5"
      onChange={item => console.log(item)}
      multiSelect
      values={[
        { id: "id-1", label: "Afghanistan", selected: false },
        { id: "id-2", label: "Albania", selected: true },
        { id: "id-3", label: "Algeria", selected: false },
        { id: "id-4", label: "Andorra", selected: false }
      ]}
    />
  </div>
);

MultiSelectionNoSearch.story = {
  parameters: {
    docs: {
      storyDescription: "Supports equal labels and uses ids to manage selection"
    }
  }
};

export const SingleSelectionWithSearch = () => (
  <div style={{ padding: "10px" }}>
    <HvDropdown id="dropdown6" showSearch values={countries} />
  </div>
);

SingleSelectionWithSearch.story = {
  parameters: {
    docs: {
      storyDescription: "Single selection Dropdown with search and less than 10 elements"
    }
  }
};

export const SingleSelectionNoDefault = () => (
  <div style={{ padding: "10px" }}>
    <HvDropdown id="dropdown8" selectDefault={false} hasTooltips values={countries} />
  </div>
);

export const Disabled = () => (
  <div style={{ padding: "10px" }}>
    <HvDropdown id="dropdown9" disabled multiSelect aria-label="text" values={countries} />
  </div>
);
