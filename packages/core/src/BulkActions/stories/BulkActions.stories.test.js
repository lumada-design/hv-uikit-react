// eslint-disable-next-line import/no-extraneous-dependencies
import { wait, screen, fireEvent } from "@testing-library/dom/dist/@testing-library/dom.umd";
import React from "react";

import { ControlledWithActions } from "./BulkActions.stories";

export default {
  title: "Tests/Bulk Actions",
  parameters: {
    docs: {
      disable: true,
      page: null,
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 10 }}>
        <Story />
      </div>
    ),
  ],
};

// __________________________________
// Extended applitools test scenarios

// test scenario, selected
export const selected = () => ControlledWithActions();

selected.story = {
  parameters: {
    eyes: {
      runBefore() {
        fireEvent.click(screen.getByText("All"));
        return wait(() => screen.getByText("8 of 8 items"));
      },
    },
  },
};

// test scenario, indeterminate status
export const indeterminate = () => ControlledWithActions();

indeterminate.story = {
  parameters: {
    eyes: {
      runBefore() {
        fireEvent.click(screen.getByText("Value 3"));
        return wait(() => screen.getByText("1 of 8 items"));
      },
    },
  },
};
