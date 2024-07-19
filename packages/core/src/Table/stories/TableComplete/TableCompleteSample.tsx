import { useMemo } from "react";
import {
  HvRowInstance,
  HvToggleButton,
} from "@hitachivantara/uikit-react-core";
import {
  Delete,
  Duplicate,
  Lock,
  Preview,
  Share,
  Unlock,
} from "@hitachivantara/uikit-react-icons";

import { AssetEvent, getColumns, useServerData } from "../storiesUtils";
import { TableComplete as Table, TableProps } from "./TableComplete";

const useColumns = () => {
  return useMemo<TableProps<AssetEvent>["columns"]>(
    () => [
      ...getColumns(),
      {
        id: "lock",
        variant: "actions",
        Cell: ({ row }: { row: HvRowInstance<AssetEvent> }) => (
          <HvToggleButton
            aria-label="Lock"
            notSelectedIcon={<Unlock />}
            selectedIcon={<Lock />}
            selected={row.isSelectionLocked}
            onClick={() => row.toggleRowLockedSelection?.()}
          />
        ),
      },
    ],
    [],
  );
};

export const TableComplete = () => {
  const columns = useColumns();
  const { data, loading, fetchData, mutateData, totalRecords } =
    useServerData();

  const handleAction: TableProps<AssetEvent>["onAction"] = (
    event,
    action,
    row,
  ) => {
    const { original: rowData } = row;
    console.log(`Action ${action.id} on row ${row.id}`, rowData);
    if (action.id === "duplicate") {
      const newElement = {
        ...rowData,
        id: `${rowData.id}-copy`,
        name: `${rowData.name}-copy`,
      };
      mutateData("add", [newElement]);
    } else if (action.id === "remove") {
      mutateData("remove", [rowData.id]);
    }
  };

  const handleBulkAction: TableProps<AssetEvent>["onBulkAction"] = (
    event,
    action,
    selectedRows,
  ) => {
    console.log(`Bulk Action ${action.id} on rows`, selectedRows);
    if (action.id === "duplicate") {
      const newElements = selectedRows.map((el) => ({
        ...el.original,
        id: `${el.original.id}-copy`,
        name: `${el.original.name}-copy`,
      }));
      mutateData("add", newElements);
    } else if (action.id === "remove") {
      const idsToRemove = selectedRows.map((el) => el.original.id);
      mutateData("remove", idsToRemove);
    }
  };

  return (
    <Table<AssetEvent>
      data={data}
      columns={columns}
      loading={loading}
      recordCount={totalRecords}
      showBulkActions
      showPagination
      initialState={{
        selectedRowIds: { 2: true },
        lockedSelectionRowIds: { 2: true, 6: true },
      }}
      actions={[
        {
          id: "duplicate",
          label: "Duplicate",
          icon: <Duplicate />,
          isBulk: true,
        },
        { id: "preview", label: "Preview", icon: <Preview />, isBulk: true },
        { id: "share", label: "Share", icon: <Share /> },
        { id: "remove", label: "Remove", icon: <Delete />, isBulk: true },
      ]}
      onAction={handleAction}
      onBulkAction={handleBulkAction}
      onUpdate={({ pageIndex, pageSize, sortBy }) => {
        fetchData({ pageIndex, pageSize, sortBy });
      }}
      options={{
        showSelectAllPages: false,
        autoResetSelectedRows: false,
        aditivePageBulkSelection: true,
        subtractivePageBulkDeselection: false,
        getRowId: (row) => row.id,
      }}
    />
  );
};
