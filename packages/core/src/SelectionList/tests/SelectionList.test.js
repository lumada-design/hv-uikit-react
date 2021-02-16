/* eslint-env jest */

import React from "react";

import { render } from "testing-utils";
import userEvent from "@testing-library/user-event";

import { Main, MultiSelection, CleanMultiSelection } from "../stories/SelectionList.stories";

describe("Selection List", () => {
  describe("Single Selection List testing", () => {
    describe("Selection List Snapshot testing", () => {
      it("Selection List Container", () => {
        const { container } = render(<Main />);
        expect(container).toMatchSnapshot();
      });
    });

    describe("Selection List Selection Behavior Testing", () => {
      it("has a single item selected", () => {
        const { getAllByRole } = render(<Main />);

        const listItems = getAllByRole("option");
        expect(listItems.length).toBe(3);

        const selectedItems = getAllByRole("option", { selected: true });
        expect(selectedItems.length).toBe(1);
        expect(selectedItems[0].innerHTML).toBe("ListItem 2");
      });

      it("renders a list container in the expected order", () => {
        const { getByRole, getAllByRole } = render(<Main />);

        const listContainer = getByRole("listbox");
        expect(listContainer).toBeInTheDocument();

        const listItems = getAllByRole("option");
        expect(listItems.length).toBe(3);

        expect(listItems[0].innerHTML).toBe("ListItem 1");
        expect(listItems[1].innerHTML).toBe("ListItem 2");
        expect(listItems[2].innerHTML).toBe("ListItem 3");
      });
    });
  });

  describe("Multi Selection List testing", () => {
    describe("Multi Selection Snapshot", () => {
      it("Multi Selection List Container Snapshot", () => {
        const { container } = render(<MultiSelection />);
        expect(container).toMatchSnapshot();
      });
    });

    describe("Selection List Multi Selection Behavior Testing", () => {
      it("has a single item selected", () => {
        const { getAllByRole } = render(<MultiSelection />);

        const listItems = getAllByRole("option");
        expect(listItems.length).toBe(6);

        const selectedItems = getAllByRole("option", { selected: true });
        expect(selectedItems.length).toBe(1);
        expect(selectedItems[0].innerHTML).toBe("ListItem 2");
      });

      it("selects multiple items", () => {
        const { getByRole, getAllByRole } = render(<MultiSelection />);

        const listItems = getAllByRole("option");
        expect(listItems.length).toBe(6);

        const selectedItems = getAllByRole("option", { selected: true });
        expect(selectedItems.length).toBe(1);
        expect(selectedItems[0].innerHTML).toBe("ListItem 2");

        const firstItemInList = getByRole("option", { name: "ListItem 1" });
        const thirdItemInList = getByRole("option", { name: "ListItem 3" });
        const fifthItemInList = getByRole("option", { name: "ListItem 5" });

        userEvent.click(firstItemInList);
        userEvent.click(thirdItemInList);
        userEvent.click(fifthItemInList);

        const postIteractionSelectedItems = getAllByRole("option", { selected: true });
        expect(postIteractionSelectedItems.length).toBe(4);
        expect(postIteractionSelectedItems[0].innerHTML).toBe("ListItem 1");
        expect(postIteractionSelectedItems[1].innerHTML).toBe("ListItem 2");
        expect(postIteractionSelectedItems[2].innerHTML).toBe("ListItem 3");
        expect(postIteractionSelectedItems[3].innerHTML).toBe("ListItem 5");
      });

      it("selects and deselects multiple items", () => {
        const { getByRole, getAllByRole } = render(<MultiSelection />);

        const listItems = getAllByRole("option");
        expect(listItems.length).toBe(6);

        const selectedItems = getAllByRole("option", { selected: true });
        expect(selectedItems.length).toBe(1);
        expect(selectedItems[0].innerHTML).toBe("ListItem 2");

        const firstItemInList = getByRole("option", { name: "ListItem 1" });
        const secondItemInList = getByRole("option", { name: "ListItem 2" });

        userEvent.click(firstItemInList);
        userEvent.click(secondItemInList);
        userEvent.click(firstItemInList);

        const postInteractionSelectedItems = getAllByRole("option", { selected: false });
        expect(postInteractionSelectedItems.length).toBe(6);
      });
    });

    describe("Shift + Click Selection", () => {
      it("has no items selected", () => {
        const { getAllByRole } = render(<CleanMultiSelection />);
        const listContainer = getAllByRole("option", { selected: false });
        expect(listContainer.length).toBe(6);
      });

      it("selects only single elements", () => {
        const { getByRole, getAllByRole } = render(<CleanMultiSelection />);
        const listContainer = getAllByRole("option", { selected: false });
        expect(listContainer.length).toBe(6);

        const firstItemInList = getByRole("option", { name: "ListItem 1" });
        const lastItemInList = getByRole("option", { name: "ListItem 2" });

        userEvent.click(firstItemInList);

        const selectionsInlistContainer = getAllByRole("option", { selected: true });
        expect(selectionsInlistContainer.length).toBe(1);

        userEvent.click(lastItemInList);
        expect(selectionsInlistContainer.length).toBe(1);
      });

      it("selects multiple elements when shift is pressed", () => {
        const { getByRole, getAllByRole } = render(<CleanMultiSelection />);
        const listContainer = getAllByRole("option", { selected: false });
        expect(listContainer.length).toBe(6);

        const firstItemInList = getByRole("option", { name: "ListItem 1" });
        const secondItemInList = getByRole("option", { name: "ListItem 2" });
        const thirdItemInList = getByRole("option", { name: "ListItem 3" });
        const fourthItemInList = getByRole("option", { name: "ListItem 4" });
        const fifthItemInList = getByRole("option", { name: "ListItem 5" });
        const sixthItemInList = getByRole("option", { name: "ListItem 6" });

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

        userEvent.click(sixthItemInList, { shiftKey: true });
        expect(getAllByRole("option", { selected: true }).length).toBe(6);
      });

      it("select and desselect a single element when ctrlKey is pressed", () => {
        const { getByRole, getAllByRole } = render(<CleanMultiSelection />);
        const listContainer = getAllByRole("option", { selected: false });
        expect(listContainer.length).toBe(6);

        const firstItemInList = getByRole("option", { name: "ListItem 1" });

        userEvent.click(firstItemInList, { ctrltKey: true });
        expect(getAllByRole("option", { selected: true }).length).toBe(1);

        userEvent.click(firstItemInList, { ctrltKey: true });
        expect(getAllByRole("option", { selected: false }).length).toBe(6);
      });

      it("selects interspersed items when metaKey or ctrlKey is pressed", () => {
        const { getByRole, getAllByRole } = render(<CleanMultiSelection />);
        const listContainer = getAllByRole("option", { selected: false });
        expect(listContainer.length).toBe(6);

        const firstItemInList = getByRole("option", { name: "ListItem 1" });
        const thirdItemInList = getByRole("option", { name: "ListItem 3" });
        const fifthItemInList = getByRole("option", { name: "ListItem 5" });

        userEvent.click(firstItemInList, { metaKey: true });
        userEvent.click(thirdItemInList, { ctrlKey: true });
        userEvent.click(fifthItemInList, { metaKey: true });

        expect(getAllByRole("option", { selected: true }).length).toBe(3);
      });

      it("selects interspersed items when metaKey or ctrlKey is pressed and desselects a single item", () => {
        const { getByRole, getAllByRole } = render(<CleanMultiSelection />);
        const listContainer = getAllByRole("option", { selected: false });
        expect(listContainer.length).toBe(6);

        const firstItemInList = getByRole("option", { name: "ListItem 1" });
        const thirdItemInList = getByRole("option", { name: "ListItem 3" });
        const fifthItemInList = getByRole("option", { name: "ListItem 5" });

        userEvent.click(firstItemInList, { ctrlKey: true });
        userEvent.click(thirdItemInList, { metaKey: true });
        userEvent.click(fifthItemInList, { metaKey: true });
        userEvent.click(fifthItemInList, { ctrlKey: true });

        expect(getAllByRole("option", { selected: true }).length).toBe(2);
      });

      it("deselects items when metaKey or ctrlKey from a selection made using shift+click", () => {
        const { getByRole, getAllByRole } = render(<CleanMultiSelection />);
        const listContainer = getAllByRole("option", { selected: false });
        expect(listContainer.length).toBe(6);

        const firstItemInList = getByRole("option", { name: "ListItem 1" });
        const thirdItemInList = getByRole("option", { name: "ListItem 3" });
        const fifthItemInList = getByRole("option", { name: "ListItem 5" });

        userEvent.click(firstItemInList);
        expect(getAllByRole("option", { selected: true }).length).toBe(1);

        userEvent.click(fifthItemInList, { shiftKey: true });
        expect(getAllByRole("option", { selected: true }).length).toBe(5);

        userEvent.click(thirdItemInList, { metaKey: true });
        userEvent.click(fifthItemInList, { ctrlKey: true });

        expect(getAllByRole("option", { selected: true }).length).toBe(3);
      });

      it("correctly set selection anchors when alternating between shift+select and ctrl/meta+select", () => {
        const { getByRole, getAllByRole } = render(<CleanMultiSelection />);
        const listContainer = getAllByRole("option", { selected: false });
        expect(listContainer.length).toBe(6);

        const firstItemInList = getByRole("option", { name: "ListItem 1" });
        const thirdItemInList = getByRole("option", { name: "ListItem 3" });
        const fifthItemInList = getByRole("option", { name: "ListItem 5" });

        userEvent.click(firstItemInList, { metaKey: true });
        userEvent.click(thirdItemInList, { ctrlKey: true });
        userEvent.click(fifthItemInList, { shiftKey: true });

        expect(getAllByRole("option", { selected: true }).length).toBe(3);
      });

      it("correctly set anchors when alternating ctrl/meta+select and shift+select", () => {
        const { getByRole, getAllByRole } = render(<CleanMultiSelection />);
        const listContainer = getAllByRole("option", { selected: false });
        expect(listContainer.length).toBe(6);

        const firstItemInList = getByRole("option", { name: "ListItem 1" });
        const thirdItemInList = getByRole("option", { name: "ListItem 3" });
        const fifthItemInList = getByRole("option", { name: "ListItem 5" });

        userEvent.click(firstItemInList, { metaKey: true });
        userEvent.click(fifthItemInList, { shiftKey: true });
        expect(getAllByRole("option", { selected: true }).length).toBe(5);

        userEvent.click(thirdItemInList, { metaKey: true });
        expect(getAllByRole("option", { selected: true }).length).toBe(4);

        userEvent.click(firstItemInList, { shiftKey: true });
        expect(getAllByRole("option", { selected: true }).length).toBe(3);
      });

      it("correctly set anchors and flip selection", () => {
        const { getByRole, getAllByRole } = render(<CleanMultiSelection />);
        const listContainer = getAllByRole("option", { selected: false });
        expect(listContainer.length).toBe(6);

        const firstItemInList = getByRole("option", { name: "ListItem 1" });
        const thirdItemInList = getByRole("option", { name: "ListItem 3" });
        const fifthItemInList = getByRole("option", { name: "ListItem 5" });

        userEvent.click(firstItemInList, { shiftKey: true });
        userEvent.click(fifthItemInList, { shiftKey: true });
        expect(getAllByRole("option", { selected: true }).length).toBe(5);

        userEvent.click(thirdItemInList, { metaKey: true });
        expect(getAllByRole("option", { selected: true }).length).toBe(4);

        userEvent.click(firstItemInList, { shiftKey: true });

        const selectedItems = getAllByRole("option", { selected: true });
        expect(selectedItems.length).toBe(3);

        expect(selectedItems[0].innerHTML).toBe("ListItem 1");
        expect(selectedItems[1].innerHTML).toBe("ListItem 2");
        expect(selectedItems[2].innerHTML).toBe("ListItem 3");

        userEvent.click(fifthItemInList, { shiftKey: true });

        const reversedSelectionItems = getAllByRole("option", { selected: true });
        expect(reversedSelectionItems.length).toBe(3);

        expect(reversedSelectionItems[0].innerHTML).toBe("ListItem 3");
        expect(reversedSelectionItems[1].innerHTML).toBe("ListItem 4");
        expect(reversedSelectionItems[2].innerHTML).toBe("ListItem 5");
      });

      it("selects all items between when shift+click on first and last item in list", () => {
        const { getByRole, getAllByRole } = render(<CleanMultiSelection />);

        const listItems = getAllByRole("option");
        expect(listItems.length).toBe(6);

        const selectedItems = getAllByRole("option", { selected: false });
        expect(selectedItems.length).toBe(6);

        const firstItemInList = getByRole("option", { name: "ListItem 1" });
        const lastItemInList = getByRole("option", { name: "ListItem 6" });

        userEvent.click(firstItemInList, { shiftKey: true });
        userEvent.click(lastItemInList, { shiftKey: true });

        const postInteractionSelectedItems = getAllByRole("option", { selected: true });
        expect(postInteractionSelectedItems.length).toBe(6);
      });
    });
  });
});
