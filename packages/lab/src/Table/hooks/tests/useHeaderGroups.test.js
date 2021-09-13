import { renderHook } from "@testing-library/react-hooks";

import useHeaderGroups from "../useHeaderGroups";

import * as headerGroupsHooks from "../useHeaderGroups";

describe("useHvTableHeaderGroups", () => {
  it("registers hooks", () => {
    const hooks = {
      useInstance: { push: jest.fn() },
      getHeaderProps: { push: jest.fn() },
      getCellProps: { push: jest.fn() }
    };

    useHeaderGroups(hooks);

    expect(hooks.useInstance.push).toHaveBeenCalledWith(headerGroupsHooks.useInstanceHook);

    // props target: <table><thead><tr><th>
    expect(hooks.getHeaderProps.push).toHaveBeenCalledWith(headerGroupsHooks.getHeaderPropsHook);
    // props target: <table><tbody><tr><td>
    expect(hooks.getCellProps.push).toHaveBeenCalledWith(headerGroupsHooks.getCellPropsHook);
  });

  describe("useInstanceHook", () => {
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

      expect(headerGroups[0].headers[0].id).toEqual(header.id);
      expect(headerGroups[1].headers[0].id).toEqual(placeholderHeader.id);
    });

    it("aligns group headers to 'center'", () => {
      const header = { Header: "Title", id: "title" };

      const headerGroups = [
        {
          headers: [
            { Header: "", id: "title_placeholder", placeholderOf: header },
            { Header: "Info", headers: [{ Header: "Event Type" }, { Header: "Status" }] }
          ]
        },
        {
          headers: [
            header,
            { Header: "Event Type" }, { Header: "Status" }
          ]
        }
      ];

      const instance = { headerGroups, getHooks: () => ({}) };

      renderHook(() => headerGroupsHooks.useInstanceHook(instance));

      expect(headerGroups[0].headers[0].align).toBeUndefined();
      expect(headerGroups[0].headers[1].align).toEqual("center");
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

      expect(headers[0].align).toBeUndefined();
      expect(headers[1].align).toBeUndefined();
      expect(headers[2].align).toBeUndefined();
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
