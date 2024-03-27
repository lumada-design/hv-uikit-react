import { useCallback, useMemo, useState } from "react";
import {
  HvBulkActions,
  HvEmptyState,
  HvPagination,
  HvTable,
  HvTableBody,
  HvTableCell,
  HvTableContainer,
  HvTableHead,
  HvTableHeader,
  HvTableRow,
  useHvBulkActions,
  useHvData,
  useHvPagination,
  useHvRowSelection,
} from "@hitachivantara/uikit-react-core";
import {
  Ban,
  Delete,
  Duplicate,
  Lock,
  Preview,
} from "@hitachivantara/uikit-react-icons";

import { AssetEvent, getColumns, makeData } from "../storiesUtils";

export const UseHvBulkActions = () => {
  const columns = useMemo(() => getColumns(), []);
  const [data, setData] = useState(makeData(64));

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    selectedFlatRows,
    toggleAllRowsSelected,
    getHvBulkActionsProps,
    getHvPaginationProps,
  } = useHvData<AssetEvent, string>(
    { columns, data },
    useHvPagination,
    useHvRowSelection,
    useHvBulkActions,
  );

  const handleAction = useCallback(
    (evt, action) => {
      const selected = selectedFlatRows.map((el) => el.original);

      switch (action.id) {
        case "duplicate": {
          const newEls = selected.map((el) => ({
            ...el,
            id: `${el.id}-copy`,
            name: `${el.name}-copy`,
          }));
          setData([...data, ...newEls]);
          break;
        }
        case "delete": {
          const selectedIds = selected.map((el) => el.id);
          toggleAllRowsSelected?.(false);
          setData(data.filter((el) => !selectedIds.includes(el.id)));
          break;
        }
        case "lock":
        case "preview":
        default:
          break;
      }
    },
    [data, selectedFlatRows, toggleAllRowsSelected],
  );

  const EmptyStateRow = useCallback(
    () => (
      <HvTableRow>
        <HvTableCell colSpan={100} style={{ height: 96 }}>
          <HvEmptyState message="No data to display." icon={<Ban />} />
        </HvTableCell>
      </HvTableRow>
    ),
    [],
  );

  return (
    <>
      <HvBulkActions
        {...getHvBulkActionsProps?.()}
        maxVisibleActions={1}
        onAction={handleAction}
        actions={[
          { id: "duplicate", label: "Duplicate", icon: <Duplicate /> },
          { id: "delete", label: "Delete", icon: <Delete /> },
          { id: "lock", label: "Lock", icon: <Lock /> },
          { id: "preview", label: "Preview", icon: <Preview /> },
        ]}
      />
      <HvTableContainer>
        <HvTable {...getTableProps()}>
          <HvTableHead>
            {headerGroups.map((headerGroup) => (
              <HvTableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((col) => (
                  <HvTableHeader {...col.getHeaderProps()}>
                    {col.render("Header")}
                  </HvTableHeader>
                ))}
              </HvTableRow>
            ))}
          </HvTableHead>
          <HvTableBody {...getTableBodyProps()}>
            {page?.length ? (
              page.map((row) => {
                prepareRow(row);

                return (
                  <HvTableRow {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <HvTableCell {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </HvTableCell>
                    ))}
                  </HvTableRow>
                );
              })
            ) : (
              <EmptyStateRow />
            )}
          </HvTableBody>
        </HvTable>
      </HvTableContainer>
      {page?.length ? (
        <HvPagination {...getHvPaginationProps?.()} />
      ) : undefined}
    </>
  );
};
