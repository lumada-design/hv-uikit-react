// eslint-disable-next-line no-unused-vars
import React from "react";

import {
  Empty,
  SingleSelection,
  MultiSelection,
  MultiSelectionNoSearch,
  SingleSelectionNoDefault,
  DifferentSizeAndPlacements
} from "./Dropdown.stories";

export default {
  title: "Tests/Dropdown",
  parameters: {
    docs: {
      disable: true,
      page: null
    }
  }
};

// __________________________________
// Extended applitools test scenarios

// test scenario, Empty opened
export const EmptyOpened = () => Empty();

EmptyOpened.story = {
  parameters: {
    eyes: {}
  }
};

// test scenario, single selection opened
export const singleOpened = () => SingleSelection();

singleOpened.story = {
  parameters: {
    eyes: {}
  }
};

// test scenario, multiple selection opened
export const MultipleOpened = () => MultiSelection();

MultipleOpened.story = {
  parameters: {
    eyes: {}
  }
};

// test scenario, Multi Selection No Search opened
export const NoSearchOpened = () => MultiSelectionNoSearch();

NoSearchOpened.story = {
  parameters: {
    eyes: {}
  }
};

// test scenario, Single Selection No Default
export const SingleNoDefaultOpened = () => SingleSelectionNoDefault();

SingleNoDefaultOpened.story = {
  parameters: {
    eyes: {}
  }
};

// test scenario, Different Size And Placements left opened
export const DifferentSizeAndPlacementsLeftOpened = () => DifferentSizeAndPlacements();

DifferentSizeAndPlacementsLeftOpened.story = {
  parameters: {
    eyes: {}
  }
};

// test scenario, Different Size And Placements right opened
export const DifferentSizeAndPlacementsRightOpened = () => DifferentSizeAndPlacements();

DifferentSizeAndPlacementsRightOpened.story = {
  parameters: {
    eyes: {}
  }
};
