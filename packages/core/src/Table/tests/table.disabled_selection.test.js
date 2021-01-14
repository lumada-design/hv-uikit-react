/* eslint-env jest */

import React from "react";

import userEvent from "@testing-library/user-event";

import { render } from "testing-utils";

import { WithCheckboxCustomContent } from "../stories/Table.stories";

describe("Hv Table with disabled checkbox", () => {
  it("should deselect the page except the selected disabled checkbox", () => {
    const { getByRole } = render(<WithCheckboxCustomContent />);
    let bulkSelector = getByRole("checkbox", { name: "2 / 7" });
    expect(bulkSelector).toBeInTheDocument();
    userEvent.click(bulkSelector);
    expect(bulkSelector).toBeChecked();
    bulkSelector = getByRole("checkbox", { name: "1 / 7" });
    expect(bulkSelector).toBeInTheDocument();
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
