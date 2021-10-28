import { renderHook } from "@testing-library/react-hooks";

import useBulkActions from "../useBulkActions";

import * as useBulkActionsHooks from "../useBulkActions";

describe("useHvBulkActions", () => {
  it("registers hooks", () => {
    const hooks = {
      useInstance: { push: jest.fn() },
    };

    useBulkActions(hooks);

    expect(hooks.useInstance.push).toHaveBeenCalledWith(useBulkActionsHooks.useInstanceHook);

    expect(hooks.getHvBulkActionsProps).toBeDefined();
    expect(hooks.getHvBulkActionsProps[0]).toBe(useBulkActionsHooks.defaultGetHvBulkActionsProps);
  });

  describe("useInstanceHook", () => {
    it("registers getHvBulkActionsProps props getter and invertedToggleAllRowsSelected callback", () => {
      const instance = {
        plugins: [useBulkActions],
        page: 2,
        rows: [1, 2, 3],
        toggleAllPageRowsSelected: jest.fn(),
        toggleAllRowsSelected: jest.fn(),

        getHooks: () => ({}),
      };

      renderHook(() => useBulkActionsHooks.useInstanceHook(instance));

      expect(instance.getHvBulkActionsProps).toBeDefined();
      expect(instance.invertedToggleAllRowsSelected).toBeDefined();
    });

    it("invertedToggleAllRowsSelected calls toggleAllRowsSelected (not paginated)", () => {
      const instance = {
        plugins: [useBulkActions],
        rows: [
          { id: 1, isSelected: false },
          { id: 2, isSelected: true },
          { id: 3, isSelected: false },
        ],
        toggleAllPageRowsSelected: jest.fn(),
        toggleAllRowsSelected: jest.fn(),

        aditivePageBulkSelection: false,
        subtractivePageBulkDeselection: false,
        isNoRowsSelected: false,
        isNoPageRowsSelected: false,
        isAllSelectablePageRowsSelected: false,
        isAllSelectablePageRowsUnselected: false,

        getHooks: () => ({}),
      };

      renderHook(() => useBulkActionsHooks.useInstanceHook(instance));

      instance.invertedToggleAllRowsSelected();

      expect(instance.toggleAllRowsSelected).toHaveBeenCalledTimes(1);
      expect(instance.toggleAllRowsSelected).toHaveBeenCalledWith();

      expect(instance.toggleAllPageRowsSelected).toHaveBeenCalledTimes(0);
    });

    it("invertedToggleAllRowsSelected calls toggleAllRowsSelected (paginated, some selected)", () => {
      const instance = {
        plugins: [useBulkActions],
        page: 2,
        rows: [
          { id: 1, isSelected: false },
          { id: 2, isSelected: true },
          { id: 3, isSelected: false },
        ],
        toggleAllPageRowsSelected: jest.fn(),
        toggleAllRowsSelected: jest.fn(),

        aditivePageBulkSelection: false,
        subtractivePageBulkDeselection: false,
        isNoRowsSelected: false,
        isNoPageRowsSelected: false,
        isAllSelectablePageRowsSelected: false,
        isAllSelectablePageRowsUnselected: false,

        getHooks: () => ({}),
      };

      renderHook(() => useBulkActionsHooks.useInstanceHook(instance));

      instance.invertedToggleAllRowsSelected();

      expect(instance.toggleAllRowsSelected).toHaveBeenCalledTimes(1);
      expect(instance.toggleAllRowsSelected).toHaveBeenCalledWith(false);

      expect(instance.toggleAllPageRowsSelected).toHaveBeenCalledTimes(0);
    });

    it("invertedToggleAllRowsSelected calls toggleAllRowsSelected (paginated, all selected)", () => {
      const instance = {
        plugins: [useBulkActions],
        page: 2,
        rows: [
          { id: 1, isSelected: true },
          { id: 2, isSelected: true },
          { id: 3, isSelected: true },
        ],
        toggleAllPageRowsSelected: jest.fn(),
        toggleAllRowsSelected: jest.fn(),

        aditivePageBulkSelection: false,
        subtractivePageBulkDeselection: false,
        isNoRowsSelected: false,
        isNoPageRowsSelected: false,
        isAllSelectablePageRowsSelected: true,
        isAllSelectablePageRowsUnselected: false,

        getHooks: () => ({}),
      };

      renderHook(() => useBulkActionsHooks.useInstanceHook(instance));

      instance.invertedToggleAllRowsSelected();

      expect(instance.toggleAllRowsSelected).toHaveBeenCalledTimes(1);
      expect(instance.toggleAllRowsSelected).toHaveBeenCalledWith(false);

      expect(instance.toggleAllPageRowsSelected).toHaveBeenCalledTimes(0);
    });

    it("invertedToggleAllRowsSelected calls toggleAllPageRowsSelected (paginated, none selected)", () => {
      const instance = {
        plugins: [useBulkActions],
        page: 2,
        rows: [
          { id: 1, isSelected: false },
          { id: 2, isSelected: false },
          { id: 3, isSelected: false },
        ],
        toggleAllPageRowsSelected: jest.fn(),
        toggleAllRowsSelected: jest.fn(),

        aditivePageBulkSelection: false,
        subtractivePageBulkDeselection: false,
        isNoRowsSelected: true,
        isNoPageRowsSelected: true,
        isAllSelectablePageRowsSelected: false,
        isAllSelectablePageRowsUnselected: true,

        getHooks: () => ({}),
      };

      renderHook(() => useBulkActionsHooks.useInstanceHook(instance));

      instance.invertedToggleAllRowsSelected();

      expect(instance.toggleAllRowsSelected).toHaveBeenCalledTimes(0);

      expect(instance.toggleAllPageRowsSelected).toHaveBeenCalledTimes(1);
      expect(instance.toggleAllPageRowsSelected).toHaveBeenCalledWith();
    });
  });

  describe("getHvBulkActionsProps", () => {
    it("returns properties ready to be injected in HvBulkActions (paginated)", () => {
      const existingProps = {};

      const instance = {
        rows: [1, 2, 3],
        selectedFlatRows: [1],
        page: 2,
        toggleAllRowsSelected: jest.fn(),
        invertedToggleAllRowsSelected: jest.fn(),
      };

      const [existing, props] = useBulkActionsHooks.defaultGetHvBulkActionsProps(existingProps, {
        instance,
      });

      expect(props.numTotal).toEqual(3);
      expect(props.numSelected).toEqual(1);
      expect(props.showSelectAllPages).toBeTruthy();
      expect(props.onSelectAll).toBe(instance.invertedToggleAllRowsSelected);
      expect(props.onSelectAllPages).toBe(instance.toggleAllRowsSelected);

      // should return the other properties
      expect(existing).toBe(existingProps);
    });

    it("returns properties ready to be injected in HvBulkActions (paginated, showSelectAllPages: false)", () => {
      const existingProps = {};

      const instance = {
        showSelectAllPages: false,
        rows: [1, 2, 3],
        selectedFlatRows: [1],
        page: 2,
        toggleAllRowsSelected: jest.fn(),
        invertedToggleAllRowsSelected: jest.fn(),
      };

      const [existing, props] = useBulkActionsHooks.defaultGetHvBulkActionsProps(existingProps, {
        instance,
      });

      expect(props.numTotal).toEqual(3);
      expect(props.numSelected).toEqual(1);
      expect(props.showSelectAllPages).toBeFalsy();
      expect(props.onSelectAll).toBe(instance.invertedToggleAllRowsSelected);
      expect(props.onSelectAllPages).toBe(instance.toggleAllRowsSelected);

      // should return the other properties
      expect(existing).toBe(existingProps);
    });

    it("returns properties ready to be injected in HvBulkActions (not paginated)", () => {
      const existingProps = {};

      const instance = {
        rows: [1, 2, 3],
        selectedFlatRows: [1],
        toggleAllRowsSelected: jest.fn(),
        invertedToggleAllRowsSelected: jest.fn(),
      };

      const [existing, props] = useBulkActionsHooks.defaultGetHvBulkActionsProps(existingProps, {
        instance,
      });

      expect(props.numTotal).toEqual(3);
      expect(props.numSelected).toEqual(1);
      expect(props.showSelectAllPages).toBeFalsy();
      expect(props.onSelectAll).toBe(instance.invertedToggleAllRowsSelected);

      // should return the other properties
      expect(existing).toBe(existingProps);
    });

    it("returns properties ready to be injected in HvBulkActions (filtered, not applyToggleAllRowsSelectedToPrefilteredRows)", () => {
      const existingProps = {};

      const instance = {
        applyToggleAllRowsSelectedToPrefilteredRows: false,
        initialRows: [1, 2, 3, 4, 5, 6],
        rows: [1, 3, 5],
        selectedFlatRows: [1, 3],
        state: { selectedRowIds: { 1: true, 2: true, 3: true } },
        toggleAllRowsSelected: jest.fn(),
        invertedToggleAllRowsSelected: jest.fn(),
      };

      const [existing, props] = useBulkActionsHooks.defaultGetHvBulkActionsProps(existingProps, {
        instance,
      });

      expect(props.numTotal).toEqual(3);
      expect(props.numSelected).toEqual(2);
      expect(props.showSelectAllPages).toBeFalsy();
      expect(props.onSelectAll).toBe(instance.invertedToggleAllRowsSelected);

      // should return the other properties
      expect(existing).toBe(existingProps);
    });

    it("returns properties ready to be injected in HvBulkActions (filtered, applyToggleAllRowsSelectedToPrefilteredRows)", () => {
      const existingProps = {};

      const instance = {
        applyToggleAllRowsSelectedToPrefilteredRows: true,
        initialRows: [1, 2, 3, 4, 5, 6],
        rows: [1, 3, 5],
        selectedFlatRows: [1, 3],
        state: { selectedRowIds: { 1: true, 2: true, 3: true } },
        toggleAllRowsSelected: jest.fn(),
        invertedToggleAllRowsSelected: jest.fn(),
      };

      const [existing, props] = useBulkActionsHooks.defaultGetHvBulkActionsProps(existingProps, {
        instance,
      });

      expect(props.numTotal).toEqual(6);
      expect(props.numSelected).toEqual(3);
      expect(props.showSelectAllPages).toBeFalsy();
      expect(props.onSelectAll).toBe(instance.invertedToggleAllRowsSelected);

      // should return the other properties
      expect(existing).toBe(existingProps);
    });
  });
});
