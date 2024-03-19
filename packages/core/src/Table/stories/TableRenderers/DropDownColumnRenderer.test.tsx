import { useMemo, useState } from "react";

import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  HvTable,
  HvTableBody,
  HvTableCell,
  HvTableContainer,
  HvTableHead,
  HvTableHeader,
  HvTableRow,
  useHvData,
  useHvPagination,
  HvRowInstance,
  HvCellProps,
  hvDropdownColumn,
} from "@hitachivantara/uikit-react-core";

import { makeRenderersData, NewRendererEntry } from "../storiesUtils";

const consoleMock = vi.spyOn(console, "error").mockImplementation(() => ({}));

const DropdownColumnRenderer = () => {
  const initialData = useMemo(() => makeRenderersData(3), []);

  const [data, setData] = useState(initialData);

  initialData[0].severity = undefined;

  const columns = useMemo(() => {
    return [
      hvDropdownColumn<NewRendererEntry, string>(
        { Header: "Severity", accessor: "severity", id: "severity-header" },
        undefined,
        "Select severity...",
        "Select severity...",
        (id, value) => {
          let newData = [...data];
          newData = newData.map((val, index) => {
            const newVal = { ...val };
            if (index.toString() === id) {
              if (newVal.severity) {
                newVal.severity = newVal.severity.map((sev) => {
                  const newSev = { ...sev };
                  newSev.selected = false;
                  if (newSev.id === value?.id) newSev.selected = value.selected;
                  return newSev;
                });
              }
            }
            return newVal;
          });
          setData(newData);
        }
      ),
    ];
  }, [data]);

  const { getTableProps, getTableBodyProps, prepareRow, headers, page } =
    useHvData<NewRendererEntry, string>(
      {
        columns,
        data,
        defaultColumn: {
          Cell: ({ value }: HvCellProps<NewRendererEntry, string>) =>
            value ?? "—",
        },
      },
      useHvPagination
    );

  const rowRenderer = (pages: HvRowInstance<NewRendererEntry, string>[]) => {
    return pages.map((row, index) => {
      prepareRow(row);

      return (
        <HvTableRow {...row.getRowProps({ "aria-rowindex": index + 1 })}>
          {row.cells.map((cell) => (
            <HvTableCell {...cell.getCellProps()}>
              {cell.render("Cell")}
            </HvTableCell>
          ))}
        </HvTableRow>
      );
    });
  };

  return (
    <HvTableContainer>
      <HvTable
        {...getTableProps({
          "aria-rowcount": data.length,
        })}
        style={{
          width: 230,
        }}
      >
        <HvTableHead>
          <HvTableRow>
            {headers.map((col) => (
              <HvTableHeader
                {...col.getHeaderProps()}
                key={col.Header}
                id={col.id}
              >
                {col.render("Header")}
              </HvTableHeader>
            ))}
          </HvTableRow>
        </HvTableHead>
        <HvTableBody {...getTableBodyProps()}>{rowRenderer(page)}</HvTableBody>
      </HvTable>
    </HvTableContainer>
  );
};

describe("DropDownColumnRenderer", () => {
  beforeEach(() => {
    consoleMock.mockReset();
    render(<DropdownColumnRenderer />);
  });

  it("table should render with no erros when one row has no values defined", async () => {
    expect(consoleMock).not.toHaveBeenCalled();
    expect(screen.getAllByText("Select severity...")).toHaveLength(1);
  });

  it("should be possible to unselect an element without errors", async () => {
    expect(screen.getAllByText("Select severity...")).toHaveLength(1);
    await userEvent.click(screen.getByText("Major"));

    await userEvent.selectOptions(
      screen.getByRole("listbox"),
      screen.getByRole("option", { name: "Major" })
    );

    expect(consoleMock).not.toHaveBeenCalled();
    expect(screen.getAllByText("Select severity...")).toHaveLength(2);
  });

  it("should allow to change value", async () => {
    expect(screen.getAllByText("Average")).toHaveLength(1);
    expect(screen.queryAllByText("Minor")).toHaveLength(0);

    await userEvent.click(screen.getByText("Average"));
    await userEvent.selectOptions(
      screen.getByRole("listbox"),
      screen.getByRole("option", { name: "Minor" })
    );

    expect(screen.queryAllByText("Average")).toHaveLength(0);
    expect(screen.getAllByText("Minor")).toHaveLength(1);
  });
});
