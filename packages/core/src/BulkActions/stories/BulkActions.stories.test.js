import React, { useState } from "react";

import { wait, screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import { HvBulkActions, HvMultiButton } from "../..";

import { ControlledWithActions } from "./BulkActions.stories";

export default {
  title: "Tests/Bulk Actions",
  parameters: {
    docs: {
      disable: true,
      page: null
    }
  },
  decorators: [
    Story => (
      <div style={{ padding: 10 }}>
        <Story />
      </div>
    )
  ]
};

// __________________________________
// Extended pa11y test scenarios

export const WithMultiButton = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [data, setData] = useState([
    { id: "monday", value: "M" },
    { id: "tuesday", value: "T" },
    { id: "wednesday", value: "W" },
    { id: "thursday", value: "T" },
    { id: "friday", value: "F" },
    { id: "saturday", value: "S" },
    { id: "sunday", value: "S" }
  ]);

  const handleSelectAll = (e, checked = false) => {
    setData(data.map(el => ({ ...el, selected: !checked })));
  };

  return (
    <div>
      <HvBulkActions
        numTotal={data.length}
        numSelected={data.filter(el => el.selected).length}
        onSelectAll={handleSelectAll}
        onSelectAllPages={handleSelectAll}
        maxVisibleActions={3}
      />
      <HvMultiButton
        multi
        type="text"
        style={{ width: "224px", margin: 10 }}
        buttons={data}
        onChange={(e, state = []) => {
          setData(data.map(el => ({ ...el, selected: state.includes(el.id) })));
        }}
      />
    </div>
  );
};

WithMultiButton.story = {
  parameters: {
    v3: true
  }
};

// __________________________________
// Extended applitools test scenarios

// test scenario, selected
export const selected = () => ControlledWithActions();

selected.story = {
  parameters: {
    v3: true,
    eyes: {
      runBefore() {
        userEvent.click(screen.getByText("All"));
        return wait(() => screen.getByText("8 of 8 items"));
      }
    }
  }
};

// test scenario, indeterminate status
export const indeterminate = () => ControlledWithActions();

indeterminate.story = {
  parameters: {
    v3: true,
    eyes: {
      runBefore() {
        userEvent.click(screen.getByText("Value 3"));
        return wait(() => screen.getByText("1 of 8 items"));
      }
    }
  }
};
