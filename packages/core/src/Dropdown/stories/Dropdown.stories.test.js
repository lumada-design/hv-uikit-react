// eslint-disable-next-line no-unused-vars
import React from "react";
import { withStyles, makeStyles } from "@material-ui/core";
import { Priority1, Priority2, Priority3, Priority4, Priority5 } from "@hv/uikit-react-icons";

import { HvDropdown, HvTypography } from "../..";

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
  <div style={{ width: 310 }}>
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
  </div>
);

SingleSelectedValue.parameters = {
  docs: {
    disable: true,
  },
};

export const LongLabel = () => (
  <div style={{ width: 310 }}>
    <HvDropdown
      id="dropdown12"
      expanded
      multiSelect
      showSearch
      disablePortal
      label="Dropdown"
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
  </div>
);

LongLabel.parameters = {
  docs: {
    disable: true,
  },
};

// Dropdown.stories.js with property expanded

export const General = () => (
  <div style={{ width: 310 }}>
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
  </div>
);

General.parameters = {
  docs: {
    disable: true,
  },
};

export const SingleSelection = () => (
  <div style={{ width: 310 }}>
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
  </div>
);

SingleSelection.parameters = {
  docs: {
    disable: true,
  },
};

export const MultiSelection = () => (
  <div style={{ width: 310 }}>
    <HvDropdown
      expanded
      id="dropdown2"
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
  </div>
);

MultiSelection.parameters = {
  docs: {
    disable: true,
  },
};

export const MultiSelectionNoSearch = () => (
  <div style={{ width: 310 }}>
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
  </div>
);

MultiSelectionNoSearch.parameters = {
  docs: {
    disable: true,
  },
};

export const SingleSelectionWithSearch = () => (
  <div style={{ width: 310 }}>
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
  </div>
);

SingleSelectionWithSearch.parameters = {
  docs: {
    disable: true,
  },
};

export const SingleSelectionNoDefault = () => (
  <div style={{ width: 310 }}>
    <HvDropdown
      expanded
      id="dropdown8"
      disablePortal
      hasTooltips
      values={[
        { label: "value 1" },
        { label: "value 2" },
        { label: "value 3" },
        { label: "value 4" },
        { label: "value 5 value 5 value 5 value 5 value 5 value 5 value 5 value 5 value 5" },
      ]}
    />
  </div>
);

SingleSelectionNoDefault.parameters = {
  docs: {
    disable: true,
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
      width: "320px",
    },
  });

  const StyledDropdown = withStyles(styles)(HvDropdown);

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <StyledDropdown
        expanded
        id="dropdown1"
        values={data}
        multiSelect
        showSearch
        placement="left"
        variableWidth
      />
      <StyledDropdown
        id="dropdown2"
        expanded
        values={data}
        multiSelect
        showSearch
        placement="right"
        variableWidth
      />
    </div>
  );
};

DifferentSizeAndPlacements.parameters = {
  docs: {
    disable: true,
  },
};

export const DropdownWithScroll = () => {
  const data = [
    {
      label: "value 1",
      selected: false,
    },
    {
      label: "value 2",
      selected: false,
    },
    {
      label: "value 3",
      selected: false,
    },
    {
      label: "value 4",
      selected: false,
    },
    {
      label: "value 5",
      selected: false,
    },
    {
      label: "value 6",
      selected: false,
    },
    {
      label: "value 7",
      selected: false,
    },
    {
      label: "value 8",
      selected: false,
    },
    {
      label: "value 9",
      selected: false,
    },
    {
      label: "value 10",
      selected: false,
    },
  ];

  const styles = () => ({
    dropdownListContainer: {
      maxHeight: 200,
      overflowY: "scroll",
    },
  });

  const StyledDropdown = withStyles(styles)(HvDropdown);

  return (
    <div style={{ width: 250 }}>
      <StyledDropdown expanded id="dropdown1" values={data} multiSelect showSearch variableWidth />
    </div>
  );
};

DropdownWithScroll.parameters = {
  docs: {
    disable: true,
  },
};

export const DropdownWithIcons = () => {
  const classes = makeStyles(() => ({
    root: {
      lineHeight: "32px",
      display: "flex",
      alignItems: "center",
    },
    icon: {
      float: "left",
      width: 22,
      height: 22,
      margin: "5px 5px 5px 0",
    },
  }))();

  const PriorityIcon = ({ Icon, label }) => (
    <span className={classes.root}>
      <Icon className={classes.icon} />
      <HvTypography>{label}</HvTypography>
    </span>
  );

  return (
    <div style={{ width: 310 }}>
      <HvDropdown
        expanded
        aria-label="Dropdown With Icons"
        values={[
          { label: <PriorityIcon Icon={Priority1} label="Priority P1" /> },
          { label: <PriorityIcon Icon={Priority2} label="Priority P2" />, selected: true },
          { label: <PriorityIcon Icon={Priority3} label="Priority P3" /> },
          { label: <PriorityIcon Icon={Priority4} label="Priority P4" /> },
          { label: <PriorityIcon Icon={Priority5} label="Priority P5" /> },
        ]}
      />
    </div>
  );
};

DropdownWithIcons.parameters = {
  docs: {
    disable: true,
  },
};
