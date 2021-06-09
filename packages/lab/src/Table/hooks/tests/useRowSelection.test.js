/* eslint-env jest */
import React from "react";

import userEvent from "@testing-library/user-event";

import { render } from "testing-utils";

import useRowSelection from "../useRowSelection";

import * as useRowSelectionHooks from "../useRowSelection";

describe("useHvRowSelection", () => {
  it("registers hooks", () => {
    const hooks = {
      visibleColumns: { push: jest.fn() },
      getRowProps: { push: jest.fn() },
    };

    useRowSelection(hooks);

    expect(hooks.visibleColumns.push).toHaveBeenCalledWith(useRowSelectionHooks.visibleColumnsHook);
    expect(hooks.getRowProps.push).toHaveBeenCalledWith(useRowSelectionHooks.getRowPropsHook);
  });

  describe("visibleColumnsHook", () => {
    it("adds aditional column", () => {
      const columns = [
        { Header: "Column 1" },
        { Header: "Column 2" },
        { Header: "Column 3" },
        { Header: "Column 4" },
      ];

      const instance = {};

      const processed = useRowSelectionHooks.visibleColumnsHook(columns, { instance });

      expect(processed.length).toEqual(5);

      // aditional column added
      expect(processed[0].id).toBe("_hv_selection");
      expect(processed[0].Cell).toBe(useRowSelectionHooks.CellWithCheckBox);
    });
  });

  describe("getRowPropsHook", () => {
    it("adds selected property (row.isSelected = true)", () => {
      const existingProps = {};

      const [existing, props] = useRowSelectionHooks.getRowPropsHook(existingProps, {
        row: { isSelected: true },
      });

      expect(props.selected).toBe(true);

      // should return the other properties
      expect(existing).toBe(existingProps);
    });

    it("adds selected property (row.isSelected = false)", () => {
      const existingProps = {};

      const [existing, props] = useRowSelectionHooks.getRowPropsHook(existingProps, {
        row: { isSelected: false },
      });

      expect(props.selected).toBe(false);

      // should return the other properties
      expect(existing).toBe(existingProps);
    });
  });

  describe("CellWithCheckBox", () => {
    it("snapshot", () => {
      const { CellWithCheckBox } = useRowSelectionHooks;

      const onChangeMock = jest.fn();

      const row = {
        getToggleRowSelectedProps: () => ({ onChange: onChangeMock, checked: true }),
      };

      const labels = {
        selectRowCheckBoxAriaLabel: "selectRowCheckBoxAriaLabel",
      };

      const { container } = render(<CellWithCheckBox row={row} labels={labels} />);
      expect(container).toMatchSnapshot();
    });

    it("creates the checkbox (checked)", () => {
      const { CellWithCheckBox } = useRowSelectionHooks;

      const onChangeMock = jest.fn();

      const row = {
        getToggleRowSelectedProps: () => ({ onChange: onChangeMock, checked: true }),
      };

      const { getByRole } = render(<CellWithCheckBox row={row} />);

      const checkbox = getByRole("checkbox");

      expect(checkbox).toBeInTheDocument();

      expect(checkbox).toBeChecked();
    });

    it("creates the checkbox (not checked)", () => {
      const { CellWithCheckBox } = useRowSelectionHooks;

      const onChangeMock = jest.fn();

      const row = {
        getToggleRowSelectedProps: () => ({ onChange: onChangeMock, checked: false }),
      };

      const { getByRole } = render(<CellWithCheckBox row={row} />);

      const checkbox = getByRole("checkbox");

      expect(checkbox).toBeInTheDocument();

      expect(checkbox).not.toBeChecked();
    });

    it("onChange is called", () => {
      const { CellWithCheckBox } = useRowSelectionHooks;

      const onChangeMock = jest.fn();

      const row = {
        getToggleRowSelectedProps: () => ({ onChange: onChangeMock, checked: true }),
      };

      const { getByRole } = render(<CellWithCheckBox row={row} />);

      const checkbox = getByRole("checkbox");

      expect(checkbox).toBeInTheDocument();

      userEvent.click(checkbox);

      expect(onChangeMock).toHaveBeenCalledTimes(1);
    });

    it("labels the checkbox (custom label)", () => {
      const { CellWithCheckBox } = useRowSelectionHooks;

      const onChangeMock = jest.fn();

      const row = {
        getToggleRowSelectedProps: () => ({ onChange: onChangeMock, checked: false }),
      };

      const labels = {
        selectRowCheckBoxAriaLabel: "selectRowCheckBoxAriaLabel",
      };

      const { getByRole } = render(<CellWithCheckBox row={row} labels={labels} />);

      const checkbox = getByRole("checkbox", { name: labels.selectRowCheckBoxAriaLabel });
      expect(checkbox).toBeInTheDocument();
    });

    it("labels the checkbox (default label)", () => {
      const { CellWithCheckBox, DEFAULT_LABELS } = useRowSelectionHooks;

      const onChangeMock = jest.fn();

      const row = {
        getToggleRowSelectedProps: () => ({ onChange: onChangeMock, checked: false }),
      };

      const { getByRole } = render(<CellWithCheckBox row={row} />);

      const checkbox = getByRole("checkbox", { name: DEFAULT_LABELS.selectRowCheckBoxAriaLabel });
      expect(checkbox).toBeInTheDocument();
    });
  });
});
