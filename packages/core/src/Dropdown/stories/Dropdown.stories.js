import React from "react";
import { withStyles } from "@material-ui/core";

import { HvDropdown } from "../..";

export default {
  title: "Forms/Dropdown",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvDropdown } from '@hv/uikit-react-core/dist'",
    maturityStatus: "stable",
    dsVersion: "3.2.0",
  },
  component: HvDropdown,
};

export const Main = () => (
  <HvDropdown
    aria-label="Main sample"
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

Main.story = {
  parameters: {
    pa11y: {
      ignore: ["region"],
    },
    eyes: { include: false },
  },
};

export const Empty = () => <HvDropdown id="dropdown1" aria-label="Empty" />;

Empty.story = {
  parameters: {
    docs: {
      storyDescription: "Dropdown with no values",
    },
    pa11y: {
      ignore: ["region"],
    },
    eyes: { include: false },
  },
};

export const SingleSelection = () => (
  <HvDropdown
    id="dropdown7"
    aria-label="Single selection"
    onChange={(item) => console.log(item)}
    values={[
      { id: "id-1", label: "value 1", selected: true },
      { id: "id-2", label: "value 2" },
      { id: "id-3", label: "value 3" },
      { id: "id-4", label: "value 4" },
    ]}
  />
);

SingleSelection.story = {
  parameters: {
    docs: {
      storyDescription: "Support ids to manage selection",
    },
    pa11y: {
      ignore: ["region"],
    },
    eyes: { include: false },
  },
};

export const MultiSelection = () => (
  <HvDropdown
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
    eyes: { include: false },
  },
};

export const MultiSelectionNoSearch = () => (
  <HvDropdown
    id="dropdown5"
    aria-label="No search"
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
    pa11y: {
      ignore: ["region"],
    },
    eyes: { include: false },
  },
};

export const SingleSelectionWithSearch = () => (
  <HvDropdown
    id="dropdown6"
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

SingleSelectionWithSearch.story = {
  parameters: {
    docs: {
      storyDescription: "Single selection Dropdown with search and less than 10 elements",
    },
    pa11y: {
      ignore: ["region"],
    },
    eyes: { include: false },
  },
};

export const SingleSelectionNoSelection = () => (
  <HvDropdown
    id="dropdown8"
    aria-label="No default"
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

SingleSelectionNoSelection.story = {
  parameters: {
    pa11y: {
      ignore: ["region"],
    },
    eyes: { include: false },
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
    dropdown: {
      width: "180px",
    },
  });

  const StyledDropdown = withStyles(styles)(HvDropdown);

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <StyledDropdown
          id="dropdown1"
          aria-label="Left"
          values={data}
          multiSelect
          showSearch
          placement="right"
        />
      </div>
      <div>
        <StyledDropdown
          id="dropdown2"
          aria-label="Right"
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
      storyDescription: "Dropdown defined with a specific width and with different placements.",
    },
    pa11y: {
      ignore: ["region"],
    },
    eyes: { include: false },
  },
};

export const Disabled = () => (
  <HvDropdown
    id="dropdown9"
    disabled
    multiSelect
    aria-label="text"
    values={[
      { label: "value 1", selected: false },
      { label: "value 2", selected: false },
      { label: "value 3", selected: true },
      { label: "value 4", selected: false },
      { label: "value 5 value 5 value 5 555555555555 value value 5", selected: false },
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

Disabled.story = {
  parameters: {
    pa11y: {
      ignore: [
        "region",
        // Text or images of text that are part of an inactive user interface component have no contrast requirement.
        // https://github.com/lumada-design/hv-uikit-react/issues/775#issuecomment-557167364
        "WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail",
        "color-contrast",
      ],
    },
    eyes: { include: false },
  },
};
