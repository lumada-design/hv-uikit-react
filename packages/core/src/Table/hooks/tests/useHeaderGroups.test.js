import { renderHook } from "@testing-library/react-hooks";

import useHeaderGroups from "../useHeaderGroups";

import * as headerGroupsHooks from "../useHeaderGroups";

describe("useHvHeaderGroups", () => {
  it("registers hooks", () => {
    const hooks = {
      visibleColumns: { push: jest.fn() },
      useInstance: { push: jest.fn() },
      getHeaderProps: { push: jest.fn() },
      getCellProps: { push: jest.fn() },
    };

    useHeaderGroups(hooks);

    expect(hooks.visibleColumns.push).toHaveBeenCalledWith(headerGroupsHooks.visibleColumnsHook);
    expect(hooks.useInstance.push).toHaveBeenCalledWith(headerGroupsHooks.useInstanceHook);

    // props target: <table><thead><tr><th>
    expect(hooks.getHeaderProps.push).toHaveBeenCalledWith(headerGroupsHooks.getHeaderPropsHook);
    // props target: <table><tbody><tr><td>
    expect(hooks.getCellProps.push).toHaveBeenCalledWith(headerGroupsHooks.getCellPropsHook);
  });

  describe("visibleColumnsHook", () => {
    let instance;

    beforeEach(() => {
      instance = {};
    });

    it("handles grouped columns", () => {
      const groupHeader = { Header: "Info" };
      const groupColumns = [
        { Header: "Event Type", align: "left", parent: groupHeader },
        { Header: "Status", parent: groupHeader },
      ];
      groupHeader.columns = groupColumns;

      const columns = [
        { Header: "Title" },
        groupColumns[0],
        groupColumns[1],
        { Header: "Status", align: "right" },
      ];

      renderHook(() => headerGroupsHooks.visibleColumnsHook(columns, { instance }));

      // columns should keep align values
      expect(columns[0].align).toBeUndefined();
      expect(columns[1].align).toEqual("left");
      expect(columns[2].align).toBeFalsy();
      expect(columns[3].align).toEqual("right");

      // group left columns should be marked as such
      expect(columns[0].isGroupLeftColumn).toBeFalsy();
      expect(columns[1].isGroupLeftColumn).toBeTruthy();
      expect(columns[2].isGroupLeftColumn).toBeFalsy();
      expect(columns[3].isGroupLeftColumn).toBeFalsy();

      // group right columns should be marked as such
      expect(columns[0].isGroupRightColumn).toBeFalsy();
      expect(columns[1].isGroupRightColumn).toBeFalsy();
      expect(columns[2].isGroupRightColumn).toBeTruthy();
      expect(columns[3].isGroupRightColumn).toBeFalsy();

      // group columns parent should also be updated
      expect(groupHeader.align).toEqual("center");
      expect(groupHeader.isGroupLeftColumn).toBeTruthy();
      expect(groupHeader.isGroupRightColumn).toBeTruthy();

      expect(instance.hasGroupedColumns).toBeTruthy();
    });

    it("handles no grouped columns", () => {
      const columns = [
        { Header: "Title" },
        { Header: "Event Type", align: "left" },
        { Header: "Status" },
        { Header: "Priority", align: "right" },
      ];

      renderHook(() => headerGroupsHooks.visibleColumnsHook(columns, { instance }));

      // columns should keep align values
      expect(columns[0].align).toBeUndefined();
      expect(columns[1].align).toEqual("left");
      expect(columns[2].align).toBeUndefined();
      expect(columns[3].align).toEqual("right");

      // no columns should be marked as group left column
      expect(columns[0].isGroupLeftColumn).toBeFalsy();
      expect(columns[1].isGroupLeftColumn).toBeFalsy();
      expect(columns[2].isGroupLeftColumn).toBeFalsy();
      expect(columns[3].isGroupLeftColumn).toBeFalsy();

      // no columns should be marked as group right column
      expect(columns[0].isGroupRightColumn).toBeFalsy();
      expect(columns[1].isGroupRightColumn).toBeFalsy();
      expect(columns[2].isGroupRightColumn).toBeFalsy();
      expect(columns[3].isGroupRightColumn).toBeFalsy();

      expect(instance.hasGroupedColumns).toBeFalsy();
    });
  });

  describe("useInstanceHook", () => {
    const hasGroupedColumns = true;

    const expectReplacedPlaceholders = (headers, replaced = false) => {
      expect(headers.some((h) => h.rowSpan != null)).toBe(replaced);
    };

    it("replaces top level placeholder headers with original header", () => {
      const header = { Header: "Title", id: "title" };
      const placeholderHeader = { Header: "", id: "title_placeholder", placeholderOf: header };

      const headerGroups = [
        {
          headers: [
            placeholderHeader,
            { Header: "Info", headers: [{ Header: "Event Type" }, { Header: "Status" }] },
          ],
        },
        {
          headers: [header, { Header: "Event Type" }, { Header: "Status" }],
        },
      ];

      const instance = { headerGroups, hasGroupedColumns };

      renderHook(() => headerGroupsHooks.useInstanceHook(instance));

      expectReplacedPlaceholders(headerGroups[0].headers, true);

      expect(headerGroups[0].headers[0]).toEqual(
        expect.objectContaining({
          id: header.id,
          rowSpan: headerGroups.length,
        })
      );
      expect(headerGroups[1].headers[0]).toEqual(
        expect.objectContaining({
          id: placeholderHeader.id,
          depth: headerGroups.length - 1,
        })
      );
    });

    it("with less than two header groups, should do nothing", () => {
      const headers = [{ Header: "Title" }, { Header: "Event Type" }, { Header: "Status" }];
      const headerGroups = [{ headers }];

      const instance = { headerGroups, getHooks: () => ({}) };

      renderHook(() => headerGroupsHooks.useInstanceHook(instance));

      expectReplacedPlaceholders(headers, false);
    });

    it("without placeholder headers, should do nothing", () => {
      const headers = [
        { Header: "Title", headers: [{ Header: "Name" }] },
        { Header: "Info", headers: [{ Header: "Event Type" }, { Header: "Status" }] },
      ];

      const headerGroups = [
        { headers },
        {
          headers: [{ Header: "Name" }, { Header: "Event Type" }, { Header: "Status" }],
        },
      ];

      const instance = { headerGroups, hasGroupedColumns };

      renderHook(() => headerGroupsHooks.useInstanceHook(instance));

      expectReplacedPlaceholders(headers, false);
    });
  });

  describe("with grouped columns", () => {
    const instance = { hasGroupedColumns: true };
    const existingProps = {};

    describe("getHeaderPropsHook (<table><thead><tr><th>)", () => {
      it("placeholder columns", () => {
        const column = {
          placeholderOf: { Header: "Mock" },
          rowSpan: 1,
        };

        const [existing, props] = headerGroupsHooks.getHeaderPropsHook(existingProps, {
          column,
          instance,
        });

        expect(props.style?.display).toEqual("none");

        // should return the other properties
        expect(existing).toBe(existingProps);
      });

      it("placeholder columns with sticky columns", () => {
        const column = {
          placeholderOf: { Header: "Mock" },
          rowSpan: 2,
        };

        const [existing, props] = headerGroupsHooks.getHeaderPropsHook(existingProps, {
          column,
          instance: { ...instance, hasStickyColumns: true },
        });

        expect(props.style?.display).toEqual("none");
        expect(props.style?.visibility).toEqual("hidden");
        expect(props.style?.height).toEqual(
          "calc(var(--first-row-cell-height) + var(--cell-height) * 1)"
        );

        // should return the other properties
        expect(existing).toBe(existingProps);
      });

      const cases = [
        [false, false, 2],
        [true, false, 3],
        [false, true, undefined],
        [true, true, 1],
      ];

      test.each(cases)(
        "isGroupLeftColumn: %p, isGroupRightColumn: %p, rowSpan: %p",
        (isGroupLeftColumn, isGroupRightColumn, rowSpan) => {
          const column = { isGroupLeftColumn, isGroupRightColumn, rowSpan };

          const [existing, props] = headerGroupsHooks.getHeaderPropsHook(existingProps, {
            column,
            instance,
          });

          expect(props.groupColumnMostLeft).toEqual(isGroupLeftColumn);
          expect(props.groupColumnMostRight).toEqual(isGroupRightColumn);
          expect(props.rowSpan).toEqual(rowSpan ?? 1);

          expect(props.style?.display).toBeUndefined();

          // should return the other properties
          expect(existing).toBe(existingProps);
        }
      );
    });

    describe("getCellPropsHook (<table><tbody><tr><td>)", () => {
      const cases = [
        [true, true, 1],
        [false, true, undefined],
        [false, false, 2],
        [true, false, 3],
      ];

      test.each(cases)(
        "isGroupLeftColumn: %p, isGroupRightColumn: %p, rowSpan: %p",
        (isGroupLeftColumn, isGroupRightColumn, rowSpan) => {
          const column = { isGroupLeftColumn, isGroupRightColumn, rowSpan };

          const [existing, props] = headerGroupsHooks.getCellPropsHook(existingProps, {
            cell: { column },
            instance,
          });

          expect(props.groupColumnMostLeft).toEqual(isGroupLeftColumn);
          expect(props.groupColumnMostRight).toEqual(isGroupRightColumn);
          expect(props.rowSpan).toEqual(1);

          expect(props.style).toBeUndefined();

          // should return the other properties
          expect(existing).toBe(existingProps);
        }
      );
    });
  });

  describe("no grouped columns", () => {
    const instance = { hasGroupedColumns: false };
    const existingProps = {};

    describe("getHeaderPropsHook (<table><thead><tr><th>)", () => {
      it("do nothing", () => {
        const column = {
          isGroupLeftColumn: true,
          isGroupRightColumn: false,
          rowSpan: 1,
        };

        const [existing, props] = headerGroupsHooks.getHeaderPropsHook(existingProps, {
          column,
          instance,
        });

        expect(props).toEqual({});

        // should return the other properties
        expect(existing).toBe(existingProps);
      });
    });

    describe("getCellPropsHook (<table><tbody><tr><td>)", () => {
      it("do nothing", () => {
        const column = {
          isGroupLeftColumn: false,
          isGroupRightColumn: true,
          rowSpan: 1,
        };

        const [existing, props] = headerGroupsHooks.getCellPropsHook(existingProps, {
          column,
          instance,
        });

        expect(props).toEqual({});

        // should return the other properties
        expect(existing).toBe(existingProps);
      });
    });
  });
});
