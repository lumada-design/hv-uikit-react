/* eslint-env jest */
import React from "react";

import userEvent from "@testing-library/user-event";

import { render, waitFor } from "testing-utils";

import {
  General,
  SingleSelection,
  SingleSelectionWithSearch,
  MultiSelectionNoSearch,
} from "../stories/Dropdown.stories.test";

describe("<Dropdown />", () => {
  it("General", () => {
    const { container } = render(<General />);
    expect(container).toMatchSnapshot();
  });

  it("SingleSelection", () => {
    const { container } = render(<SingleSelection />);
    expect(container).toMatchSnapshot();
  });

  it("SingleSelectionWithSearch", () => {
    const { container } = render(<SingleSelectionWithSearch />);
    expect(container).toMatchSnapshot();
  });
});

describe("Single selection", () => {
  it("should render a list with options", () => {
    const { getByRole, getAllByRole } = render(<SingleSelection />);
    const dropdownElement = getByRole("combobox");
    expect(dropdownElement).toBeInTheDocument();

    const optionElements = getAllByRole("option");
    expect(optionElements.length).toBe(4);
  });

  it("should focus first focusable element on open", async () => {
    const { getByRole } = render(<SingleSelection />);
    const dropdownElement = getByRole("combobox");
    userEvent.click(dropdownElement); // close
    expect(dropdownElement).toHaveAttribute("aria-expanded", "false");
    userEvent.click(dropdownElement); // open
    expect(dropdownElement).toHaveAttribute("aria-expanded", "true");
    const firstElement = getByRole("option", { name: /value 1/i });
    await waitFor(() => expect(firstElement).toHaveFocus());
  });
});

describe("Single selection with search", () => {
  it("should have a searchbox", () => {
    const { getByRole } = render(<SingleSelectionWithSearch />);

    const searchbox = getByRole("searchbox");
    expect(searchbox).toBeInTheDocument();
  });

  it("should focus search on open", async () => {
    const { getByRole } = render(<SingleSelectionWithSearch />);
    const dropdownElement = getByRole("combobox");
    userEvent.click(dropdownElement); // close
    expect(dropdownElement).toHaveAttribute("aria-expanded", "false");
    userEvent.click(dropdownElement); // open
    expect(dropdownElement).toHaveAttribute("aria-expanded", "true");
    const searchbox = getByRole("searchbox");
    await waitFor(() => expect(searchbox).toHaveFocus());
  });
});

describe("Multi Selection", () => {
  it("renders a dropdown in the expected configuration", () => {
    const { getByRole } = render(<General />);

    const dropdownElement = getByRole("combobox");
    expect(dropdownElement).toBeInTheDocument();

    const searchbox = getByRole("searchbox");
    expect(searchbox).toBeInTheDocument();

    const textboxElement = getByRole("textbox");
    expect(textboxElement).toBeInTheDocument();

    const dropdownContents = getByRole("tooltip");
    expect(dropdownContents).toBeInTheDocument();

    const listboxElement = getByRole("listbox");
    expect(listboxElement).toBeInTheDocument();

    const searchBox = getByRole("searchbox");
    expect(searchBox).toBeInTheDocument();

    const checkBox1 = getByRole("checkbox", { name: /value 1/i });
    expect(checkBox1).toBeInTheDocument();
    expect(checkBox1).not.toBeChecked();

    const checkBox2 = getByRole("checkbox", { name: /value 2/i });
    expect(checkBox2).toBeInTheDocument();
    expect(checkBox2).toBeChecked();

    const checkBox3 = getByRole("checkbox", { name: /value 3/i });
    expect(checkBox3).toBeInTheDocument();
    expect(checkBox3).not.toBeChecked();

    const checkBox4 = getByRole("checkbox", { name: /value 4/i });
    expect(checkBox4).toBeInTheDocument();
    expect(checkBox4).not.toBeChecked();

    const applyButton = getByRole("button", { name: /apply/i });
    expect(applyButton).toBeInTheDocument();

    const cancelButton = getByRole("button", { name: /cancel/i });
    expect(cancelButton).toBeInTheDocument();
  });

  it("selections are applied correctly", () => {
    const { getByRole } = render(<General />);

    const checkBox1 = getByRole("checkbox", { name: /value 1/i });
    userEvent.click(checkBox1);
    expect(checkBox1).toBeChecked();

    const checkBox2 = getByRole("checkbox", { name: /value 2/i });
    userEvent.click(checkBox2);
    expect(checkBox2).not.toBeChecked();

    const checkBox3 = getByRole("checkbox", { name: /value 3/i });
    userEvent.click(checkBox3);
    expect(checkBox3).toBeChecked();

    const checkBox4 = getByRole("checkbox", { name: /value 4/i });
    userEvent.click(checkBox4);
    expect(checkBox4).toBeChecked();

    const applyButton = getByRole("button", { name: /apply/i });
    // apply closes dropdown
    userEvent.click(applyButton);

    const dropdownElement = getByRole("combobox");
    // open dropdown
    userEvent.click(dropdownElement);

    // check that selection is retained
    expect(checkBox1).toBeChecked();
    expect(checkBox2).not.toBeChecked();
    expect(checkBox3).toBeChecked();
    expect(checkBox4).toBeChecked();
  });

  it("should focus the checkbox all on open when there is no search", async () => {
    const { getByRole } = render(<MultiSelectionNoSearch />);
    const dropdownElement = getByRole("combobox");
    userEvent.click(dropdownElement); // close
    expect(dropdownElement).toHaveAttribute("aria-expanded", "false");
    userEvent.click(dropdownElement); // open
    expect(dropdownElement).toHaveAttribute("aria-expanded", "true");
    const allCheckbox = getByRole("checkbox", { name: "1 / 4" });
    await waitFor(() => expect(allCheckbox).toHaveFocus());
  });
});
