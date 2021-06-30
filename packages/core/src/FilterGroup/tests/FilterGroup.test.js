/* eslint-env jest */
import React from "react";

import userEvent from "@testing-library/user-event";

import { screen, render, waitFor, within } from "testing-utils";

import { Main } from "../stories/FilterGroup.stories.test";

describe("<FilterGroup />", () => {
  it("Main", () => {
    const { container } = render(<Main />);
    expect(container).toMatchSnapshot();
  });

  it("Can be opened", async () => {
    const { container, getByRole } = render(<Main />);
    const dropdownElement = getByRole("combobox");

    userEvent.click(dropdownElement);

    await waitFor(() => {
      expect(dropdownElement).toHaveAttribute("aria-expanded", "true");
      expect(container).toMatchSnapshot();
    });
  });

  it("Can be closed with click on header", async () => {
    const { getByRole } = render(<Main />);
    const dropdownElement = getByRole("combobox");

    userEvent.click(dropdownElement);

    await waitFor(async () => {
      expect(dropdownElement).toHaveAttribute("aria-expanded", "true");
      userEvent.click(dropdownElement);
      await waitFor(() => {
        expect(dropdownElement).toHaveAttribute("aria-expanded", "false");
      });
    });
  });

  it("Can be closed with click on cancel", async () => {
    const { getByRole } = render(<Main />);
    const dropdownElement = getByRole("combobox");

    userEvent.click(dropdownElement);

    await waitFor(async () => {
      expect(dropdownElement).toHaveAttribute("aria-expanded", "true");
      const cancelButton = screen.getByText("Cancel");

      userEvent.click(cancelButton);
      await waitFor(() => {
        expect(dropdownElement).toHaveAttribute("aria-expanded", "false");
      });
    });
  });

  it("Apply disabled in the beginning", async () => {
    const { getByRole } = render(<Main />);
    const dropdownElement = getByRole("combobox");

    userEvent.click(dropdownElement);

    await waitFor(async () => {
      expect(dropdownElement).toHaveAttribute("aria-expanded", "true");
      const applyButton = getByRole("button", { name: /apply/i });

      expect(applyButton).toBeDisabled();
    });
  });
});

describe("Clear Filters", () => {
  it("Clears are option selections and reset counters", async () => {
    render(<Main />);
    const dropdownElement = screen.getByRole("combobox");

    userEvent.click(dropdownElement);

    const leftSizeList = screen.getByRole("list");
    const rightSizeList = screen.getByRole("listbox");

    expect(leftSizeList).toMatchSnapshot();
    expect(rightSizeList).toMatchSnapshot();

    const clearFiltersButton = screen.getByRole("button", { name: /clear filters/i });
    userEvent.click(clearFiltersButton);

    await waitFor(async () => {
      expect(leftSizeList).toMatchSnapshot();
      expect(rightSizeList).toMatchSnapshot();
    });
  });
});

describe("Left side selection", () => {
  it("changes the Right side elements", async () => {
    render(<Main />);
    const dropdownElement = screen.getByRole("combobox");

    userEvent.click(dropdownElement);

    await waitFor(async () => {
      const rightSizeList = screen.getByRole("listbox");

      expect(rightSizeList).toMatchSnapshot();

      const { getAllByRole } = within(rightSizeList);

      const leftSizeOption = screen.getAllByRole("listitem");
      expect(getAllByRole("option").length).toEqual(4);

      userEvent.click(leftSizeOption[2]);

      await waitFor(async () => {
        expect(getAllByRole("option").length).toEqual(12);
        expect(rightSizeList).toMatchSnapshot();
      });
    });
  });
});

describe("Right side selection", () => {
  it("Changes the counters in the expected locations", async () => {
    render(<Main />);
    const dropdownElement = screen.getByRole("combobox");

    userEvent.click(dropdownElement);

    const leftSizeList = screen.getByRole("list");
    const rightSizeList = screen.getByRole("listbox");

    expect(leftSizeList).toMatchSnapshot();
    expect(rightSizeList).toMatchSnapshot();
    const checkBox1 = screen.getByRole("checkbox", { name: /category 2/i });
    userEvent.click(checkBox1);

    await waitFor(async () => {
      expect(checkBox1).toBeChecked();
      expect(leftSizeList).toMatchSnapshot();
      expect(rightSizeList).toMatchSnapshot();
    });
  });

  it("Apply gets enabled in the beginning", async () => {
    render(<Main />);
    const dropdownElement = screen.getByRole("combobox");

    userEvent.click(dropdownElement);

    const checkBox1 = screen.getByRole("checkbox", { name: /category 2/i });
    userEvent.click(checkBox1);

    await waitFor(async () => {
      const applyButton = screen.getByRole("button", { name: /apply/i });
      expect(applyButton).toBeEnabled();
    });
  });
});

describe("Changes are", () => {
  it("Committed on apply", async () => {
    render(<Main />);
    const dropdownElement = screen.getByRole("combobox");
    expect(dropdownElement).toMatchSnapshot();

    userEvent.click(dropdownElement);

    const checkBox1 = screen.getByRole("checkbox", { name: /category 2/i });
    userEvent.click(checkBox1);

    const applyButton = screen.getByRole("button", { name: /apply/i });
    userEvent.click(applyButton);

    await waitFor(async () => {
      expect(dropdownElement).toMatchSnapshot();
    });
  });

  it("Canceled committed on cancel", async () => {
    render(<Main />);
    const dropdownElement = screen.getByRole("combobox");
    expect(dropdownElement).toMatchSnapshot();

    userEvent.click(dropdownElement);

    const checkBox1 = screen.getByRole("checkbox", { name: /category 2/i });
    userEvent.click(checkBox1);

    const applyButton = screen.getByRole("button", { name: /cancel/i });
    userEvent.click(applyButton);

    await waitFor(async () => {
      expect(dropdownElement).toMatchSnapshot();
    });
  });
});
