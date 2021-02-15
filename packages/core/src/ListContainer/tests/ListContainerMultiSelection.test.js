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

      userEvent.click(thirdItemInList, { shiftKey: true });
      expect(getAllByRole("option", { selected: true }).length).toBe(3);

      userEvent.click(fifthItemInList, { shiftKey: true });
      expect(getAllByRole("option", { selected: true }).length).toBe(5);

      userEvent.click(secondItemInList, { shiftKey: true });
      expect(getAllByRole("option", { selected: true }).length).toBe(2);

      userEvent.click(fourthItemInList, { shiftKey: true });
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

      userEvent.click(firstItemInList, { shiftKey: false });
      expect(getAllByRole("option", { selected: true }).length).toBe(1);

      userEvent.click(thirdItemInList, { shiftKey: true });
      expect(getAllByRole("option", { selected: true }).length).toBe(3);

      userEvent.click(fifthItemInList, { shiftKey: false });
      expect(getAllByRole("option", { selected: true }).length).toBe(1);

      userEvent.click(fourthItemInList, { shiftKey: false });
      expect(getAllByRole("option", { selected: true }).length).toBe(1);

      userEvent.click(secondItemInList, { shiftKey: true });
      expect(getAllByRole("option", { selected: true }).length).toBe(3);
    });

    it("select and desselect a single element when ctrlKey is pressed", () => {
      const { getByRole, getAllByRole } = render(<MultiSelectionWithShift />);
      const listContainer = getAllByRole("option", { selected: false });
      expect(listContainer.length).toBe(5);

      const firstItemInList = getByRole("option", { name: "98001, Store Manager" });

      userEvent.click(firstItemInList, { ctrltKey: true });
      expect(getAllByRole("option", { selected: true }).length).toBe(1);

      userEvent.click(firstItemInList, { ctrltKey: true });
      expect(getAllByRole("option", { selected: false }).length).toBe(5);
    });

    it("selects interspersed items when metaKey or ctrlKey is pressed", () => {
      const { getByRole, getAllByRole } = render(<MultiSelectionWithShift />);
      const listContainer = getAllByRole("option", { selected: false });
      expect(listContainer.length).toBe(5);

      const firstItemInList = getByRole("option", { name: "98001, Store Manager" });
      const thirdItemInList = getByRole("option", { name: "98003, Store Manager" });
      const fifthItemInList = getByRole("option", { name: "98005, Store Manager" });

      userEvent.click(firstItemInList, { metaKey: true });
      userEvent.click(thirdItemInList, { ctrlKey: true });
      userEvent.click(fifthItemInList, { metaKey: true });

      expect(getAllByRole("option", { selected: true }).length).toBe(3);
    });

    it("selects interspersed items when metaKey or ctrlKey is pressed and desselects a single item", () => {
      const { getByRole, getAllByRole } = render(<MultiSelectionWithShift />);
      const listContainer = getAllByRole("option", { selected: false });
      expect(listContainer.length).toBe(5);

      const firstItemInList = getByRole("option", { name: "98001, Store Manager" });
      const thirdItemInList = getByRole("option", { name: "98003, Store Manager" });
      const fifthItemInList = getByRole("option", { name: "98005, Store Manager" });

      userEvent.click(firstItemInList, { ctrlKey: true });
      userEvent.click(thirdItemInList, { metaKey: true });
      userEvent.click(fifthItemInList, { metaKey: true });
      userEvent.click(fifthItemInList, { ctrlKey: true });

      expect(getAllByRole("option", { selected: true }).length).toBe(2);
    });

    it("deselects items when metaKey or ctrlKey from a selection made using shift+click", () => {
      const { getByRole, getAllByRole } = render(<MultiSelectionWithShift />);
      const listContainer = getAllByRole("option", { selected: false });
      expect(listContainer.length).toBe(5);

      const firstItemInList = getByRole("option", { name: "98001, Store Manager" });
      const thirdItemInList = getByRole("option", { name: "98003, Store Manager" });
      const fifthItemInList = getByRole("option", { name: "98005, Store Manager" });

      userEvent.click(firstItemInList);
      expect(getAllByRole("option", { selected: true }).length).toBe(1);

      userEvent.click(fifthItemInList, { shiftKey: true });
      expect(getAllByRole("option", { selected: true }).length).toBe(5);

      userEvent.click(thirdItemInList, { metaKey: true });
      userEvent.click(fifthItemInList, { ctrlKey: true });

      expect(getAllByRole("option", { selected: true }).length).toBe(3);
    });

    it("correctly set selection anchors when alternating between shift+select and ctrl/meta+select", () => {
      const { getByRole, getAllByRole } = render(<MultiSelectionWithShift />);
      const listContainer = getAllByRole("option", { selected: false });
      expect(listContainer.length).toBe(5);

      const firstItemInList = getByRole("option", { name: "98001, Store Manager" });
      const thirdItemInList = getByRole("option", { name: "98003, Store Manager" });
      const fifthItemInList = getByRole("option", { name: "98005, Store Manager" });

      userEvent.click(firstItemInList, { metaKey: true });
      userEvent.click(thirdItemInList, { ctrlKey: true });
      userEvent.click(fifthItemInList, { shiftKey: true });

      expect(getAllByRole("option", { selected: true }).length).toBe(4);
    });

    it("correctly set anchors when alternating ctrl/meta+select and shift+select", () => {
      const { getByRole, getAllByRole } = render(<MultiSelectionWithShift />);
      const listContainer = getAllByRole("option", { selected: false });
      expect(listContainer.length).toBe(5);

      const firstItemInList = getByRole("option", { name: "98001, Store Manager" });
      const thirdItemInList = getByRole("option", { name: "98003, Store Manager" });
      const fifthItemInList = getByRole("option", { name: "98005, Store Manager" });

      userEvent.click(firstItemInList, { metaKey: true });
      userEvent.click(fifthItemInList, { shiftKey: true });
      expect(getAllByRole("option", { selected: true }).length).toBe(5);

      userEvent.click(thirdItemInList, { metaKey: true });
      expect(getAllByRole("option", { selected: true }).length).toBe(4);

      userEvent.click(firstItemInList, { shiftKey: true });
      expect(getAllByRole("option", { selected: true }).length).toBe(3);
    });

    it("correctly set anchors and flip selection", () => {
      const { getByRole, getAllByRole } = render(<MultiSelectionWithShift />);
      const listContainer = getAllByRole("option", { selected: false });
      expect(listContainer.length).toBe(5);

      const firstItemInList = getByRole("option", { name: "98001, Store Manager" });
      const thirdItemInList = getByRole("option", { name: "98003, Store Manager" });
      const fifthItemInList = getByRole("option", { name: "98005, Store Manager" });

      userEvent.click(firstItemInList, { shiftKey: true });
      userEvent.click(fifthItemInList, { shiftKey: true });
      expect(getAllByRole("option", { selected: true }).length).toBe(5);

      userEvent.click(thirdItemInList, { metaKey: true });
      expect(getAllByRole("option", { selected: true }).length).toBe(4);

      userEvent.click(firstItemInList, { shiftKey: true });

      const selectedItems = getAllByRole("option", { selected: true });
      expect(selectedItems.length).toBe(3);

      expect(selectedItems[0].innerHTML).toBe("98001, Store Manager");
      expect(selectedItems[1].innerHTML).toBe("98002, Store Manager");
      expect(selectedItems[2].innerHTML).toBe("98003, Store Manager");

      userEvent.click(fifthItemInList, { shiftKey: true });

      const reversedSelectionItems = getAllByRole("option", { selected: true });
      expect(reversedSelectionItems.length).toBe(3);

      expect(reversedSelectionItems[0].innerHTML).toBe("98003, Store Manager");
      expect(reversedSelectionItems[1].innerHTML).toBe("98004, Store Manager");
      expect(reversedSelectionItems[2].innerHTML).toBe("98005, Store Manager");
    });
  });
});
