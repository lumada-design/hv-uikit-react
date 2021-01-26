/* eslint-env jest */

import React from "react";

import { render } from "testing-utils";
import userEvent from "@testing-library/user-event";

import { MultiSelectionWithShift } from "../stories/ListContainer.stories";

describe("ListContainerMultiSelectionGroup", () => {
  describe("sample snapshot testing", () => {
    it("Multi Selection List Container", () => {
      const { container } = render(<MultiSelectionWithShift />);
      expect(container).toMatchSnapshot();
    });
  });
});

describe("general behavior", () => {
  it("renders a list container in the expected order", () => {
    const { getByRole, getAllByRole } = render(<MultiSelectionWithShift />);

    const listContainer = getByRole("listbox", { name: "Stores" });
    expect(listContainer).toBeInTheDocument();

    const listItems = getAllByRole("option");
    expect(listItems.length).toBe(5);

    expect(listItems[0].innerHTML).toBe("98001, Store Manager");
    expect(listItems[1].innerHTML).toBe("98002, Store Manager");
    expect(listItems[2].innerHTML).toBe("98003, Store Manager");
    expect(listItems[3].innerHTML).toBe("98004, Store Manager");
    expect(listItems[4].innerHTML).toBe("98005, Store Manager");
  });

  describe("selection behavior", () => {
    it("has no items selected", () => {
      const { getAllByRole } = render(<MultiSelectionWithShift />);
      const listContainer = getAllByRole("option", { selected: false });
      expect(listContainer.length).toBe(5);
    });

    it("selects only single elements", () => {
      const { getByRole, getAllByRole } = render(<MultiSelectionWithShift />);
      const listContainer = getAllByRole("option", { selected: false });
      expect(listContainer.length).toBe(5);

      const firstItemInList = getByRole("option", { name: "98001, Store Manager" });
      const lastItemInList = getByRole("option", { name: "98005, Store Manager" });

      userEvent.click(firstItemInList);

      const selectionsInlistContainer = getAllByRole("option", { selected: true });
      expect(selectionsInlistContainer.length).toBe(1);

      userEvent.click(lastItemInList);
      expect(selectionsInlistContainer.length).toBe(1);
    });

    it("selects multiple elements when shift is pressed", () => {
      const { getByRole, getAllByRole } = render(<MultiSelectionWithShift />);
      const listContainer = getAllByRole("option", { selected: false });
      expect(listContainer.length).toBe(5);

      const firstItemInList = getByRole("option", { name: "98001, Store Manager" });
      const secondItemInList = getByRole("option", { name: "98002, Store Manager" });
      const thirdItemInList = getByRole("option", { name: "98003, Store Manager" });
      const fourthItemInList = getByRole("option", { name: "98004, Store Manager" });
      const fifthItemInList = getByRole("option", { name: "98005, Store Manager" });

      userEvent.click(firstItemInList);
      expect(getAllByRole("option", { selected: true }).length).toBe(1);

      userEvent.click(thirdItemInList, { ctrlKey: true, shiftKey: true });
      expect(getAllByRole("option", { selected: true }).length).toBe(3);

      userEvent.click(fifthItemInList, { ctrlKey: true, shiftKey: true });
      expect(getAllByRole("option", { selected: true }).length).toBe(5);

      userEvent.click(secondItemInList, { ctrlKey: true, shiftKey: true });
      expect(getAllByRole("option", { selected: true }).length).toBe(2);

      userEvent.click(fourthItemInList, { ctrlKey: true, shiftKey: true });
      expect(getAllByRole("option", { selected: true }).length).toBe(4);
    });

    it("alternates between single and multiple selection using shift", () => {
      const { getByRole, getAllByRole } = render(<MultiSelectionWithShift />);
      const listContainer = getAllByRole("option", { selected: false });
      expect(listContainer.length).toBe(5);

      const firstItemInList = getByRole("option", { name: "98001, Store Manager" });
      const secondItemInList = getByRole("option", { name: "98002, Store Manager" });
      const thirdItemInList = getByRole("option", { name: "98003, Store Manager" });
      const fourthItemInList = getByRole("option", { name: "98004, Store Manager" });
      const fifthItemInList = getByRole("option", { name: "98005, Store Manager" });

      userEvent.click(firstItemInList, { ctrlKey: false, shiftKey: false });
      expect(getAllByRole("option", { selected: true }).length).toBe(1);

      userEvent.click(thirdItemInList, { ctrlKey: true, shiftKey: true });
      expect(getAllByRole("option", { selected: true }).length).toBe(3);

      userEvent.click(fifthItemInList, { ctrlKey: false, shiftKey: false });
      expect(getAllByRole("option", { selected: true }).length).toBe(1);

      userEvent.click(fourthItemInList, { ctrlKey: false, shiftKey: false });
      expect(getAllByRole("option", { selected: true }).length).toBe(1);

      userEvent.click(secondItemInList, { ctrlKey: true, shiftKey: true });
      expect(getAllByRole("option", { selected: true }).length).toBe(3);
    });
  });
});
