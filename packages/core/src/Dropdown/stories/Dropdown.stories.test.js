// eslint-disable-next-line no-unused-vars
import React from "react";
import { withStyles } from "@material-ui/core";

import { HvDropdown } from "../..";

export default {
  title: "Tests/Dropdown",
  parameters: {
    docs: {
      disable: true,
      page: null,
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 10, maxWidth: "1000px" }}>
        <Story />
      </div>
    ),
  ],
};

export const SingleSelectedValue = () => (
  <HvDropdown
    id="dropdownSelected"
    expanded
    onChange={(item) => console.log(item)}
    values={[
      { id: "id-1", label: "value 1" },
      { id: "id-2", label: "value 2" },
      { id: "id-3", label: "value 3", selected: true },
      { id: "id-4", label: "value 4" },
    ]}
  />
);

SingleSelectedValue.story = {
  parameters: {
    docs: {
      disable: true,
    },
  },
};

export const LongLabel = () => (
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
      { label: "value 12" },
    ]}
  />
);

LongLabel.story = {
  parameters: {
    docs: {
      disable: true,
    },
  },
};

// Dropdown.stories.js with property expanded

export const General = () => (
  <HvDropdown
    expanded
    multiSelect
    showSearch
    values={[
      { label: "value 1" },
      { label: "value 2", selected: true },
      { label: "value 3" },
      { label: "value 4" },
    ]}
  />
);

General.story = {
  parameters: {
    docs: {
      disable: true,
    },
  },
};

export const SingleSelection = () => (
  <HvDropdown
    expanded
    id="dropdown7"
    onChange={(item) => console.log(item)}
    values={[
      { id: "id-1", label: "value 1" },
      { id: "id-2", label: "value 2" },
      { id: "id-3", label: "value 3" },
      { id: "id-4", label: "value 4" },
    ]}
  />
);

SingleSelection.story = {
  parameters: {
    docs: {
      disable: true,
    },
  },
};

export const MultiSelection = () => (
  <HvDropdown
    expanded
    id="dropdown2"
    multiSelect
    showSearch
    labels={{ title: "Dropdown Title" }}
    values={[
      { label: "value 1" },
      { label: "value 2", selected: true },
      { label: "value 3" },
      { label: "value 4" },
    ]}
  />
);

MultiSelection.story = {
  parameters: {
    docs: {
      disable: true,
    },
  },
};

export const MultiSelectionNoSearch = () => (
  <HvDropdown
    expanded
    id="dropdown5"
    onChange={(item) => console.log(item)}
    multiSelect
    values={[
      { id: "id-1", label: "value 1" },
      { id: "id-2", label: "value 1", selected: true },
      { id: "id-3", label: "value 3" },
      { id: "id-4", label: "value 4" },
    ]}
  />
);

MultiSelectionNoSearch.story = {
  parameters: {
    docs: {
      disable: true,
    },
  },
};

export const SingleSelectionWithSearch = () => (
  <HvDropdown
    expanded
    id="dropdown6"
    showSearch
    values={[
      { label: "value 1" },
      { label: "value 2", selected: true },
      { label: "value 3" },
      { label: "value 4" },
    ]}
  />
);

SingleSelectionWithSearch.story = {
  parameters: {
    docs: {
      disable: true,
    },
  },
};

export const SingleSelectionNoDefault = () => (
  <HvDropdown
    expanded
    id="dropdown8"
    selectDefault={false}
    hasTooltips
    values={[
      { label: "value 1" },
      { label: "value 2" },
      { label: "value 3" },
      { label: "value 4" },
      { label: "value 5 value 5 value 5 value 5 value 5 value 5 value 5 value 5 value 5" },
    ]}
  />
);

SingleSelectionNoDefault.story = {
  parameters: {
    docs: {
      disable: true,
    },
  },
};

export const DifferentSizeAndPlacements = () => {
  const data = [
    {
      label: "value 1",
      selected: false,
    },
    {
      label: "value 2",
      selected: false,
    },
  ];

  const styles = () => ({
    root: {
      width: "200px",
    },
    rootList: {
      width: "520px",
    },
  });

  const StyledDropdown = withStyles(styles)(HvDropdown);

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <StyledDropdown
          expanded
          id="dropdown1"
          values={data}
          multiSelect
          showSearch
          placement="right"
        />
      </div>
      <div>
        <StyledDropdown
          expanded
          id="dropdown2"
          values={data}
          multiSelect
          showSearch
          placement="left"
        />
      </div>
    </div>
  );
};

DifferentSizeAndPlacements.story = {
  parameters: {
    docs: {
      disable: true,
    },
  },
};
