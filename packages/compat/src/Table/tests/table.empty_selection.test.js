/* eslint-env jest */
/* eslint-disable no-console */
import React from "react";

import userEvent from "@testing-library/user-event";

import { render } from "testing-utils";

import { TableDataDeletion } from "../stories/Table.stories";

describe("HvTable", () => {
  // https://github.com/maslianok/react-resize-detector#testing-with-enzyme-and-jest
  const { ResizeObserver } = window;

  beforeEach(() => {
    delete window.ResizeObserver;
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });

  afterEach(() => {
    window.ResizeObserver = ResizeObserver;
    jest.restoreAllMocks();
  });

  describe("sample snapshot testing", () => {
    const consoleSpy = jest.fn();
    const originalWarn = console.warn;

    beforeEach(() => {
      consoleSpy.mockReset();
      console.warn = consoleSpy;
    });
    afterEach(() => {
      console.warn = originalWarn;
    });

    it("Main", () => {
      const { container } = render(<TableDataDeletion />);
      expect(container).toMatchSnapshot();
      expect(console.warn).toHaveBeenCalledTimes(2);
      expect(consoleSpy.mock.calls[0][0].includes("componentWillMount has been renamed")).toBe(
        true
      );
      expect(
        consoleSpy.mock.calls[1][0].includes("componentWillReceiveProps has been renamed")
      ).toBe(true);
    });
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
