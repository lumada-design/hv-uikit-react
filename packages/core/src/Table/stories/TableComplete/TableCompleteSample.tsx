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

import { AssetEvent, useServerData } from "../serverUtils";
import { TableComplete as Table, TableProps } from "./TableComplete";

const useColumns = () => {
  return useMemo<TableProps<AssetEvent>["columns"]>(
    () => [
      { Header: "Title", accessor: "name", style: { minWidth: 120 } },
      { Header: "Time", accessor: "createdDate", style: { minWidth: 100 } },
      { Header: "Event Type", accessor: "eventType", style: { minWidth: 100 } },
      { Header: "Status", accessor: "status", style: { minWidth: 100 } },
      {
        Header: "Probability",
        accessor: "riskScore",
        align: "right", // numeric values should be right-aligned
        Cell: ({ value }) => `${value}%`,
      },
      { Header: "Severity", accessor: "severity" },
      { Header: "Priority", accessor: "priority" },
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
      isLoading={loading}
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
      onUpdate={fetchData}
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
