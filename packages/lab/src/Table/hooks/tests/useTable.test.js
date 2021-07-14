import { renderHook } from "@testing-library/react-hooks";

import useHvTable from "../useTable";

import useHvPagination from "../usePagination";
import useHvRowExpand from "../useRowExpand";
import useHvSortBy from "../useSortBy";
import useHvTableStyles from "../useTableStyles";

jest.mock("react-table");
// eslint-disable-next-line import/first, import/order
import { useTable, usePagination, useExpanded, useSortBy } from "react-table";

describe("useHvTable", () => {
  const mockPlugin = { pluginName: "mockPlugin" };

  beforeEach(() => {
    useTable.mockReset();
  });

  it("calls react-table's useTable", () => {
    const data = [];
    const columns = [];

    renderHook(() => useHvTable({ data, columns }, mockPlugin));

    expect(useTable).toHaveBeenCalledTimes(1);

    expect(useTable.mock.calls[0][0].data).toBe(data);
    expect(useTable.mock.calls[0][0].columns).toBe(columns);
    expect(useTable.mock.calls[0][1]).toBe(mockPlugin);
  });

  describe("plugin automatic instalations", () => {
    describe("useHvTableStyles", () => {
      it("always installs if not present", () => {
        const data = [];
        const columns = [];

        renderHook(() => useHvTable({ data, columns }, mockPlugin));

        expect(useTable).toHaveBeenCalledTimes(1);

        const plugins = useTable.mock.calls[0].slice(1);

        expect(plugins.length).toEqual(2);
        expect(plugins).toEqual(expect.arrayContaining([mockPlugin, useHvTableStyles]));
      });

      it("does nothing if present", () => {
        const data = [];
        const columns = [];

        renderHook(() => useHvTable({ data, columns }, mockPlugin, useHvTableStyles));

        expect(useTable).toHaveBeenCalledTimes(1);

        const plugins = useTable.mock.calls[0].slice(1);

        expect(plugins.length).toEqual(2);
        expect(plugins).toEqual(expect.arrayContaining([mockPlugin, useHvTableStyles]));
      });
    });

    const cases = [
      // name, hvPlugin, corePlugin
      ["useHvPagination", useHvPagination, usePagination],
      ["useHvRowExpand", useHvRowExpand, useExpanded],
      ["useHvSortBy", useHvSortBy, useSortBy],
    ];

    describe.each(cases)("%p", (name, hvPlugin, corePlugin) => {
      it("installs core plugin if not present", () => {
        const data = [];
        const columns = [];

        renderHook(() => useHvTable({ data, columns }, hvPlugin));

        expect(useTable).toHaveBeenCalledTimes(1);

        const plugins = useTable.mock.calls[0].slice(1);

        expect(plugins[0]).toEqual(corePlugin);
        expect(plugins[1]).toEqual(hvPlugin);
      });

      it("does nothing if core plugin is present", () => {
        const data = [];
        const columns = [];

        renderHook(() => useHvTable({ data, columns }, corePlugin, mockPlugin, hvPlugin));

        expect(useTable).toHaveBeenCalledTimes(1);

        const plugins = useTable.mock.calls[0].slice(1);

        expect(plugins[0]).toEqual(corePlugin);
        expect(plugins[2]).toEqual(hvPlugin);
      });

      it("fixes plugin order", () => {
        const data = [];
        const columns = [];

        renderHook(() => useHvTable({ data, columns }, hvPlugin, mockPlugin, corePlugin));

        expect(useTable).toHaveBeenCalledTimes(1);

        const plugins = useTable.mock.calls[0].slice(1);

        expect(plugins[0]).toEqual(corePlugin);
        expect(plugins[1]).toEqual(hvPlugin);
      });
    });
  });

  it("generates default column metadata from the data", () => {
    const data = [
      { id: 1, twoWords: true, nowThreeWords: "" },
      { id: 2, other: false },
      { id: 3, "UPPER CASE": "", camelCase: "", snake_case: "", "lisp-case": "" },
      { id: 4, "    with   spaces   to   trim   ": false },
    ];

    renderHook(() => useHvTable({ data }));

    expect(useTable).toHaveBeenCalledTimes(1);

    const { columns } = useTable.mock.calls[0][0];

    expect(columns[0].accessor).toBe("id");
    expect(columns[0].Header).toBe("Id");

    expect(columns[1].accessor).toBe("twoWords");
    expect(columns[1].Header).toBe("Two Words");

    expect(columns[2].accessor).toBe("nowThreeWords");
    expect(columns[2].Header).toBe("Now Three Words");

    expect(columns[3].accessor).toBe("other");
    expect(columns[3].Header).toBe("Other");

    expect(columns[4].accessor).toBe("UPPER CASE");
    expect(columns[4].Header).toBe("Upper Case");

    expect(columns[5].accessor).toBe("camelCase");
    expect(columns[5].Header).toBe("Camel Case");

    expect(columns[6].accessor).toBe("snake_case");
    expect(columns[6].Header).toBe("Snake Case");

    expect(columns[7].accessor).toBe("lisp-case");
    expect(columns[7].Header).toBe("Lisp Case");

    expect(columns[8].accessor).toBe("    with   spaces   to   trim   ");
    expect(columns[8].Header).toBe("With Spaces To Trim");
  });

  it("defaults to an empty array if no data is provided", () => {
    renderHook(() => useHvTable({}));

    expect(useTable).toHaveBeenCalledTimes(1);

    expect(useTable.mock.calls[0][0].data).toEqual([]);
    expect(useTable.mock.calls[0][0].columns).toEqual([]);
  });
});
