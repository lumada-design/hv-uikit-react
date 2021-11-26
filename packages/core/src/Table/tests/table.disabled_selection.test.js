/* eslint-env jest */
/* eslint-disable no-console */
import React from "react";

import userEvent from "@testing-library/user-event";

import { render } from "testing-utils";

import { WithCheckboxCustomContent } from "../stories/Table.stories";

describe("Hv Table with disabled checkbox", () => {
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
  });

  afterEach(() => {
    window.ResizeObserver = ResizeObserver;
    jest.restoreAllMocks();
    console.warn = originalWarn;
  });

  it("should deselect the page except the selected disabled checkbox", () => {
    consoleSpy.mockReset();
    console.warn = consoleSpy;
    const { getByRole } = render(<WithCheckboxCustomContent />);
    let bulkSelector = getByRole("checkbox", { name: "2 / 7" });
    expect(bulkSelector).toBeInTheDocument();
    userEvent.click(bulkSelector);
    expect(bulkSelector).toBeChecked();
    bulkSelector = getByRole("checkbox", { name: "1 / 7" });
    expect(bulkSelector).toBeInTheDocument();

    expect(console.warn).toHaveBeenCalledTimes(2);
    expect(consoleSpy.mock.calls[0][0].includes("componentWillMount has been renamed")).toBe(true);
    expect(consoleSpy.mock.calls[1][0].includes("componentWillReceiveProps has been renamed")).toBe(
      true
    );
  });

  it("should select the page except the disabled checkbox", () => {
    const { getByRole } = render(<WithCheckboxCustomContent />);
    let bulkSelector = getByRole("checkbox", { name: "2 / 7" });
    expect(bulkSelector).toBeInTheDocument();
    userEvent.click(bulkSelector);
    bulkSelector = getByRole("checkbox", { name: "1 / 7" });
    expect(bulkSelector).toBeInTheDocument();
    userEvent.click(bulkSelector);
    bulkSelector = getByRole("checkbox", { name: "6 / 7" });
    expect(bulkSelector).toBeInTheDocument();
  });

  it("should select only the visible values except the disabled checkbox", () => {
    const { getByRole } = render(<WithCheckboxCustomContent />);
    const pageSizeSelector = getByRole("textbox");
    userEvent.click(pageSizeSelector);
    const listOption = getByRole("option", { name: "5" });
    userEvent.click(listOption); // change page size

    let bulkSelector = getByRole("checkbox", { name: "2 / 7" });
    expect(bulkSelector).toBeInTheDocument();
    userEvent.click(bulkSelector);
    bulkSelector = getByRole("checkbox", { name: "1 / 7" });
    expect(bulkSelector).toBeInTheDocument();
    userEvent.click(bulkSelector);
    bulkSelector = getByRole("checkbox", { name: "4 / 7" });
    expect(bulkSelector).toBeInTheDocument();
  });

  it("should select only the visible values except the disabled checkbox", () => {
    const { getByRole } = render(<WithCheckboxCustomContent />);
    const pageSizeSelector = getByRole("textbox");
    userEvent.click(pageSizeSelector);
    const listOption = getByRole("option", { name: "5" });
    userEvent.click(listOption); // change page size

    let bulkSelector = getByRole("checkbox", { name: "2 / 7" });
    expect(bulkSelector).toBeInTheDocument();
    userEvent.click(bulkSelector); // deselect values except selected disabled checkbox
    bulkSelector = getByRole("checkbox", { name: "1 / 7" });
    expect(bulkSelector).toBeInTheDocument();
    userEvent.click(bulkSelector); // select visible values except disabled checkbox
    bulkSelector = getByRole("checkbox", { name: "4 / 7" });
    expect(bulkSelector).toBeInTheDocument();
  });

  it("should select all elements when the all button is clicked except disabled values", () => {
    const { getByRole } = render(<WithCheckboxCustomContent />);
    const pageSizeSelector = getByRole("textbox");
    userEvent.click(pageSizeSelector);
    const listOption = getByRole("option", { name: "5" });
    userEvent.click(listOption); // change page size

    let bulkSelector = getByRole("checkbox", { name: "2 / 7" });
    expect(bulkSelector).toBeInTheDocument();
    userEvent.click(bulkSelector); // deselect values except selected disabled checkbox
    bulkSelector = getByRole("checkbox", { name: "1 / 7" });
    expect(bulkSelector).toBeInTheDocument();
    userEvent.click(bulkSelector); // select visible values except disabled checkbox
    bulkSelector = getByRole("checkbox", { name: "4 / 7" });
    expect(bulkSelector).toBeInTheDocument();

    const selectAllButton = getByRole("button", { name: "Select all 7 items across all pages" });
    userEvent.click(selectAllButton);
    bulkSelector = getByRole("checkbox", { name: "6 / 7" });
    expect(bulkSelector).toBeInTheDocument();
  });

  it("should select only the visible values in the next page maintaining the selected disabled", () => {
    const { getByRole } = render(<WithCheckboxCustomContent />);
    const pageSizeSelector = getByRole("textbox");
    userEvent.click(pageSizeSelector);
    const listOption = getByRole("option", { name: "5" });
    userEvent.click(listOption); // change page size

    let bulkSelector = getByRole("checkbox", { name: "2 / 7" });
    expect(bulkSelector).toBeInTheDocument();
    userEvent.click(bulkSelector); // deselect values except disabled selected checkbox
    bulkSelector = getByRole("checkbox", { name: "1 / 7" });
    expect(bulkSelector).toBeInTheDocument();

    const nextPageButton = getByRole("button", { name: "Next Page" });
    userEvent.click(nextPageButton);
    userEvent.click(bulkSelector); // select next page and maintain disabled selected checkbox
    bulkSelector = getByRole("checkbox", { name: "3 / 7" });
    expect(bulkSelector).toBeInTheDocument();
  });
});
