import { renderHook } from "@testing-library/react-hooks";

import useSticky from "../useSticky";

import * as stickyHooks from "../useSticky";

describe("useHvTableSticky", () => {
  const expectStickyColumn = (style, column, isHeaderCell = false) => {
    expect(style).toBeDefined();

    if (column.sticky === "left") {
      expect(style.left).toEqual(`${column.totalLeft}px`);
      expect(style.right).toBeUndefined();
    } else if (column.sticky === "right") {
      expect(style.left).toBeUndefined();
      expect(style.right).toEqual(`${column.totalRight}px`);
    }

    expect(style.width).toEqual(`${column.totalWidth}px`);
    expect(style.minWidth).toEqual(`${column.totalMinWidth}px`);

    expect(style.display).toEqual("inline-flex");
    expect(style.flex).toEqual(`${column.totalWidth} ${column.totalMinWidth} auto`);

    expect(style.alignItems).toEqual(isHeaderCell ? "start" : "center");
    expect(style.justifyContent).toEqual(column.align);
  };

  it("registers hooks", () => {
    const hooks = {
      visibleColumns: { push: jest.fn() },
      useInstance: { push: jest.fn() },
      getTableProps: { push: jest.fn() },
      getHeaderProps: { push: jest.fn() },
      getCellProps: { push: jest.fn() },
      getRowProps: { push: jest.fn() },
      getHeaderGroupProps: { push: jest.fn() },
    };

    useSticky(hooks);

    expect(hooks.visibleColumns.push).toHaveBeenCalledWith(stickyHooks.visibleColumnsHook);
    expect(hooks.useInstance.push).toHaveBeenCalledWith(stickyHooks.useInstanceHook);

    // props target: <table>
    expect(hooks.getTableProps.push).toHaveBeenCalledWith(stickyHooks.getTablePropsHook);
    // props target: <table><thead>
    expect(hooks.getTableHeadProps).toBeDefined();
    expect(hooks.getTableHeadProps[0]).toBe(stickyHooks.getTableHeadPropsHook);
    // props target: <table><thead><tr>
    expect(hooks.getHeaderGroupProps.push).toHaveBeenCalledWith(
      stickyHooks.getHeaderGroupPropsHook
    );
    // props target: <table><thead><tr><th>
    expect(hooks.getHeaderProps.push).toHaveBeenCalledWith(stickyHooks.getHeaderPropsHook);
    // props target: <table><tbody><tr>
    expect(hooks.getRowProps.push).toHaveBeenCalledWith(stickyHooks.getRowPropsHook);
    // props target: <table><tbody><tr><td>
    expect(hooks.getCellProps.push).toHaveBeenCalledWith(stickyHooks.getCellPropsHook);
  });

  describe("visibleColumnsHook", () => {
    it("handles multiple left and right sticky columns", () => {
      const columns = [
        { Header: "Title" },
        { Header: "Time", sticky: "right" },
        { Header: "Event Type" },
        { Header: "Status", sticky: "left" },
        { Header: "Probability", sticky: "left" },
        { Header: "Severity" },
        { Header: "Priority", sticky: "right" },
      ];

      const instance = {};

      const processed = stickyHooks.visibleColumnsHook(columns, { instance });

      // columns should be reordered
      expect(processed[0].Header).toEqual("Status");
      expect(processed[1].Header).toEqual("Probability");
      expect(processed[2].Header).toEqual("Title");
      expect(processed[3].Header).toEqual("Event Type");
      expect(processed[4].Header).toEqual("Severity");
      expect(processed[5].Header).toEqual("Time");
      expect(processed[6].Header).toEqual("Priority");

      // sticky columns should be marked as such
      expect(processed[0]?.sticky).toEqual("left");
      expect(processed[1]?.sticky).toEqual("left");
      expect(processed[2]?.sticky).toBeUndefined();
      expect(processed[3]?.sticky).toBeUndefined();
      expect(processed[4]?.sticky).toBeUndefined();
      expect(processed[5]?.sticky).toEqual("right");
      expect(processed[6]?.sticky).toEqual("right");

      // last left sticky should be marked as such
      expect(processed[0]?.isLastLeftSticky).toBeFalsy();
      expect(processed[1]?.isLastLeftSticky).toBeTruthy();
      expect(processed[2]?.isLastLeftSticky).toBeFalsy();
      expect(processed[3]?.isLastLeftSticky).toBeFalsy();
      expect(processed[4]?.isLastLeftSticky).toBeFalsy();
      expect(processed[5]?.isLastLeftSticky).toBeFalsy();
      expect(processed[6]?.isLastLeftSticky).toBeFalsy();

      // first right sticky should be marked as such
      expect(processed[0]?.isFirstRightSticky).toBeFalsy();
      expect(processed[1]?.isFirstRightSticky).toBeFalsy();
      expect(processed[2]?.isFirstRightSticky).toBeFalsy();
      expect(processed[3]?.isFirstRightSticky).toBeFalsy();
      expect(processed[4]?.isFirstRightSticky).toBeFalsy();
      expect(processed[5]?.isFirstRightSticky).toBeTruthy();
      expect(processed[6]?.isFirstRightSticky).toBeFalsy();

      // last not sticky should be marked as such
      expect(processed[0]?.isLastNotSticky).toBeFalsy();
      expect(processed[1]?.isLastNotSticky).toBeFalsy();
      expect(processed[2]?.isLastNotSticky).toBeFalsy();
      expect(processed[3]?.isLastNotSticky).toBeFalsy();
      expect(processed[4]?.isLastNotSticky).toBeTruthy();
      expect(processed[5]?.isLastNotSticky).toBeFalsy();
      expect(processed[6]?.isLastNotSticky).toBeFalsy();

      // instance should indicate if there are sticky columns
      expect(instance?.hasStickyColumns).toBeTruthy();
    });

    it("handles no sticky columns", () => {
      const columns = [
        { Header: "Title" },
        { Header: "Time" },
        { Header: "Event Type" },
        { Header: "Status" },
        { Header: "Probability" },
        { Header: "Severity" },
        { Header: "Priority" },
      ];

      const instance = {};

      const processed = stickyHooks.visibleColumnsHook(columns, { instance });

      // columns should not be reordered
      expect(processed[0].Header).toEqual("Title");
      expect(processed[1].Header).toEqual("Time");
      expect(processed[2].Header).toEqual("Event Type");
      expect(processed[3].Header).toEqual("Status");
      expect(processed[4].Header).toEqual("Probability");
      expect(processed[5].Header).toEqual("Severity");
      expect(processed[6].Header).toEqual("Priority");

      // no columns should be marked as sticky
      expect(processed[0]?.sticky).toBeUndefined();
      expect(processed[1]?.sticky).toBeUndefined();
      expect(processed[2]?.sticky).toBeUndefined();
      expect(processed[3]?.sticky).toBeUndefined();
      expect(processed[4]?.sticky).toBeUndefined();
      expect(processed[5]?.sticky).toBeUndefined();
      expect(processed[6]?.sticky).toBeUndefined();

      // no columns should be marked as a sticky boundary
      expect(processed[0]?.isLastLeftSticky).toBeFalsy();
      expect(processed[1]?.isLastLeftSticky).toBeFalsy();
      expect(processed[2]?.isLastLeftSticky).toBeFalsy();
      expect(processed[3]?.isLastLeftSticky).toBeFalsy();
      expect(processed[4]?.isLastLeftSticky).toBeFalsy();
      expect(processed[5]?.isLastLeftSticky).toBeFalsy();
      expect(processed[6]?.isLastLeftSticky).toBeFalsy();

      expect(processed[0]?.isFirstRightSticky).toBeFalsy();
      expect(processed[1]?.isFirstRightSticky).toBeFalsy();
      expect(processed[2]?.isFirstRightSticky).toBeFalsy();
      expect(processed[3]?.isFirstRightSticky).toBeFalsy();
      expect(processed[4]?.isFirstRightSticky).toBeFalsy();
      expect(processed[5]?.isFirstRightSticky).toBeFalsy();
      expect(processed[6]?.isFirstRightSticky).toBeFalsy();

      // last not sticky should be marked as such
      expect(processed[0]?.isLastNotSticky).toBeFalsy();
      expect(processed[1]?.isLastNotSticky).toBeFalsy();
      expect(processed[2]?.isLastNotSticky).toBeFalsy();
      expect(processed[3]?.isLastNotSticky).toBeFalsy();
      expect(processed[4]?.isLastNotSticky).toBeFalsy();
      expect(processed[5]?.isLastNotSticky).toBeFalsy();
      expect(processed[6]?.isLastNotSticky).toBeTruthy();

      // instance should indicate if there are no sticky columns
      expect(instance?.hasStickyColumns).toBeFalsy();
    });

    it("handles case sensitivity", () => {
      const columns = [
        { Header: "Title", sticky: "LeFt" },
        { Header: "Time" },
        { Header: "Event Type" },
        { Header: "Status" },
        { Header: "Probability" },
        { Header: "Severity" },
        { Header: "Priority", sticky: "RIGHT" },
      ];

      const instance = {};

      const processed = stickyHooks.visibleColumnsHook(columns, { instance });

      expect(processed[0]?.sticky).toEqual("left");
      expect(processed[1]?.sticky).toBeUndefined();
      expect(processed[2]?.sticky).toBeUndefined();
      expect(processed[3]?.sticky).toBeUndefined();
      expect(processed[4]?.sticky).toBeUndefined();
      expect(processed[5]?.sticky).toBeUndefined();
      expect(processed[6]?.sticky).toEqual("right");

      // last left sticky should be marked as such
      // first right sticky should be marked as such
      // last not sticky should be marked as such
      expect(processed[0]?.isLastLeftSticky).toBeTruthy();
      expect(processed[1]?.isLastLeftSticky).toBeFalsy();
      expect(processed[2]?.isLastLeftSticky).toBeFalsy();
      expect(processed[3]?.isLastLeftSticky).toBeFalsy();
      expect(processed[4]?.isLastLeftSticky).toBeFalsy();
      expect(processed[5]?.isLastLeftSticky).toBeFalsy();
      expect(processed[6]?.isLastLeftSticky).toBeFalsy();

      // first right sticky should be marked as such
      expect(processed[0]?.isFirstRightSticky).toBeFalsy();
      expect(processed[1]?.isFirstRightSticky).toBeFalsy();
      expect(processed[2]?.isFirstRightSticky).toBeFalsy();
      expect(processed[3]?.isFirstRightSticky).toBeFalsy();
      expect(processed[4]?.isFirstRightSticky).toBeFalsy();
      expect(processed[5]?.isFirstRightSticky).toBeFalsy();
      expect(processed[6]?.isFirstRightSticky).toBeTruthy();

      // last not sticky should be marked as such
      expect(processed[0]?.isLastNotSticky).toBeFalsy();
      expect(processed[1]?.isLastNotSticky).toBeFalsy();
      expect(processed[2]?.isLastNotSticky).toBeFalsy();
      expect(processed[3]?.isLastNotSticky).toBeFalsy();
      expect(processed[4]?.isLastNotSticky).toBeFalsy();
      expect(processed[5]?.isLastNotSticky).toBeTruthy();
      expect(processed[6]?.isLastNotSticky).toBeFalsy();

      expect(instance?.hasStickyColumns).toBeTruthy();
    });

    it("handles invalid values", () => {
      const columns = [
        { Header: "Title", sticky: "invalid" },
        { Header: "Time" },
        { Header: "Event Type" },
        { Header: "Status" },
        { Header: "Probability" },
        { Header: "Severity" },
        { Header: "Priority", sticky: "other" },
      ];

      const instance = {};

      const processed = stickyHooks.visibleColumnsHook(columns, { instance });

      // no columns should be marked as sticky
      expect(processed[0]?.sticky).toBeUndefined();
      expect(processed[1]?.sticky).toBeUndefined();
      expect(processed[2]?.sticky).toBeUndefined();
      expect(processed[3]?.sticky).toBeUndefined();
      expect(processed[4]?.sticky).toBeUndefined();
      expect(processed[5]?.sticky).toBeUndefined();
      expect(processed[6]?.sticky).toBeUndefined();

      // no columns should be marked as a sticky boundary
      expect(processed[0]?.isLastLeftSticky).toBeFalsy();
      expect(processed[1]?.isLastLeftSticky).toBeFalsy();
      expect(processed[2]?.isLastLeftSticky).toBeFalsy();
      expect(processed[3]?.isLastLeftSticky).toBeFalsy();
      expect(processed[4]?.isLastLeftSticky).toBeFalsy();
      expect(processed[5]?.isLastLeftSticky).toBeFalsy();
      expect(processed[6]?.isLastLeftSticky).toBeFalsy();

      expect(processed[0]?.isFirstRightSticky).toBeFalsy();
      expect(processed[1]?.isFirstRightSticky).toBeFalsy();
      expect(processed[2]?.isFirstRightSticky).toBeFalsy();
      expect(processed[3]?.isFirstRightSticky).toBeFalsy();
      expect(processed[4]?.isFirstRightSticky).toBeFalsy();
      expect(processed[5]?.isFirstRightSticky).toBeFalsy();
      expect(processed[6]?.isFirstRightSticky).toBeFalsy();

      // last not sticky should be marked as such
      expect(processed[0]?.isLastNotSticky).toBeFalsy();
      expect(processed[1]?.isLastNotSticky).toBeFalsy();
      expect(processed[2]?.isLastNotSticky).toBeFalsy();
      expect(processed[3]?.isLastNotSticky).toBeFalsy();
      expect(processed[4]?.isLastNotSticky).toBeFalsy();
      expect(processed[5]?.isLastNotSticky).toBeFalsy();
      expect(processed[6]?.isLastNotSticky).toBeTruthy();

      expect(instance?.hasStickyColumns).toBeFalsy();
    });
  });

  describe("useInstanceHook", () => {
    it("calculates for each column and sub headers, the total width in pixels of all columns to the right", () => {
      const headers = [
        { Header: "Title", isVisible: true, totalWidth: 100 },
        { Header: "Time", isVisible: true, totalWidth: 110 },
        {
          Header: "Info",
          isVisible: true,
          totalWidth: 120 + 130 + 140,
          headers: [
            { Header: "Event Type", isVisible: true, totalWidth: 120 },
            { Header: "Status", isVisible: true, totalWidth: 130 },
            { Header: "Probability", isVisible: true, totalWidth: 140 },
          ],
        },
        { Header: "Severity", isVisible: true, totalWidth: 150 },
        { Header: "Priority", isVisible: true, totalWidth: 160 },
      ];

      const instance = { headers, getHooks: () => ({}) };

      renderHook(() => stickyHooks.useInstanceHook(instance));

      // headers should be augmented with totalRight
      expect(headers[0].totalRight).toEqual(160 + 150 + 120 + 130 + 140 + 110);
      expect(headers[1].totalRight).toEqual(160 + 150 + 120 + 130 + 140);

      const groupedHeader = headers[2];
      expect(groupedHeader.headers[0].totalRight).toEqual(160 + 150 + 140 + 130);
      expect(groupedHeader.headers[1].totalRight).toEqual(160 + 150 + 140);

      expect(groupedHeader.headers[2].totalRight).toEqual(160 + 150);
      expect(groupedHeader.totalRight).toEqual(160 + 150);

      expect(headers[3].totalRight).toEqual(160);
      expect(headers[4].totalRight).toEqual(0);
    });

    it("non-visible columns are ignored", () => {
      const headers = [
        { Header: "Title", isVisible: true, totalWidth: 100 },
        { Header: "Time", isVisible: false, totalWidth: 110 },
        { Header: "Event Type", isVisible: true, totalWidth: 120 },
        { Header: "Status", isVisible: true, totalWidth: 130 },
        { Header: "Probability", isVisible: false, totalWidth: 140 },
        { Header: "Severity", isVisible: true, totalWidth: 150 },
        { Header: "Priority", isVisible: true, totalWidth: 160 },
      ];

      const instance = { headers, getHooks: () => ({}) };
      renderHook(() => stickyHooks.useInstanceHook(instance));

      // headers should be augmented with totalRight
      expect(headers[0].totalRight).toEqual(160 + 150 + 130 + 120);
      expect(headers[2].totalRight).toEqual(160 + 150 + 130);
      expect(headers[3].totalRight).toEqual(160 + 150);
      expect(headers[5].totalRight).toEqual(160);
      expect(headers[6].totalRight).toEqual(0);
    });

    it("without any header, should not crash", () => {
      const headers = [];

      const instance = { headers, getHooks: () => ({}) };

      renderHook(() => stickyHooks.useInstanceHook(instance));
    });
  });

  describe("getTablePropsHook (<table>)", () => {
    const cases = [
      [false, false],
      [true, false],
      [false, true],
      [true, true],
    ];

    test.each(cases)("stickyHeader: %p, hasStickyColumns: %p", (stickyHeader, hasStickyColumns) => {
      const existingProps = {};

      const instance = { stickyHeader, hasStickyColumns };

      const [existing, props] = stickyHooks.getTablePropsHook(existingProps, { instance });

      expect(props.stickyHeader).toEqual(stickyHeader);
      expect(props.stickyColumns).toEqual(hasStickyColumns);

      // should return the other properties
      expect(existing).toBe(existingProps);
    });
  });

  describe("sticky header only", () => {
    const existingProps = {};
    const instance = { stickyHeader: true, hasStickyColumns: false };

    describe("getTableHeadPropsHook (<table><thead>)", () => {
      it("set the sticky* properties and styles accordingly", () => {
        const [existing, props] = stickyHooks.getTableHeadPropsHook(existingProps, { instance });

        expect(props.stickyHeader).toBeTruthy();

        // should return the other properties
        expect(existing).toBe(existingProps);
      });
    });

    describe("getHeaderGroupPropsHook (<table><thead><tr>)", () => {
      it("do nothing", () => {
        const [existing, props] = stickyHooks.getHeaderGroupPropsHook(existingProps, { instance });

        expect(props).toEqual({});

        // should return the other properties
        expect(existing).toBe(existingProps);
      });
    });

    describe("getHeaderPropsHook (<table><thead><tr><th>)", () => {
      it("set the sticky* properties and styles accordingly", () => {
        const column = {
          totalLeft: 200,
          totalRight: 300,
        };

        const [existing, props] = stickyHooks.getHeaderPropsHook(existingProps, {
          instance,
          column,
        });

        expect(props.stickyColumn).toBeFalsy();
        expect(props.stickyColumnMostLeft).toBeFalsy();
        expect(props.stickyColumnLeastRight).toBeFalsy();

        expect(props.style).toBeUndefined();

        // should return the other properties
        expect(existing).toBe(existingProps);
      });
    });

    describe("getRowPropsHook (<table><tbody><tr>)", () => {
      it("do nothing", () => {
        const [existing, props] = stickyHooks.getRowPropsHook(existingProps, { instance });

        expect(props).toEqual({});

        // should return the other properties
        expect(existing).toBe(existingProps);
      });
    });

    describe("getCellPropsHook (<table><tbody><tr><td>)", () => {
      it("do nothing", () => {
        const column = {
          totalLeft: 200,
          totalRight: 300,
        };

        const [existing, props] = stickyHooks.getCellPropsHook(existingProps, {
          instance,
          cell: { column },
        });

        expect(props.stickyColumn).toBeFalsy();
        expect(props.stickyColumnMostLeft).toBeFalsy();
        expect(props.stickyColumnLeastRight).toBeFalsy();

        expect(props.style).toBeUndefined();

        // should return the other properties
        expect(existing).toBe(existingProps);
      });
    });
  });

  describe("sticky columns only", () => {
    const existingProps = {};
    const instance = { stickyHeader: false, hasStickyColumns: true };

    describe("getTableHeadPropsHook (<table><thead>)", () => {
      it("set the sticky* properties and styles accordingly", () => {
        const [existing, props] = stickyHooks.getTableHeadPropsHook(existingProps, { instance });

        expect(props.stickyHeader).toBeFalsy();
        expect(props.style).toBeUndefined();

        // should return the other properties
        expect(existing).toBe(existingProps);
      });
    });

    describe("getHeaderGroupPropsHook (<table><thead><tr>)", () => {
      it("set the styles accordingly", () => {
        const [existing, props] = stickyHooks.getHeaderGroupPropsHook(existingProps, { instance });

        expect(props.style?.display).toEqual("flex");
        expect(props.style?.flex).toEqual("1 0 auto");

        // should return the other properties
        expect(existing).toBe(existingProps);
      });
    });

    describe("getHeaderPropsHook (<table><thead><tr><th>)", () => {
      it("set the sticky* properties and styles accordingly", () => {
        const column = {
          sticky: "right",
          align: "left",
          totalLeft: 200,
          totalRight: 300,
          isFirstRightSticky: true,
          totalWidth: 100,
          totalMinWidth: 75,
        };

        const [existing, props] = stickyHooks.getHeaderPropsHook(existingProps, {
          instance,
          column,
        });

        expect(props.stickyColumn).toBeTruthy();
        expect(props.stickyColumnMostLeft).toBeFalsy();
        expect(props.stickyColumnLeastRight).toBeTruthy();

        expectStickyColumn(props.style, column, true);

        // should return the other properties
        expect(existing).toBe(existingProps);

        // all valid cases tested bellow
      });

      const cases = [
        [undefined, undefined],
        ["left", false],
        ["left", true],
        ["right", false],
        ["right", true],
      ];

      test.each(cases)("sticky: %p, isBoundary: %p", (sticky, isBoundary) => {
        const isSticky = sticky === "left" || sticky === "right";

        const column = {
          sticky,
          // eslint-disable-next-line no-nested-ternary
          ...(sticky === "left"
            ? { totalLeft: 256, isLastLeftSticky: isBoundary }
            : sticky === "right"
            ? { totalRight: 256, isFirstRightSticky: isBoundary }
            : {}),
          totalWidth: 100,
          totalMinWidth: 0,
        };

        const [existing, props] = stickyHooks.getHeaderPropsHook(existingProps, {
          instance,
          column,
        });

        if (isSticky) {
          expect(props.stickyColumn).toBeTruthy();
        } else {
          expect(props.stickyColumn).toBeFalsy();
        }

        if (isBoundary && sticky === "left") {
          expect(props.stickyColumnMostLeft).toBeTruthy();
        } else {
          expect(props.stickyColumnMostLeft).toBeFalsy();
        }
        if (isBoundary && sticky === "right") {
          expect(props.stickyColumnLeastRight).toBeTruthy();
        } else {
          expect(props.stickyColumnLeastRight).toBeFalsy();
        }

        expectStickyColumn(props.style, column, true);

        // should return the other properties
        expect(existing).toBe(existingProps);
      });
    });

    describe("getRowPropsHook (<table><tbody><tr>)", () => {
      it("set the styles accordingly", () => {
        const [existing, props] = stickyHooks.getRowPropsHook(existingProps, { instance });

        expect(props.style?.display).toEqual("flex");
        expect(props.style?.flex).toEqual("1 0 auto");

        // should return the other properties
        expect(existing).toBe(existingProps);
      });
    });

    describe("getCellPropsHook (<table><tbody><tr><td>)", () => {
      it("set the sticky* properties and styles accordingly", () => {
        const column = {
          sticky: "right",
          totalLeft: 200,
          totalRight: 300,
          isFirstRightSticky: true,
          totalWidth: 100,
          totalMinWidth: 50,
        };

        const [existing, props] = stickyHooks.getCellPropsHook(existingProps, {
          instance,
          cell: { column },
        });

        expect(props.stickyColumn).toBeTruthy();
        expect(props.stickyColumnMostLeft).toBeFalsy();
        expect(props.stickyColumnLeastRight).toBeTruthy();

        expectStickyColumn(props.style, column);

        // should return the other properties
        expect(existing).toBe(existingProps);

        // all valid cases tested bellow
      });

      const cases = [
        [undefined, undefined],
        ["left", false],
        ["left", true],
        ["right", false],
        ["right", true],
      ];

      test.each(cases)("sticky: %p, isBoundary: %p", (sticky, isBoundary) => {
        const isSticky = sticky === "left" || sticky === "right";

        const column = {
          sticky,
          // eslint-disable-next-line no-nested-ternary
          ...(sticky === "left"
            ? { totalLeft: 256, isLastLeftSticky: isBoundary }
            : sticky === "right"
            ? { totalRight: 256, isFirstRightSticky: isBoundary }
            : {}),
          totalWidth: 100,
          totalMinWidth: 0,
        };

        const [existing, props] = stickyHooks.getCellPropsHook(existingProps, {
          instance,
          cell: { column },
        });

        if (isSticky) {
          expect(props.stickyColumn).toBeTruthy();
        } else {
          expect(props.stickyColumn).toBeFalsy();
        }

        if (isBoundary && sticky === "left") {
          expect(props.stickyColumnMostLeft).toBeTruthy();
        } else {
          expect(props.stickyColumnMostLeft).toBeFalsy();
        }
        if (isBoundary && sticky === "right") {
          expect(props.stickyColumnLeastRight).toBeTruthy();
        } else {
          expect(props.stickyColumnLeastRight).toBeFalsy();
        }

        expectStickyColumn(props.style, column);

        // should return the other properties
        expect(existing).toBe(existingProps);
      });
    });
  });

  describe("sticky header and columns", () => {
    const existingProps = {};
    const instance = { stickyHeader: true, hasStickyColumns: true };

    describe("getTableHeadPropsHook (<table><thead>)", () => {
      it("set the sticky* properties and styles accordingly", () => {
        const [existing, props] = stickyHooks.getTableHeadPropsHook(existingProps, { instance });

        expect(props.stickyHeader).toBeTruthy();

        // should return the other properties
        expect(existing).toBe(existingProps);
      });
    });

    describe("getHeaderGroupPropsHook (<table><thead><tr>)", () => {
      it("set the styles accordingly", () => {
        const [existing, props] = stickyHooks.getHeaderGroupPropsHook(existingProps, { instance });

        expect(props.style?.display).toEqual("flex");
        expect(props.style?.flex).toEqual("1 0 auto");

        // should return the other properties
        expect(existing).toBe(existingProps);
      });
    });

    describe("getHeaderPropsHook (<table><thead><tr><th>)", () => {
      it("set the sticky* properties and styles accordingly", () => {
        const column = {
          sticky: "right",
          totalLeft: 200,
          totalRight: 300,
          isFirstRightSticky: true,
          totalWidth: 100,
          totalMinWidth: 50,
        };

        const [existing, props] = stickyHooks.getHeaderPropsHook(existingProps, {
          instance,
          column,
        });

        expect(props.stickyColumn).toBeTruthy();
        expect(props.stickyColumnMostLeft).toBeFalsy();
        expect(props.stickyColumnLeastRight).toBeTruthy();

        expectStickyColumn(props.style, column, true);

        // should return the other properties
        expect(existing).toBe(existingProps);

        // all valid cases tested bellow
      });

      const cases = [
        [undefined, undefined],
        ["left", false],
        ["left", true],
        ["right", false],
        ["right", true],
      ];

      test.each(cases)("sticky: %p, isBoundary: %p", (sticky, isBoundary) => {
        const isSticky = sticky === "left" || sticky === "right";

        const column = {
          sticky,
          // eslint-disable-next-line no-nested-ternary
          ...(sticky === "left"
            ? { totalLeft: 256, isLastLeftSticky: isBoundary }
            : sticky === "right"
            ? { totalRight: 256, isFirstRightSticky: isBoundary }
            : {}),
          totalWidth: 100,
          totalMinWidth: 0,
        };

        const [existing, props] = stickyHooks.getHeaderPropsHook(existingProps, {
          instance,
          column,
        });

        if (isSticky) {
          expect(props.stickyColumn).toBeTruthy();
        } else {
          expect(props.stickyColumn).toBeFalsy();
        }

        if (isBoundary && sticky === "left") {
          expect(props.stickyColumnMostLeft).toBeTruthy();
        } else {
          expect(props.stickyColumnMostLeft).toBeFalsy();
        }
        if (isBoundary && sticky === "right") {
          expect(props.stickyColumnLeastRight).toBeTruthy();
        } else {
          expect(props.stickyColumnLeastRight).toBeFalsy();
        }

        expectStickyColumn(props.style, column, true);

        // should return the other properties
        expect(existing).toBe(existingProps);
      });
    });

    describe("getRowPropsHook (<table><tbody><tr>)", () => {
      it("set the styles accordingly", () => {
        const [existing, props] = stickyHooks.getRowPropsHook(existingProps, { instance });

        expect(props.style?.display).toEqual("flex");
        expect(props.style?.flex).toEqual("1 0 auto");

        // should return the other properties
        expect(existing).toBe(existingProps);
      });
    });

    describe("getCellPropsHook (<table><tbody><tr><td>)", () => {
      it("set the sticky* properties and styles accordingly", () => {
        const column = {
          sticky: "right",
          totalLeft: 200,
          totalRight: 300,
          isFirstRightSticky: true,
          totalWidth: 100,
          totalMinWidth: 10,
        };

        const [existing, props] = stickyHooks.getCellPropsHook(existingProps, {
          instance,
          cell: { column },
        });

        expect(props.stickyColumn).toBeTruthy();
        expect(props.stickyColumnMostLeft).toBeFalsy();
        expect(props.stickyColumnLeastRight).toBeTruthy();

        expectStickyColumn(props.style, column);

        // should return the other properties
        expect(existing).toBe(existingProps);

        // all valid cases tested bellow
      });

      const cases = [
        [undefined, undefined],
        ["left", false],
        ["left", true],
        ["right", false],
        ["right", true],
      ];

      test.each(cases)("sticky: %p, isBoundary: %p", (sticky, isBoundary) => {
        const isSticky = sticky === "left" || sticky === "right";

        const column = {
          sticky,
          // eslint-disable-next-line no-nested-ternary
          ...(sticky === "left"
            ? { totalLeft: 256, isLastLeftSticky: isBoundary }
            : sticky === "right"
            ? { totalRight: 256, isFirstRightSticky: isBoundary }
            : {}),
          totalWidth: 100,
          totalMinWidth: 10,
        };

        const [existing, props] = stickyHooks.getCellPropsHook(existingProps, {
          instance,
          cell: { column },
        });

        if (isSticky) {
          expect(props.stickyColumn).toBeTruthy();
        } else {
          expect(props.stickyColumn).toBeFalsy();
        }

        if (isBoundary && sticky === "left") {
          expect(props.stickyColumnMostLeft).toBeTruthy();
        } else {
          expect(props.stickyColumnMostLeft).toBeFalsy();
        }
        if (isBoundary && sticky === "right") {
          expect(props.stickyColumnLeastRight).toBeTruthy();
        } else {
          expect(props.stickyColumnLeastRight).toBeFalsy();
        }

        expectStickyColumn(props.style, column);

        // should return the other properties
        expect(existing).toBe(existingProps);
      });
    });
  });

  describe("nothing sticky", () => {
    const existingProps = {};
    const instance = { stickyHeader: false, hasStickyColumns: false };

    describe("getHeaderGroupPropsHook (<table><thead><tr>)", () => {
      it("do nothing", () => {
        const [existing, props] = stickyHooks.getHeaderGroupPropsHook(existingProps, { instance });

        expect(props).toEqual({});

        // should return the other properties
        expect(existing).toBe(existingProps);
      });
    });

    describe("getHeaderPropsHook (<table><thead><tr><th>)", () => {
      it("do nothing", () => {
        const column = {
          totalLeft: 200,
          totalRight: 300,
          totalWidth: 100,
        };

        const [existing, props] = stickyHooks.getHeaderPropsHook(existingProps, {
          instance,
          column,
        });

        expect(props).toEqual({});

        // should return the other properties
        expect(existing).toBe(existingProps);
      });
    });

    describe("getRowPropsHook (<table><tbody><tr>)", () => {
      it("do nothing", () => {
        const [existing, props] = stickyHooks.getRowPropsHook(existingProps, { instance });

        expect(props).toEqual({});

        // should return the other properties
        expect(existing).toBe(existingProps);
      });
    });

    describe("getCellPropsHook (<table><tbody><tr><td>)", () => {
      it("do nothing", () => {
        const column = {
          totalLeft: 200,
          totalRight: 300,
          totalWidth: 100,
        };

        const [existing, props] = stickyHooks.getCellPropsHook(existingProps, {
          instance,
          cell: { column },
        });

        expect(props).toEqual({});

        // should return the other properties
        expect(existing).toBe(existingProps);
      });
    });

    describe("getTableHeadPropsHook (<table><thead>)", () => {
      it("do nothing", () => {
        const [existing, props] = stickyHooks.getTableHeadPropsHook(existingProps, { instance });

        expect(props.stickyHeader).toBeFalsy();
        expect(props.style).toBeUndefined();

        // should return the other properties
        expect(existing).toBe(existingProps);
      });
    });
  });
});
