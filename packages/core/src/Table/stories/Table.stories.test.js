// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line import/no-extraneous-dependencies
import { wait, screen, fireEvent } from "@testing-library/dom/dist/@testing-library/dom.umd";

import {
  WithExpanderAndCustomContent,
  WithCheckbox,
  WithCheckboxAndSecondaryActions,
  Main,
} from "./Table.stories";

export default {
  title: "Tests/Table",
  parameters: {
    docs: {
      disable: true,
      page: null,
    },
  },
};

// __________________________________
// Extended applitools test scenarios

// test scenario, Expanded
export const ContentExpanded = () => WithExpanderAndCustomContent();

ContentExpanded.story = {
  parameters: {
    eyes: {
      runBefore() {
        fireEvent.click(screen.getAllByRole("button", { name: /row expander button/i })[2]);
        return wait(
          () => screen.getAllByRole("table")[4] && document.querySelector("[id|=reactgooglegraph]")
        );
      },
    },
  },
};

// test scenario, rows selected and unselected
export const mixSelection = () => WithCheckbox();

mixSelection.story = {
  parameters: {
    eyes: {
      runBefore() {
        fireEvent.click(screen.getByRole("checkbox", { name: /select-2-select/i }));
        fireEvent.click(screen.getByRole("checkbox", { name: /select-3-select/i }));
        fireEvent.click(screen.getByRole("checkbox", { name: /select-7-select/i }));
        return wait(() => document.querySelectorAll("[aria-selected=true]")[2]);
      },
    },
  },
};

// test scenario, opened row action dropdownmenu
export const RowActionOpened = () => WithCheckboxAndSecondaryActions();

RowActionOpened.story = {
  parameters: {
    eyes: {
      runBefore() {
        fireEvent.click(screen.getAllByRole("button", { name: /dropdown menu/i })[0]);
        return wait(() => screen.getByRole("menuitem", { name: /share/i }));
      },
    },
  },
};

// test scenario, all selected
export const AllRowsSelected = () => WithCheckboxAndSecondaryActions();

AllRowsSelected.story = {
  parameters: {
    eyes: {
      runBefore() {
        fireEvent.click(screen.getByRole("checkbox", { name: /all/i }));
        return wait(() => document.querySelectorAll("[aria-selected=true]")[9]);
      },
    },
  },
};

// test scenario, sort column
export const SortColumn = () => Main();

SortColumn.story = {
  parameters: {
    eyes: {
      runBefore() {
        fireEvent.click(screen.getByRole("button", { name: /test-column-priority-sort-button/i }));
        return wait(() => screen.getByText("Event 2"));
      },
    },
  },
};
