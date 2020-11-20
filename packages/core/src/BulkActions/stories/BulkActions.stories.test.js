// eslint-disable-next-line import/no-extraneous-dependencies
import { waitFor, screen, fireEvent } from "@testing-library/dom/dist/@testing-library/dom.umd";
import React from "react";

import { WithActions } from "./BulkActions.stories";

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
export const selected = () => <WithActions />;

selected.parameters = {
  eyes: {
    runBefore() {
      fireEvent.click(screen.getByText("All"));
      return waitFor(() => screen.getByText("8 of 8 items"));
    },
  },
};

// test scenario, indeterminate status
export const indeterminate = () => <WithActions />;

indeterminate.parameters = {
  eyes: {
    runBefore() {
      fireEvent.click(screen.getByText("Value 3"));
      return waitFor(() => screen.getByText("1 of 8 items"));
    },
  },
};
