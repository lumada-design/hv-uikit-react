import { useMemo, useState } from "react";
import {
  HvCellProps,
  HvPagination,
  HvRowInstance,
  HvTable,
  HvTableBody,
  HvTableCell,
  HvTableContainer,
  HvTableHead,
  HvTableHeader,
  HvTableRow,
  hvSwitchColumn,
  useHvData,
  useHvPagination,
} from "@hitachivantara/uikit-react-core";

import { EmptyRow, NewRendererEntry, makeRenderersData } from "../storiesUtils";

export const SwitchColumnRenderer = () => {
  const initialData = useMemo(() => makeRenderersData(64), []);

  const [data, setData] = useState(initialData);

  const columns = useMemo(() => {
    return [
      hvSwitchColumn<NewRendererEntry, string>(
        {
          Header: "isDisabled",
          accessor: "isDisabled",
          style: { minWidth: 180 },
        },
        "default",
        "yes",
        "no",
        {
          onChange: (_, checked, value) => {
            let newData = [...data];
            newData = newData.map((val, index) => {
              const newVal = { ...val };
              if (index.toString() === value) {
                newVal.isDisabled = checked;
              }
              return newVal;
            });
            setData(newData);
          },
        }
      ),
    ];
  }, [data]);

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headers,
    page,
    getHvPaginationProps,
  } = useHvData<NewRendererEntry, string>(
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
    <>
      <HvTableContainer>
        <HvTable
          {...getTableProps({
            "aria-rowcount": data.length,
          })}
          style={{
            width: 50,
          }}
        >
          <HvTableHead>
            <HvTableRow>
              {headers.map((col) => (
                <HvTableHeader {...col.getHeaderProps()} key={col.Header}>
                  {col.render("Header")}
                </HvTableHeader>
              ))}
            </HvTableRow>
          </HvTableHead>
          <HvTableBody {...getTableBodyProps()}>
            {page.length === 0 ? <EmptyRow height={50} /> : rowRenderer(page)}
          </HvTableBody>
        </HvTable>
      </HvTableContainer>
      <HvPagination {...getHvPaginationProps?.()} />
    </>
  );
};
