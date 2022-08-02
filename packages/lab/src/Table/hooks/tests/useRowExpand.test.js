/* eslint-env jest */
import React from "react";

import userEvent from "@testing-library/user-event";

import { render } from "testing-utils";

import useRowExpand from "../useRowExpand";

import * as useRowExpandHooks from "../useRowExpand";

describe("useHvRowExpand", () => {
  it("registers hooks", () => {
    const hooks = {
      visibleColumns: { push: jest.fn() },
      getRowProps: { push: jest.fn() },
    };

    useRowExpand(hooks);

    expect(hooks.visibleColumns.push).toHaveBeenCalledWith(useRowExpandHooks.visibleColumnsHook);
    expect(hooks.getRowProps.push).toHaveBeenCalledWith(useRowExpandHooks.getRowPropsHook);
  });

  describe("visibleColumnsHook", () => {
    it("regular columns", () => {
      const columns = [
        { Header: "Column 1" },
        { Header: "Column 2" },
        { Header: "Column 3" },
        { Header: "Column 4" },
      ];

      const instance = {};

      const processed = useRowExpandHooks.visibleColumnsHook(columns, { instance });

      expect(processed.length).toEqual(4);

      // first column should be augmented with a custom renderer
      expect(processed[0].Cell).toBe(useRowExpandHooks.CellWithExpandButton);
    });

    it("with system columns", () => {
      const columns = [
        { Header: "Column 1", id: "_hv_selection" },
        { Header: "Column 2", id: "_hv_something" },
        { Header: "Column 3" },
        { Header: "Column 4" },
      ];

      const instance = {};

      const processed = useRowExpandHooks.visibleColumnsHook(columns, { instance });

      expect(processed.length).toEqual(4);

      // first non-system column should be augmented with a custom renderer
      expect(processed[2].Cell).toBe(useRowExpandHooks.CellWithExpandButton);
    });

    it("with custom renderer", () => {
      const columns = [
        { Header: "Column 1", Cell: () => {} },
        { Header: "Column 2" },
        { Header: "Column 3" },
        { Header: "Column 4" },
      ];

      const instance = {};

      const processed = useRowExpandHooks.visibleColumnsHook(columns, { instance });

      expect(processed.length).toEqual(5);

      // aditional column added
      expect(processed[0].id).toBe("_hv_expand");
      expect(processed[0].Cell).toBe(useRowExpandHooks.CellWithExpandButton);
    });

    it("with custom renderer and system columns", () => {
      const columns = [
        { Header: "Column 1", id: "_hv_selection" },
        { Header: "Column 2", id: "_hv_something" },
        { Header: "Column 3", Cell: () => {} },
        { Header: "Column 4" },
      ];

      const instance = {};

      const processed = useRowExpandHooks.visibleColumnsHook(columns, { instance });

      expect(processed.length).toEqual(5);

      // aditional column added after the system columns
      expect(processed[2].id).toBe("_hv_expand");
      expect(processed[2].Cell).toBe(useRowExpandHooks.CellWithExpandButton);
    });
  });

  describe("getRowPropsHook", () => {
    it("adds expanded property (row.isExpanded = true)", () => {
      const existingProps = {};

      const [existing, props] = useRowExpandHooks.getRowPropsHook(existingProps, {
        row: { isExpanded: true },
      });

      expect(props.expanded).toBe(true);

      // should return the other properties
      expect(existing).toBe(existingProps);
    });

    it("adds expanded property (row.isExpanded = false)", () => {
      const existingProps = {};

      const [existing, props] = useRowExpandHooks.getRowPropsHook(existingProps, {
        row: { isExpanded: false },
      });

      expect(props.expanded).toBe(false);

      // should return the other properties
      expect(existing).toBe(existingProps);
    });
  });

  describe("CellWithExpandButton", () => {
    describe("snapshots", () => {
      it("as an augmented cell", () => {
        const { CellWithExpandButton } = useRowExpandHooks;

        const onClickMock = jest.fn();

        const row = {
          isExpanded: false,
          getToggleRowExpandedProps: () => ({ onClick: onClickMock }),
        };

        const cell = {
          value: "Text",
        };

        const labels = {
          expandRowButtonAriaLabel: "expandRowButtonAriaLabel",
          collapseRowButtonAriaLabel: "collapseRowButtonAriaLabel",
        };

        const { container } = render(
          <CellWithExpandButton row={row} cell={cell} labels={labels} />
        );
        expect(container).toMatchSnapshot();
      });

      it("as an additional system column", () => {
        const { CellWithExpandButton } = useRowExpandHooks;

        const onClickMock = jest.fn();

        const row = {
          isExpanded: false,
          getToggleRowExpandedProps: () => ({ onClick: onClickMock }),
        };

        const labels = {
          expandRowButtonAriaLabel: "expandRowButtonAriaLabel",
          collapseRowButtonAriaLabel: "collapseRowButtonAriaLabel",
        };

        const { container } = render(<CellWithExpandButton row={row} labels={labels} />);
        expect(container).toMatchSnapshot();
      });
    });

    describe("the expand button", () => {
      it("creates the button", () => {
        const { CellWithExpandButton } = useRowExpandHooks;

        const onClickMock = jest.fn();

        const row = {
          isExpanded: false,
          getToggleRowExpandedProps: () => ({ onClick: onClickMock }),
        };

        const { getByRole } = render(<CellWithExpandButton row={row} />);

        const button = getByRole("button");

        expect(button).toBeInTheDocument();

        expect(onClickMock).toHaveBeenCalledTimes(0);

        userEvent.click(button);

        expect(onClickMock).toHaveBeenCalledTimes(1);
      });

      it("labels the button (custom labels, isExpanded: false)", () => {
        const { CellWithExpandButton } = useRowExpandHooks;

        const onClickMock = jest.fn();

        const row = {
          isExpanded: false,
          getToggleRowExpandedProps: () => ({ onClick: onClickMock }),
        };

        const labels = {
          expandRowButtonAriaLabel: "expandRowButtonAriaLabel",
          collapseRowButtonAriaLabel: "collapseRowButtonAriaLabel",
        };

        const { queryByRole } = render(<CellWithExpandButton row={row} labels={labels} />);

        let button = queryByRole("button", { name: labels.collapseRowButtonAriaLabel });
        expect(button).not.toBeInTheDocument();

        button = queryByRole("button", { name: labels.expandRowButtonAriaLabel });
        expect(button).toBeInTheDocument();
      });

      it("labels the button (custom labels, isExpanded: true)", () => {
        const { CellWithExpandButton } = useRowExpandHooks;

        const onClickMock = jest.fn();

        const row = {
          isExpanded: true,
          getToggleRowExpandedProps: () => ({ onClick: onClickMock }),
        };

        const labels = {
          expandRowButtonAriaLabel: "expandRowButtonAriaLabel",
          collapseRowButtonAriaLabel: "collapseRowButtonAriaLabel",
        };

        const { queryByRole } = render(<CellWithExpandButton row={row} labels={labels} />);

        let button = queryByRole("button", { name: labels.expandRowButtonAriaLabel });
        expect(button).not.toBeInTheDocument();

        button = queryByRole("button", { name: labels.collapseRowButtonAriaLabel });
        expect(button).toBeInTheDocument();
      });

      it("labels the button (default labels, isExpanded: false)", () => {
        const { CellWithExpandButton, DEFAULT_LABELS } = useRowExpandHooks;

        const onClickMock = jest.fn();

        const row = {
          isExpanded: false,
          getToggleRowExpandedProps: () => ({ onClick: onClickMock }),
        };

        const { queryByRole } = render(<CellWithExpandButton row={row} />);

        let button = queryByRole("button", { name: DEFAULT_LABELS.collapseRowButtonAriaLabel });
        expect(button).not.toBeInTheDocument();

        button = queryByRole("button", { name: DEFAULT_LABELS.expandRowButtonAriaLabel });
        expect(button).toBeInTheDocument();
      });

      it("labels the button (default labels, isExpanded: true)", () => {
        const { CellWithExpandButton, DEFAULT_LABELS } = useRowExpandHooks;

        const onClickMock = jest.fn();

        const row = {
          isExpanded: true,
          getToggleRowExpandedProps: () => ({ onClick: onClickMock }),
        };

        const { queryByRole } = render(<CellWithExpandButton row={row} />);

        let button = queryByRole("button", { name: DEFAULT_LABELS.expandRowButtonAriaLabel });
        expect(button).not.toBeInTheDocument();

        button = queryByRole("button", { name: DEFAULT_LABELS.collapseRowButtonAriaLabel });
        expect(button).toBeInTheDocument();
      });
    });

    describe("the cell value", () => {
      it("renders the value", () => {
        const { CellWithExpandButton } = useRowExpandHooks;

        const onClickMock = jest.fn();

        const row = {
          isExpanded: false,
          getToggleRowExpandedProps: () => ({ onClick: onClickMock }),
        };

        const cell = {
          value: "Text",
        };

        const { getByText } = render(<CellWithExpandButton row={row} cell={cell} />);

        const span = getByText(cell.value);

        expect(span).toBeInTheDocument();
        expect(span.className).toMatch(/HvTypography-highlightText/);
      });
    });
  });
});
