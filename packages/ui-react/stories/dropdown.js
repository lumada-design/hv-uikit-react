import React from "react";
import { storiesOf } from "@storybook/react";
import { HvDropdown, HvShowCase, HvShowCaseHeader } from "../src";

const data = [
  { id: 1, label: "980969 Bribie" },
  { id: 2, label: "980969 Gatton" },
  { id: 3, label: "980969 Perkes" },
  { id: 4, label: "This is a very long option and should be cut" },
  { id: 5, label: "5" },
  { id: 6, label: "6" },
  { id: 7, label: "7" },
  { id: 8, label: "8" },
  { id: 9, label: "9" },
  { id: 10, label: "10" },
  { id: 11, label: "11" },
  { id: 12, label: "12" }
];

const smallData = [
  { id: 1, label: "980969 Bribie" },
  { id: 2, label: "980969 Gatton" },
  { id: 3, label: "980969 Perkes" },
  { id: 4, label: "4" },
  { id: 5, label: "5" }
];

const values = [{ id: 4, label: "4" }, { id: 5, label: "5" }];

const messages = {
  searchPlaceholder: "Search...",
  noItemsMessage: "No Items...",
  noneSelectedMessage: "None Selected",
  selectedMessage: "delected",
  selectAllMessage: "All",
  clearAllMessage: "Clear All",
  applyButtonText: "Apply",
  cancelButtonText: "Cancel",
  defaultTextValue: "All",
  multipleSelectionConjuctionMessage: "of",
  dropdownLabel: "label"
};

const HvShowCaseStyle = {
  min: {
    width: "246px"
  },
  max: {
    maxWidth: "800px"
  }
};

storiesOf("Dropdown", module).add("with Label", () => (
  <>
    <HvShowCaseHeader reviewed date="2019/Feb/5" />
    <HvShowCase
      title="Complete multi-selection dropdown"
      description="Drop down with more than 10 elements"
      style={HvShowCaseStyle.min}
    >
      <HvDropdown
        label="Sort"
        messages={messages}
        options={data}
        values={values}
        onChange={() => console.log("test")}
        multiSelect
        showSearch
      />
    </HvShowCase>

    <HvShowCase
      title="Complete simple selection dropdown"
      description="Drop down with more than 10 elements"
      style={HvShowCaseStyle.min}
    >
      <HvDropdown
        label="Sort"
        messages={messages}
        options={data}
        values={values}
        onChange={() => console.log("change from story")}
      />
    </HvShowCase>

    <HvShowCase
      title="Incomplete multi-selection dropdown"
      description="Drop down with less than 10 elements"
      style={HvShowCaseStyle.min}
    >
      <HvDropdown
        label="Sort"
        messages={messages}
        options={smallData}
        values={values}
        onChange={() => console.log("test")}
        multiSelect
        showSearch
      />
    </HvShowCase>

    <HvShowCase
      title="Incomplete simple selection dropdown"
      description="Drop down with less than 10 elements"
      style={HvShowCaseStyle.min}
    >
      <HvDropdown
        label="Sort"
        messages={messages}
        options={smallData}
        values={values}
        onChange={() => console.log("change from story")}
      />
    </HvShowCase>

    <HvShowCase title="Disabled dropdown" style={HvShowCaseStyle.min}>
      <HvDropdown
        label="Sort"
        disabled
        messages={messages}
        options={data}
        values={values}
        onChange={() => console.log("change from story")}
      />
    </HvShowCase>

    <HvShowCase title="Disabled dropdown" style={HvShowCaseStyle.min}>
      <HvDropdown
        label="Sort"
        disabled
        messages={messages}
        options={data}
        values={values}
        onChange={() => console.log("change from story")}
      />
    </HvShowCase>
  </>
));
