/* eslint-env jest */
import useResizeColumns from "../useResizeColumns";

import * as useResizeColumnsHooks from "../useResizeColumns";

describe("useHvResizeColumns", () => {
  it("registers hooks", () => {
    const hooks = {
      getHeaderProps: { push: jest.fn() },
      getCellProps: { push: jest.fn() },
      useInstance: { push: jest.fn() },
    };

    useResizeColumns(hooks);

    expect(hooks.getHeaderProps.push).toHaveBeenCalledWith(
      useResizeColumnsHooks.getHeaderPropsHook
    );
    expect(hooks.getCellProps.push).toHaveBeenCalledWith(useResizeColumnsHooks.getCellPropsHook);
  });

  describe("getHeaderProps", () => {
    it("adds resize properties (column.canResize = true && isResizing = false)", () => {
      const existingProps = {};
      const getResizerProps = jest.fn();
      getResizerProps.mockReturnValue({ draggable: true });

      const [existing, props] = useResizeColumnsHooks.getHeaderPropsHook(existingProps, {
        column: { canResize: true, isResizing: false, getResizerProps },
      });

      expect(props.resizable).toBe(true);
      expect(props.resizing).toBe(false);
      expect(props.resizerProps).toEqual({ draggable: true });

      // should return the other properties
      expect(existing).toBe(existingProps);
    });

    it("adds resize properties (column.canResize = true && isResizing = true)", () => {
      const existingProps = {};
      const getResizerProps = jest.fn();
      getResizerProps.mockReturnValue({ draggable: true });

      const [existing, props] = useResizeColumnsHooks.getHeaderPropsHook(existingProps, {
        column: { canResize: true, isResizing: true, getResizerProps },
      });

      expect(props.resizable).toBe(true);
      expect(props.resizing).toBe(true);
      expect(props.resizerProps).toEqual({ draggable: true });

      // should return the other properties
      expect(existing).toBe(existingProps);
    });

    it("adds resize properties (column.canResize = false)", () => {
      const existingProps = {};
      const getResizerProps = undefined;

      const [existing, props] = useResizeColumnsHooks.getHeaderPropsHook(existingProps, {
        column: { canResize: false, isResizing: false, getResizerProps },
      });

      expect(props.resizable).toBe(false);
      expect(props.resizing).toBe(false);
      expect(props.resizerProps).toEqual({});

      // should return the other properties
      expect(existing).toBe(existingProps);
    });
  });

  describe("getCellPropsHook", () => {
    it("adds resize properties (column.canResize = true && isResizing = false)", () => {
      const existingProps = {};

      const [existing, props] = useResizeColumnsHooks.getCellPropsHook(existingProps, {
        cell: { column: { canResize: true, isResizing: false } },
      });

      expect(props.resizable).toBe(true);
      expect(props.resizing).toBe(false);

      // should return the other properties
      expect(existing).toBe(existingProps);
    });

    it("adds resize properties (column.canResize = true && isResizing = true)", () => {
      const existingProps = {};

      const [existing, props] = useResizeColumnsHooks.getCellPropsHook(existingProps, {
        cell: { column: { canResize: true, isResizing: true } },
      });

      expect(props.resizable).toBe(true);
      expect(props.resizing).toBe(true);

      // should return the other properties
      expect(existing).toBe(existingProps);
    });
  });
});
