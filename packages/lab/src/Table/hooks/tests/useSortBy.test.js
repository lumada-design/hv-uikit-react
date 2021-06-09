import { renderHook } from "@testing-library/react-hooks";

import useSortBy from "../useSortBy";

import * as useSortByHooks from "../useSortBy";

describe("useHvSortBy", () => {
  it("registers hooks", () => {
    const hooks = {
      useInstance: { push: jest.fn() },
      getHeaderProps: { push: jest.fn() },
      getCellProps: { push: jest.fn() },
    };

    useSortBy(hooks);

    expect(hooks.useInstance.push).toHaveBeenCalledWith(useSortByHooks.useInstanceHook);

    expect(hooks.getHeaderProps.push).toHaveBeenCalledWith(useSortByHooks.getHeaderPropsHook);
    expect(hooks.getCellProps.push).toHaveBeenCalledWith(useSortByHooks.getCellPropsHook);
  });

  describe("useInstanceHook", () => {
    it("just works", () => {
      const instance = {
        plugins: [useSortBy],

        getHooks: () => ({}),
      };

      renderHook(() => useSortByHooks.useInstanceHook(instance));
    });
  });

  describe("getHeaderPropsHook", () => {
    const cases = [
      // canSort, isSorted, isSortedDesc
      [true, false, false],
      [true, true, false],
      [true, true, true],
      [false, false, false],
    ];

    test.each(cases)(
      "returns properties ready to be injected in HvTableHeader (canSort: %p, isSorted: %p, isSortedDesc: %p)",
      (canSort, isSorted, isSortedDesc) => {
        const existingProps = {};

        const instance = {
          disableMultiSort: false,
        };

        const column = {
          canSort,
          isSorted,
          isSortedDesc,
        };

        const [existing, props] = useSortByHooks.getHeaderPropsHook(existingProps, {
          instance,
          column,
        });

        expect(props.sortable).toEqual(canSort);
        expect(props.sorted).toEqual(canSort && isSorted);
        if (isSorted) {
          expect(props.sortDirection).toEqual(isSortedDesc ? "descending" : "ascending");
        } else {
          expect(props.sortDirection).toBeUndefined();
        }
        if (canSort) {
          expect(props.onClick).toBeDefined();
        } else {
          expect(props.onClick).toBeUndefined();
        }

        // should return the other properties
        expect(existing).toBe(existingProps);
      }
    );

    it("onClick calls toggleSortBy (shiftKey: true)", () => {
      const existingProps = {};

      const instance = {
        disableMultiSort: false,
      };

      const column = {
        canSort: true,
        isSorted: false,
        isSortedDesc: false,

        toggleSortBy: jest.fn(),
      };

      const [, props] = useSortByHooks.getHeaderPropsHook(existingProps, {
        instance,
        column,
      });

      expect(props.onClick).toBeDefined();

      const event = { persist: jest.fn(), shiftKey: true };

      props.onClick(event);

      expect(column.toggleSortBy).toHaveBeenCalledWith(undefined, true);
    });

    it("onClick calls toggleSortBy (shiftKey: false)", () => {
      const existingProps = {};

      const instance = {
        disableMultiSort: false,
      };

      const column = {
        canSort: true,
        isSorted: false,
        isSortedDesc: false,

        toggleSortBy: jest.fn(),
      };

      const [, props] = useSortByHooks.getHeaderPropsHook(existingProps, {
        instance,
        column,
      });

      expect(props.onClick).toBeDefined();

      const event = { persist: jest.fn(), shiftKey: false };

      props.onClick(event);

      expect(column.toggleSortBy).toHaveBeenCalledWith(undefined, false);
    });

    it("onClick calls toggleSortBy (custom isMultiSortEvent)", () => {
      const existingProps = {};

      const instance = {
        disableMultiSort: false,
        isMultiSortEvent: () => true,
      };

      const column = {
        canSort: true,
        isSorted: false,
        isSortedDesc: false,

        toggleSortBy: jest.fn(),
      };

      const [, props] = useSortByHooks.getHeaderPropsHook(existingProps, {
        instance,
        column,
      });

      expect(props.onClick).toBeDefined();

      const event = { persist: jest.fn(), shiftKey: false };

      props.onClick(event);

      expect(column.toggleSortBy).toHaveBeenCalledWith(undefined, true);
    });

    it("onClick calls toggleSortBy (disableMultiSort: true)", () => {
      const existingProps = {};

      const instance = {
        disableMultiSort: true,
      };

      const column = {
        canSort: true,
        isSorted: false,
        isSortedDesc: false,

        toggleSortBy: jest.fn(),
      };

      const [, props] = useSortByHooks.getHeaderPropsHook(existingProps, {
        instance,
        column,
      });

      expect(props.onClick).toBeDefined();

      const event = { persist: jest.fn(), shiftKey: true };

      props.onClick(event);

      expect(column.toggleSortBy).toHaveBeenCalledWith(undefined, false);
    });
  });

  describe("getCellPropsHook", () => {
    it("adds sorted property (cell.column.isSorted = true)", () => {
      const existingProps = {};

      const [existing, props] = useSortByHooks.getCellPropsHook(existingProps, {
        cell: { column: { isSorted: true } },
      });

      expect(props.sorted).toBe(true);

      // should return the other properties
      expect(existing).toBe(existingProps);
    });

    it("adds sorted property (cell.column.isSorted = false)", () => {
      const existingProps = {};

      const [existing, props] = useSortByHooks.getCellPropsHook(existingProps, {
        cell: { column: { isSorted: false } },
      });

      expect(props.sorted).toBe(false);

      // should return the other properties
      expect(existing).toBe(existingProps);
    });
  });
});
