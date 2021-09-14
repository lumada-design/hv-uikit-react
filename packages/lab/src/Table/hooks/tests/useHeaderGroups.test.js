import { renderHook } from "@testing-library/react-hooks";

import useHeaderGroups from "../useHeaderGroups";

import * as headerGroupsHooks from "../useHeaderGroups";

describe("useHvTableHeaderGroups", () => {
  it("registers hooks", () => {
    const hooks = {
      columns: { push: jest.fn() },
      useInstance: { push: jest.fn() },
      getHeaderProps: { push: jest.fn() },
      getCellProps: { push: jest.fn() }
    };

    useHeaderGroups(hooks);

    expect(hooks.columns.push).toHaveBeenCalledWith(headerGroupsHooks.userColumnsHook);
    expect(hooks.useInstance.push).toHaveBeenCalledWith(headerGroupsHooks.useInstanceHook);

    // props target: <table><thead><tr><th>
    expect(hooks.getHeaderProps.push).toHaveBeenCalledWith(headerGroupsHooks.getHeaderPropsHook);
    // props target: <table><tbody><tr><td>
    expect(hooks.getCellProps.push).toHaveBeenCalledWith(headerGroupsHooks.getCellPropsHook);
  });

  describe("userColumnsHook", () => {
    it("set the align property to 'center' on group columns", () => {

      const columns = [
        { Header: "Event Type", align: "left" },
        { Header: "Info", columns: [{ Header: "Event Type" }, { Header: "Status" }] },
        { Header: "Status" }
      ];

      renderHook(() => headerGroupsHooks.userColumnsHook(columns));

      expect(columns[0].align).toEqual("left");
      expect(columns[1].align).toEqual("center");
      expect(columns[2].align).toBeUndefined();
    });
  });

  describe("useInstanceHook", () => {
    const replacedPlaceholderHeaders = (headers) => {
      return headers.some((h) => h.rowSpan != null);
    };

    it("replaces top level placeholder headers with original header", () => {
      const header = { Header: "Title", id: "title" };
      const placeholderHeader = { Header: "", id: "title_placeholder", placeholderOf: header };

      const headerGroups = [
        {
          headers: [
            placeholderHeader,
            { Header: "Info", headers: [{ Header: "Event Type" }, { Header: "Status" }] }
          ]
        },
        {
          headers: [
            header,
            { Header: "Event Type" },
            { Header: "Status" }
          ]
        }
      ];

      const instance = { headerGroups, getHooks: () => ({}) };

      renderHook(() => headerGroupsHooks.useInstanceHook(instance));

      expect(replacedPlaceholderHeaders(headerGroups[0].headers)).toBe(true);

      expect(headerGroups[0].headers[0]).toEqual(expect.objectContaining({
        id: header.id,
        rowSpan: headerGroups.length
      }));
      expect(headerGroups[1].headers[0]).toEqual(expect.objectContaining({
        id: placeholderHeader.id,
        depth: headerGroups.length - 1
      }));
    });

    it("with less than two header groups, should do nothing", () => {
      const headers = [
        { Header: "Title" },
        { Header: "Event Type" },
        { Header: "Status" }
      ];
      const headerGroups = [{ headers }];

      const instance = { headerGroups, getHooks: () => ({}) };

      renderHook(() => headerGroupsHooks.useInstanceHook(instance));

      expect(replacedPlaceholderHeaders(headers)).toBe(false);
    });

    it("without placeholder headers, should do nothing", () => {
      const headers = [
        { Header: "Title", headers: [{ Header: "Name" }] },
        { Header: "Info", headers: [{ Header: "Event Type" }, { Header: "Status" }] }
      ];

      const headerGroups = [
        { headers },
        {
          headers: [
            { Header: "Name" },
            { Header: "Event Type" },
            { Header: "Status" }
          ]
        }
      ];

      const instance = { headerGroups, getHooks: () => ({}) };

      renderHook(() => headerGroupsHooks.useInstanceHook(instance));

      expect(replacedPlaceholderHeaders(headers)).toBe(false);
    });
  });

  describe("getHeaderPropsHook (<table><thead><tr><th>)", () => {
    it("group headers", () => {
      const existingProps = {};

      const column = {
        depth: 0,
        rowSpan: 1
      };

      const [existing, props] = headerGroupsHooks.getHeaderPropsHook(existingProps, {
        column
      });

      expect(props.groupColumnMostLeft).toBeTruthy();
      expect(props.groupColumnMostRight).toBeTruthy();

      expect(props.style).toBeUndefined();

      // should return the other properties
      expect(existing).toBe(existingProps);
    });

    it("placeholder headers", () => {
      const existingProps = {};

      const column = {
        depth: 1,
        placeholderOf: { Header: "Mock" }
      };

      const [existing, props] = headerGroupsHooks.getHeaderPropsHook(existingProps, {
        column
      });

      expect(props.groupColumnMostLeft).toBeTruthy();
      expect(props.groupColumnMostRight).toBeTruthy();

      expect(props.style?.display).toEqual("none");

      // should return the other properties
      expect(existing).toBe(existingProps);
    });

    describe("headers with parent", () => {
      const parent = {
        columns: [
          { id: "first" },
          { id: "center" },
          { id: "last" }
        ]
      };

      const cases = [
        ["first"],
        ["center"],
        ["last"]
      ];

      test.each(cases)("id: %p", (id) => {
        const existingProps = {};

        const column = { id, parent };

        const [existing, props] = headerGroupsHooks.getHeaderPropsHook(existingProps, {
          column
        });

        expect(props.groupColumnMostLeft).toBe(id === "first");
        expect(props.groupColumnMostRight).toBe(id === "last");

        expect(props.style).toBeUndefined();

        // should return the other properties
        expect(existing).toBe(existingProps);
      });
    });
  });

  describe("getCellPropsHook (<table><tbody><tr><td>)", () => {
    const parent = {
      columns: [
        { id: "first" },
        { id: "center" },
        { id: "last" }
      ]
    };

    const cases = [
      ["first"],
      ["center"],
      ["last"]
    ];

    test.each(cases)("id: %p", (id) => {
      const existingProps = {};

      const column = { id, parent };

      const [existing, props] = headerGroupsHooks.getCellPropsHook(existingProps, {
        column
      });

      expect(props.groupColumnMostLeft).toBe(id === "first");
      expect(props.groupColumnMostRight).toBe(id === "last");

      expect(props.style).toBeUndefined();

      // should return the other properties
      expect(existing).toBe(existingProps);
    });
  });
});
