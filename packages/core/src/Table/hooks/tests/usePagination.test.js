import { renderHook } from "@testing-library/react-hooks";

import usePagination from "../usePagination";

import * as usePaginationHooks from "../usePagination";

describe("useHvPagination", () => {
  it("registers hooks", () => {
    const hooks = {
      useInstance: { push: jest.fn() },
    };

    usePagination(hooks);

    expect(hooks.useInstance.push).toHaveBeenCalledWith(usePaginationHooks.useInstanceHook);

    expect(hooks.getHvPaginationProps).toBeDefined();
    expect(hooks.getHvPaginationProps[0]).toBe(usePaginationHooks.defaultGetHvPaginationProps);
  });

  describe("useInstanceHook", () => {
    it("registers getHvPaginationProps props getter", () => {
      const instance = {
        plugins: [usePagination],

        getHooks: () => ({}),
      };

      renderHook(() => usePaginationHooks.useInstanceHook(instance));

      expect(instance.getHvPaginationProps).toBeDefined();
    });
  });

  describe("getHvPaginationProps", () => {
    it("returns properties ready to be injected in HvPagination (first page of three)", () => {
      const existingProps = {};

      const instance = {
        canPreviousPage: false,
        canNextPage: true,
        pageOptions: [1, 2, 3],
        gotoPage: jest.fn(),
        setPageSize: jest.fn(),
        state: { pageSize: 10, pageIndex: 0 },
        labels: { a: "b" },
      };

      const [existing, props] = usePaginationHooks.defaultGetHvPaginationProps(existingProps, {
        instance,
      });

      expect(props.canPrevious).toEqual(instance.canPreviousPage);
      expect(props.canNext).toEqual(instance.canNextPage);
      expect(props.pages).toEqual(3);
      expect(props.page).toEqual(instance.state.pageIndex);
      expect(props.pageSize).toEqual(instance.state.pageSize);
      expect(props.onPageChange).toBe(instance.gotoPage);
      expect(props.onPageSizeChange).toBe(instance.setPageSize);
      expect(props.labels).toBe(instance.labels);

      // should return the other properties
      expect(existing).toBe(existingProps);
    });

    it("returns properties ready to be injected in HvPagination (second page of three)", () => {
      const existingProps = {};

      const instance = {
        canPreviousPage: true,
        canNextPage: true,
        pageOptions: [1, 2, 3],
        gotoPage: jest.fn(),
        setPageSize: jest.fn(),
        state: { pageSize: 10, pageIndex: 1 },
        labels: { a: "b" },
      };

      const [existing, props] = usePaginationHooks.defaultGetHvPaginationProps(existingProps, {
        instance,
      });

      expect(props.canPrevious).toEqual(instance.canPreviousPage);
      expect(props.canNext).toEqual(instance.canNextPage);
      expect(props.pages).toEqual(3);
      expect(props.page).toEqual(instance.state.pageIndex);
      expect(props.pageSize).toEqual(instance.state.pageSize);
      expect(props.onPageChange).toBe(instance.gotoPage);
      expect(props.onPageSizeChange).toBe(instance.setPageSize);
      expect(props.labels).toBe(instance.labels);

      // should return the other properties
      expect(existing).toBe(existingProps);
    });

    it("returns properties ready to be injected in HvPagination (last page of three)", () => {
      const existingProps = {};

      const instance = {
        canPreviousPage: true,
        canNextPage: false,
        pageOptions: [1, 2, 3],
        gotoPage: jest.fn(),
        setPageSize: jest.fn(),
        state: { pageSize: 10, pageIndex: 2 },
        labels: { a: "b" },
      };

      const [existing, props] = usePaginationHooks.defaultGetHvPaginationProps(existingProps, {
        instance,
      });

      expect(props.canPrevious).toEqual(instance.canPreviousPage);
      expect(props.canNext).toEqual(instance.canNextPage);
      expect(props.pages).toEqual(3);
      expect(props.page).toEqual(instance.state.pageIndex);
      expect(props.pageSize).toEqual(instance.state.pageSize);
      expect(props.onPageChange).toBe(instance.gotoPage);
      expect(props.onPageSizeChange).toBe(instance.setPageSize);
      expect(props.labels).toBe(instance.labels);

      // should return the other properties
      expect(existing).toBe(existingProps);
    });

    it("returns properties ready to be injected in HvPagination (just one page)", () => {
      const existingProps = {};

      const instance = {
        canPreviousPage: false,
        canNextPage: false,
        pageOptions: [1],
        gotoPage: jest.fn(),
        setPageSize: jest.fn(),
        state: { pageSize: 10, pageIndex: 0 },
        labels: { a: "b" },
      };

      const [existing, props] = usePaginationHooks.defaultGetHvPaginationProps(existingProps, {
        instance,
      });

      expect(props.canPrevious).toEqual(instance.canPreviousPage);
      expect(props.canNext).toEqual(instance.canNextPage);
      expect(props.pages).toEqual(1);
      expect(props.page).toEqual(instance.state.pageIndex);
      expect(props.pageSize).toEqual(instance.state.pageSize);
      expect(props.onPageChange).toBe(instance.gotoPage);
      expect(props.onPageSizeChange).toBe(instance.setPageSize);
      expect(props.labels).toBe(instance.labels);

      // should return the other properties
      expect(existing).toBe(existingProps);
    });
  });
});
