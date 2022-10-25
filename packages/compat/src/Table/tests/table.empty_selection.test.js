/* eslint-env jest */
/* eslint-disable no-console */
import React from "react";

import userEvent from "@testing-library/user-event";

import { render } from "testing-utils";

import { TableDataDeletion } from "../stories/Table.stories";

describe("HvTable", () => {
  // https://github.com/maslianok/react-resize-detector#testing-with-enzyme-and-jest
  const { ResizeObserver } = window;
  const consoleSpy = jest.fn();
  const originalWarn = console.warn;

  beforeEach(() => {
    delete window.ResizeObserver;
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
    consoleSpy.mockReset();
    console.warn = consoleSpy;
  });

  afterEach(() => {
    window.ResizeObserver = ResizeObserver;
    jest.restoreAllMocks();
    console.warn = originalWarn;
  });

  describe("general", () => {
    it("renders a table as expected", () => {
      const { getByRole, getAllByRole } = render(<TableDataDeletion />);

      const table = getByRole("table");
      expect(table).toBeInTheDocument();

      const rows = getAllByRole("row");
      expect(rows.length).toBe(6);
    });

    it("clears the table rows", () => {
      const { getAllByRole } = render(<TableDataDeletion />);

      const rows = getAllByRole("row");
      expect(rows.length).toBe(6);

      const checkboxes = getAllByRole("checkbox");
      expect(checkboxes.length).toBe(6);

      const selectAllCheckbox = checkboxes[0];
      expect(selectAllCheckbox.value).toBe("on");

      userEvent.click(selectAllCheckbox);
      const clickedCheckboxes = getAllByRole("checkbox");
      expect(clickedCheckboxes.length).toBe(6);

      expect(checkboxes[0]).toBeChecked();
      expect(checkboxes[1]).toBeChecked();
      expect(checkboxes[2]).toBeChecked();
      expect(checkboxes[3]).toBeChecked();
      expect(checkboxes[4]).toBeChecked();
      expect(checkboxes[5]).toBeChecked();

      const disableButton = getAllByRole("button")[0];
      userEvent.click(disableButton);

      const rowgroup = getAllByRole("rowgroup");
      expect(rowgroup.length).toBe(1);

      // this row corresponds to the table header row
      const rowsAfterClearance = getAllByRole("row");
      expect(rowsAfterClearance.length).toBe(1);
    });
  });
});
