// eslint-disable-next-line no-unused-vars
import React from "react";

import {
  WithExpanderAndCustomContent,
  WithCheckbox,
  WithCheckboxAndSecondaryActions,
  Main
} from "./Table.stories";

export default {
  title: "Tests/Table",
  parameters: {
    docs: {
      disable: true,
      page: null
    }
  }
};

// __________________________________
// Extended applitools test scenarios

// test scenario, Expanded
export const ContentExpanded = () => WithExpanderAndCustomContent();

ContentExpanded.story = {
  parameters: {
    eyes: {}
  }
};

// test scenario, rows selected and unselected
export const mixSelection = () => WithCheckbox();

mixSelection.story = {
  parameters: {
    eyes: {}
  }
};

// test scenario, opened row action dropdownmenu
export const RowActionOpened = () => WithCheckboxAndSecondaryActions();

RowActionOpened.story = {
  parameters: {
    eyes: {}
  }
};

// test scenario, all selected
export const AllRowsSelected = () => WithCheckboxAndSecondaryActions();

AllRowsSelected.story = {
  parameters: {
    eyes: {}
  }
};

// test scenario, sort column
export const SortColumn = () => Main();

SortColumn.story = {
  parameters: {
    eyes: {}
  }
};
