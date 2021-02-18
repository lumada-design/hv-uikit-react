/* eslint-env jest */

import React from "react";

import { render } from "testing-utils";
import userEvent from "@testing-library/user-event";

import { ShiftSelect } from "../stories/CheckBoxGroup.stories";

describe("CheckboxGroupSelection", () => {
  describe("sample snapshot testing", () => {
    it("Multi Selection List Container", () => {
      const { container } = render(<ShiftSelect />);
      expect(container).toMatchSnapshot();
    });
  });
});

describe("general behavior", () => {
  it("renders a checkbox container in the expected order", () => {
    const { getByRole, getAllByRole } = render(<ShiftSelect />);

    const checkboxContainer = getByRole("group");
    expect(checkboxContainer).toBeInTheDocument();

    // children ordered and rendered as expected
    const checkboxes = getAllByRole("checkbox");
    expect(checkboxes.length).toBe(6);

    expect(checkboxes[0].value).toBe("1");
    expect(checkboxes[1].value).toBe("2");
    expect(checkboxes[2].value).toBe("3");
    expect(checkboxes[3].value).toBe("4");
    expect(checkboxes[4].value).toBe("5");
    expect(checkboxes[5].value).toBe("6");
  });
  describe("selection behavior", () => {
    it("selects a single item", () => {
      const { getAllByRole, getByLabelText } = render(<ShiftSelect />);
      const checkboxes = getAllByRole("checkbox");

      expect(checkboxes[0]).not.toBeChecked();
      expect(checkboxes[1]).not.toBeChecked();
      expect(checkboxes[2]).not.toBeChecked();
      expect(checkboxes[3]).not.toBeChecked();
      expect(checkboxes[4]).not.toBeChecked();
      expect(checkboxes[5]).not.toBeChecked();

      const checkbox1 = getByLabelText("Checkbox 1");
      userEvent.click(checkbox1);

      expect(checkboxes[0]).toBeChecked();
      expect(checkboxes[1]).not.toBeChecked();
      expect(checkboxes[2]).not.toBeChecked();
      expect(checkboxes[3]).not.toBeChecked();
      expect(checkboxes[4]).not.toBeChecked();
      expect(checkboxes[5]).not.toBeChecked();
    });

    it("selects a single item when shift is pressed", () => {
      const { getAllByRole, getByLabelText } = render(<ShiftSelect />);
      const checkboxes = getAllByRole("checkbox");

      expect(checkboxes[0]).not.toBeChecked();
      expect(checkboxes[1]).not.toBeChecked();
      expect(checkboxes[2]).not.toBeChecked();
      expect(checkboxes[3]).not.toBeChecked();
      expect(checkboxes[4]).not.toBeChecked();
      expect(checkboxes[5]).not.toBeChecked();

      const checkbox1 = getByLabelText("Checkbox 1");
      userEvent.click(checkbox1, { shiftKey: true });

      expect(checkboxes[0]).toBeChecked();
      expect(checkboxes[1]).not.toBeChecked();
      expect(checkboxes[2]).not.toBeChecked();
      expect(checkboxes[3]).not.toBeChecked();
      expect(checkboxes[4]).not.toBeChecked();
      expect(checkboxes[5]).not.toBeChecked();
    });

    it("selects items in a range when shift is pressed", () => {
      const { getAllByRole, getByLabelText } = render(<ShiftSelect />);
      const checkboxes = getAllByRole("checkbox");

      expect(checkboxes[0]).not.toBeChecked();
      expect(checkboxes[1]).not.toBeChecked();
      expect(checkboxes[2]).not.toBeChecked();
      expect(checkboxes[3]).not.toBeChecked();
      expect(checkboxes[4]).not.toBeChecked();
      expect(checkboxes[5]).not.toBeChecked();

      const checkbox1 = getByLabelText("Checkbox 1");
      const checkbox6 = getByLabelText("Checkbox 6");
      userEvent.click(checkbox1, { shiftKey: true });
      userEvent.click(checkbox6, { shiftKey: true });

      expect(checkboxes[0]).toBeChecked();
      expect(checkboxes[1]).toBeChecked();
      expect(checkboxes[2]).toBeChecked();
      expect(checkboxes[3]).toBeChecked();
      expect(checkboxes[4]).toBeChecked();
      expect(checkboxes[5]).toBeChecked();
    });

    it("deselects an item using metaKey after shift selection", () => {
      const { getAllByRole, getByLabelText } = render(<ShiftSelect />);
      const checkboxes = getAllByRole("checkbox");

      expect(checkboxes[0]).not.toBeChecked();
      expect(checkboxes[1]).not.toBeChecked();
      expect(checkboxes[2]).not.toBeChecked();
      expect(checkboxes[3]).not.toBeChecked();
      expect(checkboxes[4]).not.toBeChecked();
      expect(checkboxes[5]).not.toBeChecked();

      const checkbox1 = getByLabelText("Checkbox 1");
      const checkbox6 = getByLabelText("Checkbox 6");
      userEvent.click(checkbox1, { shiftKey: true });
      userEvent.click(checkbox6, { shiftKey: true });

      expect(checkboxes[0]).toBeChecked();
      expect(checkboxes[1]).toBeChecked();
      expect(checkboxes[2]).toBeChecked();
      expect(checkboxes[3]).toBeChecked();
      expect(checkboxes[4]).toBeChecked();
      expect(checkboxes[5]).toBeChecked();

      const checkbox3 = getByLabelText("Checkbox 3");
      userEvent.click(checkbox3, { metaKey: true });

      expect(checkboxes[0]).toBeChecked();
      expect(checkboxes[1]).toBeChecked();
      expect(checkboxes[2]).not.toBeChecked();
      expect(checkboxes[3]).toBeChecked();
      expect(checkboxes[4]).toBeChecked();
      expect(checkboxes[5]).toBeChecked();
    });

    it("selects alternates items using metaKey", () => {
      const { getAllByRole, getByLabelText } = render(<ShiftSelect />);
      const checkboxes = getAllByRole("checkbox");

      expect(checkboxes[0]).not.toBeChecked();
      expect(checkboxes[1]).not.toBeChecked();
      expect(checkboxes[2]).not.toBeChecked();
      expect(checkboxes[3]).not.toBeChecked();
      expect(checkboxes[4]).not.toBeChecked();
      expect(checkboxes[5]).not.toBeChecked();

      const checkbox1 = getByLabelText("Checkbox 1");
      const checkbox3 = getByLabelText("Checkbox 3");
      const checkbox6 = getByLabelText("Checkbox 6");
      userEvent.click(checkbox1, { metaKey: true });
      userEvent.click(checkbox3, { metaKey: true });
      userEvent.click(checkbox6, { metaKey: true });

      expect(checkboxes[0]).toBeChecked();
      expect(checkboxes[1]).not.toBeChecked();
      expect(checkboxes[2]).toBeChecked();
      expect(checkboxes[3]).not.toBeChecked();
      expect(checkboxes[4]).not.toBeChecked();
      expect(checkboxes[5]).toBeChecked();
    });

    it("flips selected items using shiftKey and metaKey", () => {
      const { getAllByRole, getByLabelText } = render(<ShiftSelect />);
      const checkboxes = getAllByRole("checkbox");

      expect(checkboxes[0]).not.toBeChecked();
      expect(checkboxes[1]).not.toBeChecked();
      expect(checkboxes[2]).not.toBeChecked();
      expect(checkboxes[3]).not.toBeChecked();
      expect(checkboxes[4]).not.toBeChecked();
      expect(checkboxes[5]).not.toBeChecked();

      const checkbox1 = getByLabelText("Checkbox 1");
      const checkbox3 = getByLabelText("Checkbox 3");
      const checkbox6 = getByLabelText("Checkbox 6");
      userEvent.click(checkbox1, { metaKey: true });
      userEvent.click(checkbox3, { metaKey: true });
      userEvent.click(checkbox6, { shiftKey: true });

      expect(checkboxes[0]).not.toBeChecked();
      expect(checkboxes[1]).not.toBeChecked();
      expect(checkboxes[2]).toBeChecked();
      expect(checkboxes[3]).toBeChecked();
      expect(checkboxes[4]).toBeChecked();
      expect(checkboxes[5]).toBeChecked();

      userEvent.click(checkbox1, { shiftKey: true });

      expect(checkboxes[0]).toBeChecked();
      expect(checkboxes[1]).toBeChecked();
      expect(checkboxes[2]).toBeChecked();
      expect(checkboxes[3]).not.toBeChecked();
      expect(checkboxes[4]).not.toBeChecked();
      expect(checkboxes[5]).not.toBeChecked();
    });
  });
});
