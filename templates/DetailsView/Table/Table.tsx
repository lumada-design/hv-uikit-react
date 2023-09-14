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

import { LoadingContainer } from "../../utils";
import {
  PaginationDataProps,
  usePaginationData,
  DetailsViewEntry,
  getColumns,
} from "../data";

const PAGE_OPTIONS = [8, 16, 32];

interface TableProps {
  modelId: string;
}

export const Table = ({ modelId }: TableProps) => {
  const [params, setParams] = useState<PaginationDataProps>({
    id: modelId,
    limit: PAGE_OPTIONS[0],
    skip: 0,
  });

  const {
    data: { pages, data },
    loading,
  } = usePaginationData(params);

  const columns = useMemo(() => getColumns(), []);

  const instance = useHvData<DetailsViewEntry, string>(
    {
      data,
      columns,
      manualPagination: true,
      autoResetPage: false,
      pageCount: pages,
      initialState: { pageSize: PAGE_OPTIONS[0] },
    },
    useHvPagination
  );

  useEffect(() => {
    const { pageSize = PAGE_OPTIONS[0], pageIndex = 0 } = instance.state;

    setParams((prev) => ({
      ...prev,
      limit: pageSize,
      skip: pageSize * pageIndex,
    }));
  }, [instance.state]);

  return (
    <LoadingContainer loading={loading}>
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
    </LoadingContainer>
  );
};
