import { useMemo, useState } from "react";
import {
  HvPagination,
  HvRowInstance,
  hvSwitchColumn,
  HvTable,
  HvTableBody,
  HvTableCell,
  HvTableContainer,
  HvTableHead,
  HvTableHeader,
  HvTableRow,
  useHvData,
  useHvPagination,
} from "@hitachivantara/uikit-react-core";

import { EmptyRow, makeRenderersData, NewRendererEntry } from "./utils";

export const SwitchColumnRenderer = () => {
  const [data, setData] = useState(() => makeRenderersData(64));

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
        },
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
    },
    useHvPagination,
  );

  const rowRenderer = (pages: HvRowInstance<NewRendererEntry, string>[]) => {
    return pages.map((row, i) => {
      prepareRow(row);
      const { key, ...rowProps } = row.getRowProps({ "aria-rowindex": i + 1 });

      return (
        <HvTableRow key={key} {...rowProps}>
          {row.cells.map((cell) => (
            <HvTableCell {...cell.getCellProps()} key={cell.getCellProps().key}>
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
