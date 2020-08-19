// eslint-disable-next-line no-unused-vars
import React from "react";

import { wait, screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

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
    eyes: {
      runBefore() {
        userEvent.click(screen.getByRole("textbox", { name: /select\.\.\./i }));
        return wait(() => screen.getByRole("tooltip"));
      }
    }
  }
};

// test scenario, single selection opened
export const singleOpened = () => SingleSelection();

singleOpened.story = {
  parameters: {
    eyes: {
      runBefore() {
        userEvent.click(screen.getByRole("textbox", { name: /select\.\.\./i }));
        return wait(() => screen.getByRole("tooltip"));
      }
    }
  }
};

// test scenario, multiple selection opened
export const MultipleOpened = () => MultiSelection();

MultipleOpened.story = {
  parameters: {
    eyes: {
      runBefore() {
        userEvent.click(screen.getByRole("textbox", { name: /value 2/i }));
        return wait(() => screen.getByRole("tooltip"));
      }
    }
  }
};

// test scenario, Multi Selection No Search opened
export const NoSearchOpened = () => MultiSelectionNoSearch();

NoSearchOpened.story = {
  parameters: {
    eyes: {
      runBefore() {
        userEvent.click(screen.getByRole("textbox", { name: /value 1/i }));
        return wait(() => screen.getByRole("tooltip"));
      }
    }
  }
};

// test scenario, Single Selection No Default
export const SingleNoDefaultOpened = () => SingleSelectionNoDefault();

SingleNoDefaultOpened.story = {
  parameters: {
    eyes: {
      runBefore() {
        userEvent.click(screen.getByRole("textbox", { name: /select\.\.\./i }));
        return wait(() => screen.getByRole("tooltip"));
      }
    }
  }
};

// test scenario, Different Size And Placements left opened
export const DifferentSizeAndPlacementsLeftOpened = () => DifferentSizeAndPlacements();

DifferentSizeAndPlacementsLeftOpened.story = {
  parameters: {
    eyes: {
      runBefore() {
        userEvent.click(screen.getAllByRole("textbox", { name: /all/i })[0]);
        return wait(() => screen.getByRole("tooltip"));
      }
    }
  }
};

// test scenario, Different Size And Placements right opened
export const DifferentSizeAndPlacementsRightOpened = () => DifferentSizeAndPlacements();

DifferentSizeAndPlacementsRightOpened.story = {
  parameters: {
    eyes: {
      runBefore() {
        userEvent.click(screen.getAllByRole("textbox", { name: /all/i })[1]);
        return wait(() => screen.getByRole("tooltip"));
      }
    }
  }
};
