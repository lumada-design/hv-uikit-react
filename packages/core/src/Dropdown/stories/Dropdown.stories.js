import React from "react";
import { withStyles } from "@material-ui/core";

import { HvDropdown } from "../..";

export default {
  title: "Components/Dropdown",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvDropdown } from "@hitachivantara/uikit-react-core";',
  },
  component: HvDropdown,
};

export const Main = () => (
  <HvDropdown
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
  },
};

export const Empty = () => <HvDropdown id="dropdown1" />;

Empty.story = {
  parameters: {
    docs: {
      storyDescription: "Dropdown with no values",
    },
    pa11y: {
      ignore: ["region"],
    },
  },
};

export const SingleSelection = () => (
  <HvDropdown
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
      storyDescription: "Support ids to manage selection",
    },
    pa11y: {
      ignore: ["region"],
    },
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

export const MultiSelectionNoSearch = () => (
  <HvDropdown
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
    pa11y: {
      ignore: ["region"],
    },
  },
};

export const SingleSelectionWithSearch = () => (
  <HvDropdown
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
      storyDescription: "Single selection Dropdown with search and less than 10 elements",
    },
    pa11y: {
      ignore: ["region"],
    },
  },
};

export const SingleSelectionNoSelection = () => (
  <HvDropdown
    id="dropdown8"
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
    rootList: {
      width: "520px",
    },
    list: {
      maxWidth: "none",
    },
  });

  const StyledDropdown = withStyles(styles)(HvDropdown);

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <StyledDropdown id="dropdown1" values={data} multiSelect showSearch placement="right" />
      </div>
      <div>
        <StyledDropdown id="dropdown2" values={data} multiSelect showSearch placement="left" />
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
  },
};

export const Expanded = () => (
  <HvDropdown
    id="dropdown12"
    expanded
    multiSelect
    showSearch
    hasTooltips
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

Expanded.story = {
  parameters: {
    docs: {
      inlineStories: false,
    },
    eyes: { waitBeforeScreenshot: "[id*=search-input]:focus" },
  },
};
