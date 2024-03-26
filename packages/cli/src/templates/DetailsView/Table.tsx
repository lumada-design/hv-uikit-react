import { useState, useMemo, useEffect } from "react";

import {
  HvTable,
  HvTableContainer,
  HvTableRow,
  HvTableHead,
  HvTableHeader,
  HvTableBody,
  HvTableCell,
  useHvData,
  useHvPagination,
  HvPagination,
} from "@hitachivantara/uikit-react-core";

import { AssetDataParams, AssetEvent, getColumns, useAssetData } from "./data";

const PAGE_OPTIONS = [8, 16, 32];

export const Table = () => {
  const [params, setParams] = useState<AssetDataParams>({
    take: PAGE_OPTIONS[0],
    skip: 0,
  });

  const { data } = useAssetData(params);

  const columns = useMemo(() => getColumns(), []);

  const instance = useHvData<AssetEvent, string>(
    {
      data: data.items,
      columns,
      manualPagination: true,
      autoResetPage: false,
      pageCount: Math.ceil(data.total / params.take),
      initialState: { pageSize: PAGE_OPTIONS[0] },
    },
    useHvPagination
  );

  useEffect(() => {
    const pageSize = instance.state.pageSize || PAGE_OPTIONS[0];
    const pageIndex = instance.state.pageIndex || 0;

    setParams((prev) => ({
      ...prev,
      take: pageSize,
      skip: pageSize * pageIndex,
    }));
  }, [instance.state.pageSize, instance.state.pageIndex]);

  return (
    <>
      <HvTableContainer style={{ padding: "2px" }}>
        <HvTable {...instance.getTableProps()}>
          <HvTableHead>
            <HvTableRow>
              {columns.map((col) => (
                <HvTableHeader key={col.Header}>{col.Header}</HvTableHeader>
              ))}
            </HvTableRow>
          </HvTableHead>
          <HvTableBody {...instance.getTableBodyProps()}>
            {instance.page.map((row) => {
              instance.prepareRow(row);
              return (
                <HvTableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <HvTableCell {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </HvTableCell>
                  ))}
                </HvTableRow>
              );
            })}
          </HvTableBody>
        </HvTable>
      </HvTableContainer>
      {instance.page?.length ? (
        <HvPagination
          {...instance.getHvPaginationProps?.()}
          pageSizeOptions={PAGE_OPTIONS}
        />
      ) : undefined}
    </>
  );
};
