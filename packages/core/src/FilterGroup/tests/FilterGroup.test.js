/* eslint-env jest */
/* eslint-env jest */
/* eslint testing-library/no-wait-for-side-effects: "warn" */
/* eslint testing-library/no-wait-for-multiple-assertions: "warn" */
/* eslint testing-library/no-wait-for-snapshot: "warn" */
import React from "react";

import userEvent from "@testing-library/user-event";

import { screen, render, within } from "testing-utils";

import { Main, ResetToDefault } from "../stories/FilterGroup.stories.test";

describe("<FilterGroup />", () => {
  jest.setTimeout(30000);
  it("Main", () => {
    const { container } = render(<Main />);
    expect(container).toMatchSnapshot();
  });

  it("Can be opened", async () => {
    const { container, getByRole, findByRole } = render(<Main />);
    let dropdownElement = getByRole("combobox");

    userEvent.click(dropdownElement);

    dropdownElement = await findByRole("combobox");
    expect(dropdownElement).toHaveAttribute("aria-expanded", "true");
    expect(container).toMatchSnapshot();
  });

  it("Can be closed with click on header", async () => {
    const { getByRole, findByRole } = render(<Main />);
    let dropdownElement = getByRole("combobox");

    userEvent.click(dropdownElement);

    dropdownElement = await findByRole("combobox");
    expect(dropdownElement).toHaveAttribute("aria-expanded", "true");

    userEvent.click(dropdownElement);

    dropdownElement = await findByRole("combobox");
    expect(dropdownElement).toHaveAttribute("aria-expanded", "false");
  });

  it("Can be closed with click on cancel", async () => {
    const { getByRole, findByRole } = render(<Main />);
    let dropdownElement = getByRole("combobox");

    userEvent.click(dropdownElement);

    dropdownElement = await findByRole("combobox");
    expect(dropdownElement).toHaveAttribute("aria-expanded", "true");
    const cancelButton = screen.getByText("Cancel");
    userEvent.click(cancelButton);
    dropdownElement = await findByRole("combobox");
    expect(dropdownElement).toHaveAttribute("aria-expanded", "false");
  });

  it("Apply disabled in the beginning", async () => {
    const { getByRole, findByRole } = render(<Main />);
    let dropdownElement = getByRole("combobox");

    userEvent.click(dropdownElement);
    dropdownElement = await findByRole("combobox");
    expect(dropdownElement).toHaveAttribute("aria-expanded", "true");
    const applyButton = getByRole("button", { name: /apply/i });
    expect(applyButton).toBeDisabled();
  });
});

describe("Clear Filters", () => {
  it("Clears all option selections and reset counters", async () => {
    render(<Main />);
    let dropdownElement = screen.getByRole("combobox");

    userEvent.click(dropdownElement);

    dropdownElement = await screen.findByRole("combobox");
    expect(dropdownElement).toHaveAttribute("aria-expanded", "true");
    let leftSizeList = screen.getByRole("list");
    let rightSizeList = screen.getByRole("listbox");

    expect(leftSizeList).toMatchSnapshot();
    expect(rightSizeList).toMatchSnapshot();

    const clearFiltersButton = screen.getByRole("button", { name: /clear filters/i });
    userEvent.click(clearFiltersButton);
    leftSizeList = await screen.findByRole("list");
    rightSizeList = screen.getByRole("listbox");
    expect(leftSizeList).toMatchSnapshot();
    expect(rightSizeList).toMatchSnapshot();
  });
});

describe("Reset Filters", () => {
  it("Resets all option selections to default value provided", async () => {
    render(<ResetToDefault />);
    let dropdownElement = screen.getByRole("combobox");

    userEvent.click(dropdownElement);

    dropdownElement = await screen.findByRole("combobox");
    expect(dropdownElement).toHaveAttribute("aria-expanded", "true");
    let leftSizeList = screen.getByRole("list");
    let rightSizeList = screen.getByRole("listbox");

    expect(leftSizeList).toMatchSnapshot();
    expect(rightSizeList).toMatchSnapshot();

    const resetFiltersButton = screen.getByRole("button", { name: /reset/i });
    userEvent.click(resetFiltersButton);
    leftSizeList = await screen.findByRole("list");
    rightSizeList = screen.getByRole("listbox");
    expect(leftSizeList).toMatchSnapshot();
    expect(rightSizeList).toMatchSnapshot();
  });
});

describe("Left side selection", () => {
  it("changes the Right side elements", async () => {
    render(<Main />);
    let dropdownElement = screen.getByRole("combobox");

    userEvent.click(dropdownElement);
    dropdownElement = await screen.findByRole("combobox");
    expect(dropdownElement).toHaveAttribute("aria-expanded", "true");
    let rightSizeList = screen.getByRole("listbox");

    expect(rightSizeList).toMatchSnapshot();

    const { getAllByRole } = within(rightSizeList);

    const leftSizeOption = screen.getAllByRole("listitem");
    expect(getAllByRole("option").length).toEqual(4);

    userEvent.click(leftSizeOption[2]);
    rightSizeList = await screen.findByRole("listbox");
    const { getAllByRole: getAllByRle } = within(rightSizeList);

    expect(getAllByRle("option").length).toEqual(12);
    expect(rightSizeList).toMatchSnapshot();
  });
});

describe("Right side selection", () => {
  it("Changes the counters in the expected locations", async () => {
    render(<Main />);
    let dropdownElement = screen.getByRole("combobox");

    userEvent.click(dropdownElement);
    dropdownElement = await screen.findByRole("combobox");
    expect(dropdownElement).toHaveAttribute("aria-expanded", "true");
    const leftSizeList = screen.getByRole("list");
    const rightSizeList = screen.getByRole("listbox");

    expect(leftSizeList).toMatchSnapshot();
    expect(rightSizeList).toMatchSnapshot();
    let checkBox1 = screen.getByRole("checkbox", { name: /category 3/i });
    expect(checkBox1).not.toBeChecked();
    userEvent.click(checkBox1);
    checkBox1 = await screen.findByRole("checkbox", { name: /category 3/i });
    expect(checkBox1).toBeChecked();
    expect(leftSizeList).toMatchSnapshot();
    expect(rightSizeList).toMatchSnapshot();
  });

  it("Apply gets enabled in the beginning", async () => {
    render(<Main />);
    let dropdownElement = screen.getByRole("combobox");

    userEvent.click(dropdownElement);
    dropdownElement = await screen.findByRole("combobox");
    expect(dropdownElement).toHaveAttribute("aria-expanded", "true");
    const checkBox1 = screen.getByRole("checkbox", { name: /category 2/i });
    userEvent.click(checkBox1);
    const applyButton = await screen.findByRole("button", { name: /apply/i });
    expect(applyButton).toBeEnabled();
  });
});

describe("Changes are", () => {
  it("Committed on apply", async () => {
    render(<Main />);
    let dropdownElement = screen.getByRole("combobox");
    expect(dropdownElement).toMatchSnapshot();

    userEvent.click(dropdownElement);
    dropdownElement = await screen.findByRole("combobox");
    expect(dropdownElement).toHaveAttribute("aria-expanded", "true");
    let checkBox1 = screen.getByRole("checkbox", { name: /category 2/i });
    userEvent.click(checkBox1);
    checkBox1 = await screen.findByRole("checkbox", { name: /category 2/i });

    const applyButton = screen.getByRole("button", { name: /apply/i });
    userEvent.click(applyButton);
    dropdownElement = await screen.findByRole("combobox");
    expect(dropdownElement).toMatchSnapshot();
  });

  it("Canceled committed on cancel", async () => {
    render(<Main />);
    let dropdownElement = screen.getByRole("combobox");
    expect(dropdownElement).toMatchSnapshot();

    userEvent.click(dropdownElement);
    dropdownElement = await screen.findByRole("combobox");
    expect(dropdownElement).toHaveAttribute("aria-expanded", "true");
    const checkBox1 = screen.getByRole("checkbox", { name: /category 2/i });
    userEvent.click(checkBox1);

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    userEvent.click(cancelButton);
    dropdownElement = await screen.findByRole("combobox");
    expect(dropdownElement).toMatchSnapshot();
  });
});
