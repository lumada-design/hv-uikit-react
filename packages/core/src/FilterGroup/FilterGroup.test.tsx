import { useState } from "react";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";

import { HvFilterGroup, HvFilterGroupProps } from "./FilterGroup";
import { HvFilterGroupValue } from "./types";

const filters: HvFilterGroupProps["filters"] = [
  {
    id: "category",
    name: "Category",
    data: [
      {
        id: "category1",
        name: "Categoryyyyyyyyyyyyyyyyyyyyyyyyy is a very long string 1",
      },
      { id: 2, name: "Category 2" },
      { id: "category3", name: "Category 3" },
      { id: "category4", name: "Category 4" },
    ],
  },
  {
    id: "subcategory",
    name: "Sub-Category",
    data: [
      {
        id: "subcategory1",
        name: "Sub Category Categoryyyyyyyyy is a very long string 1",
      },
      { id: "subcategory2", name: "Sub Category 2" },
      { id: "subcategory3", name: "Sub Category 3" },
      { id: "subcategory4", name: "Sub Category 4" },
    ],
  },
  {
    id: "subsubcategory",
    name: "Sub-Sub-Category Category Category Category Category Category",
    data: [
      {
        id: "subsubcategory1",
        name: "Sub sub Category 1 Categoryyyyyyyyy is a very long string",
      },
      { id: "subsubcategory2", name: "Sub sub Category 2" },
      { id: "subsubcategory3", name: "Sub sub Category 3" },
      { id: "subsubcategory4", name: "Sub sub Category 4" },
      { id: "subsubcategory5", name: "Sub sub Category 5" },
      { id: "subsubcategory6", name: "Sub sub Category 6" },
      { id: "subsubcategory7", name: "Sub sub Category 7" },
      { id: "subsubcategory8", name: "Sub sub Category 8" },
      { id: "subsubcategory9", name: "Sub sub Category 9" },
      { id: "subsubcategory10", name: "Sub sub Category 10" },
      { id: "subsubcategory11", name: "Sub sub Category 11" },
      { id: "subsubcategory12", name: "Sub sub Category 12" },
    ],
  },
];

const Main = ({ emptyValue }: { emptyValue?: boolean }) => {
  const [value, setValue] = useState<HvFilterGroupValue | undefined>(
    emptyValue
      ? undefined
      : [["category1", 2], [], [1, "subsubcategory2", "subsubcategory8"]]
  );

  return (
    <div style={{ width: 180 }}>
      <HvFilterGroup
        value={value}
        filters={filters}
        onChange={(_, values) => setValue(values)}
      />
    </div>
  );
};

const ResetToDefault = () => {
  const [value, setValue] = useState<HvFilterGroupValue | undefined>([
    ["category1", 2],
    ["subcategory1"],
    [1],
  ]);

  return (
    <div style={{ width: 180 }}>
      <HvFilterGroup
        value={value}
        defaultValue={[["category1"], [], []]}
        filters={filters}
        labels={{
          clearLabel: "Reset",
        }}
        onChange={(_, values) => setValue(values)}
      />
    </div>
  );
};

describe("FilterGroup", () => {
  it("can be opened", async () => {
    const { getByRole } = render(<Main />);

    let dropdownElement = getByRole("combobox");

    await userEvent.click(dropdownElement);

    dropdownElement = getByRole("combobox");

    expect(dropdownElement).toHaveAttribute("aria-expanded", "true");
  });

  it("can be closed with click on header", async () => {
    const { getByRole } = render(<Main />);

    let dropdownElement = getByRole("combobox");

    await userEvent.click(dropdownElement);

    dropdownElement = getByRole("combobox");

    expect(dropdownElement).toHaveAttribute("aria-expanded", "true");

    await userEvent.click(dropdownElement);

    dropdownElement = getByRole("combobox");

    expect(dropdownElement).toHaveAttribute("aria-expanded", "false");
  });

  it("can be closed with click on cancel", async () => {
    const { getByRole, getByText } = render(<Main />);

    let dropdownElement = getByRole("combobox");

    await userEvent.click(dropdownElement);

    dropdownElement = getByRole("combobox");

    expect(dropdownElement).toHaveAttribute("aria-expanded", "true");

    const cancelButton = getByText("Cancel");

    await userEvent.click(cancelButton);

    dropdownElement = getByRole("combobox");

    expect(dropdownElement).toHaveAttribute("aria-expanded", "false");
  });

  it("apply button is disabled in the beginning", async () => {
    const { getByRole } = render(<Main />);

    let dropdownElement = getByRole("combobox");

    await userEvent.click(dropdownElement);

    dropdownElement = getByRole("combobox");

    expect(dropdownElement).toHaveAttribute("aria-expanded", "true");

    const applyButton = getByRole("button", { name: /apply/i });

    expect(applyButton).toBeDisabled();
  });

  it("clears all selected options and resets counter", async () => {
    const { getByRole, getAllByText, queryAllByText } = render(<Main />);

    let dropdownElement = getByRole("combobox");

    await userEvent.click(dropdownElement);

    dropdownElement = getByRole("combobox");

    expect(dropdownElement).toHaveAttribute("aria-expanded", "true");
    expect(getAllByText("4").length).toBe(1);
    expect(getAllByText("2").length).toBe(3);

    const clearFiltersButton = getByRole("button", {
      name: /clear filters/i,
    });

    await userEvent.click(clearFiltersButton);

    expect(queryAllByText("4").length).toBe(0);
    expect(queryAllByText("2").length).toBe(0);
  });

  it("resets all selected options to default value provided", async () => {
    const { getByRole, getAllByText } = render(<ResetToDefault />);

    let dropdownElement = getByRole("combobox");

    await userEvent.click(dropdownElement);

    dropdownElement = getByRole("combobox");

    expect(dropdownElement).toHaveAttribute("aria-expanded", "true");
    expect(getAllByText("3").length).toBe(1);
    expect(getAllByText("2").length).toBe(2);

    const resetFiltersButton = getByRole("button", { name: /reset/i });

    await userEvent.click(resetFiltersButton);

    expect(getAllByText("1").length).toBe(3);
  });

  it("changes the right side elements", async () => {
    render(<Main />);

    const dropdownElement = screen.getByRole("combobox");

    await userEvent.click(dropdownElement);
    expect(dropdownElement).toHaveAttribute("aria-expanded", "true");

    const [leftList, rightList] = screen.getAllByRole("list");

    expect(within(rightList).getAllByRole("listitem").length).toEqual(4);

    await userEvent.click(within(leftList).getAllByRole("listitem")[2]);

    const rightItems = within(screen.getAllByRole("list")[1]).getAllByRole(
      "listitem"
    );
    expect(rightItems.length).toEqual(12);
  });

  it("changes the counter in the expected locations", async () => {
    const { getByRole, getAllByText } = render(<Main />);

    let dropdownElement = getByRole("combobox");

    await userEvent.click(dropdownElement);

    dropdownElement = getByRole("combobox");

    expect(dropdownElement).toHaveAttribute("aria-expanded", "true");
    expect(getAllByText("4").length).toBe(1);
    expect(getAllByText("2").length).toBe(3);

    let checkBox1 = getByRole("checkbox", { name: /category 3/i });

    expect(checkBox1).not.toBeChecked();

    await userEvent.click(checkBox1);

    checkBox1 = getByRole("checkbox", { name: /category 3/i });

    expect(checkBox1).toBeChecked();
    expect(getAllByText("5").length).toBe(1);
    expect(getAllByText("2").length).toBe(1);
    expect(getAllByText("3").length).toBe(2);
  });

  it("apply button gets enabled after selecting an option", async () => {
    const { getByRole } = render(<Main />);

    let dropdownElement = getByRole("combobox");

    await userEvent.click(dropdownElement);

    dropdownElement = getByRole("combobox");

    expect(dropdownElement).toHaveAttribute("aria-expanded", "true");

    const checkBox1 = getByRole("checkbox", { name: /category 2/i });

    await userEvent.click(checkBox1);

    const applyButton = getByRole("button", { name: /apply/i });

    expect(applyButton).toBeEnabled();
  });

  it("changes are committed on apply", async () => {
    const { getByRole, getAllByText } = render(<Main />);

    let dropdownElement = getByRole("combobox");

    await userEvent.click(dropdownElement);

    dropdownElement = getByRole("combobox");

    expect(dropdownElement).toHaveAttribute("aria-expanded", "true");
    expect(getAllByText("4").length).toBe(1);

    const checkBox1 = getByRole("checkbox", { name: /category 2/i });

    await userEvent.click(checkBox1);

    const applyButton = getByRole("button", { name: /apply/i });

    await userEvent.click(applyButton);

    expect(getAllByText("3").length).toBe(1);
  });

  it("changes are canceled on cancel", async () => {
    const { getByRole, getAllByText } = render(<Main />);

    let dropdownElement = getByRole("combobox");

    await userEvent.click(dropdownElement);

    dropdownElement = getByRole("combobox");

    expect(dropdownElement).toHaveAttribute("aria-expanded", "true");
    expect(getAllByText("4").length).toBe(1);

    const checkBox1 = getByRole("checkbox", { name: /category 2/i });

    await userEvent.click(checkBox1);

    const cancelButton = getByRole("button", { name: /cancel/i });

    await userEvent.click(cancelButton);

    expect(getAllByText("4").length).toBe(1);
  });

  it("with an initial empty state, can select all options and counter is updated when changes are applied", async () => {
    render(<Main emptyValue />);

    const dropdownElement = screen.getByRole("combobox");

    await userEvent.click(dropdownElement);

    expect(dropdownElement).toHaveAttribute("aria-expanded", "true");

    const [leftList] = screen.getAllByRole("list");

    // Select second category
    await userEvent.click(within(leftList).getAllByRole("listitem")[1]);

    expect(within(leftList).getAllByRole("listitem")[1]).toHaveFocus();

    const checkboxes = screen.getAllByRole("checkbox");

    // Click on "All" checkbox
    await userEvent.click(checkboxes[0]);

    const applyButton = screen.getByRole("button", { name: /Apply/i });

    // Apply changes
    await userEvent.click(applyButton);

    expect(screen.getAllByText("4").length).toBe(1);
  });
});
