import React from "react";
import { storiesOf } from "@storybook/react";
import HvDropdown from "../src/Dropdown";
import HvShowCase from "./utils/Showcase";
import HvShowCaseHeader from "./utils/ShowcaseHeader";

const HvShowCaseStyle = {
  min: {
    width: "246px"
  },
  max: {
    maxWidth: "800px"
  }
};

const data = [
  {
    label: "value 1",
    selected: false
  },
  {
    label: "value 2",
    selected: false
  },
  {
    label: "value 3",
    selected: true
  },
  {
    label: "value 4",
    selected: false
  },
  {
    label: "value 5 value 5 value 5 555555555555 value value 5",
    selected: false
  },
  {
    label: "value 6"
  },
  {
    label: "value 7"
  },
  {
    label: "value 8",
    selected: true
  },
  {
    label: "value 9",
    selected: true
  },
  {
    label: "value 10"
  },
  {
    label: "value 11"
  },
  {
    label: "value 12"
  }
];

const smallData = [
  {
    label: "value 1",
    selected: false
  },
  {
    label: "value 2",
    selected: true
  },
  {
    label: "value 3",
    selected: false
  },
  {
    label: "value 4",
    selected: false
  }
];

storiesOf("Dropdown", module).add("with Label", () => (
  <>
    <HvShowCaseHeader reviewed date="2019/Feb/14" />
    <HvShowCase
      title="Dropdown with no data"
      style={HvShowCaseStyle.min}
    >
      <HvDropdown values={null} label="some label" />
    </HvShowCase>

    <HvShowCase
      title="Complete multi-selection dropdown"
      description="Drop down with more than 10 elements"
      style={HvShowCaseStyle.min}
    >
      <HvDropdown values={data} multiSelect showSearch label="some label" />
    </HvShowCase>

    <HvShowCase
      title="Complete simple selection dropdown"
      description="Drop down with more than 10 elements"
      style={HvShowCaseStyle.min}
    >
      <HvDropdown values={data} multiSelect={false} showSearch />
    </HvShowCase>

    <HvShowCase
      title="Incomplete multi-selection dropdown"
      description="Drop down with less than 10 elements"
      style={HvShowCaseStyle.min}
    >
      <HvDropdown
        values={smallData}
        multiSelect
        showSearch
      />
    </HvShowCase>

    <HvShowCase
      title="Multi-selection dropdown without search"
      description="Drop down with less than 10 elements"
      style={HvShowCaseStyle.min}
    >
      <HvDropdown values={smallData} multiSelect showSearch={false} />
    </HvShowCase>

    <HvShowCase
      title="Single selection dropdown with search"
      description="Drop down with less than 10 elements"
      style={HvShowCaseStyle.min}
    >
      <HvDropdown
        values={smallData}
        multiSelect={false}
        showSearch
      />
    </HvShowCase>

    <HvShowCase
      title="Incomplete simple selection dropdown"
      description="Drop down with less than 10 elements"
      style={HvShowCaseStyle.min}
    >
      <HvDropdown
        values={smallData}
        multiSelect={false}
        showSearch={false}
      />
    </HvShowCase>

    <HvShowCase title="Disabled dropdown" style={HvShowCaseStyle.min}>
      <HvDropdown values={data} multiSelect showSearch={false} disabled />
    </HvShowCase>

    <HvShowCase title="Disabled dropdown" style={HvShowCaseStyle.min}>
      <HvDropdown
        values={data}
        multiSelect={false}
        showSearch={false}
        disabled
      />
    </HvShowCase>
  </>
));
