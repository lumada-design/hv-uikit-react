import React, { useState, useMemo } from "react";
import { HvContainer, HvBulkActions, HvPagination } from "@hitachivantara/uikit-react-core";
import {
  HvControls,
  HvLeftControl,
  HvRightControl,
  useHvData,
  useHvSortBy,
  useHvGlobalFilter,
  useHvRowSelection,
  useHvBulkActions,
  useHvPagination,
} from "@hitachivantara/uikit-react-lab";
import ListView from "./ListView";
import CardView from "./CardView";
import { getColumns, makeData } from "./makedata";
import { actions, views, idsToControl } from "./utils";

const AssetInventory = () => {
  const originalData = useMemo(() => makeData(10), []);
  const [currentView, setCurrentView] = useState("card");
  const [data] = useState(originalData);
  const columns = useMemo(() => getColumns(), []);

  const instance = useHvData(
    {
      data,
      columns,
      initialState: { pageSize: 8 },
    },
    useHvGlobalFilter,
    useHvSortBy,
    useHvPagination,
    useHvRowSelection,
    useHvBulkActions
  );

  const bulkActionProps = instance.getHvBulkActionsProps?.();

  const handleAction = (e, id, action) =>
    alert(
      `Callback for action ${action.label} on items ${instance.selectedFlatRows
        .map((r) => r.id)
        .join(", ")}`
    );

  return (
    <HvContainer
      style={{
        display: "grid",
        gap: 20,
      }}
    >
      <HvControls
        views={views}
        defaultView="card"
        callbacks={instance}
        onViewChange={(evt, id) => setCurrentView(id)}
      >
        <HvLeftControl
          placeholder="Search"
          searchProps={{
            inputProps: { "aria-controls": `${idsToControl.cards} ${idsToControl.list}` },
          }}
        />
        <HvRightControl
          values={[
            { id: "nameAsc", accessor: "name", label: "Name Ascending", desc: false },
            { id: "nameDesc", accessor: "name", label: "Name Descending", desc: true },
            {
              id: "eventTypeAsc",
              accessor: "eventType",
              label: "Event Type Ascending",
              desc: false,
            },
            {
              id: "eventTypeDesc",
              accessor: "eventType",
              label: "Event Type Descending",
              desc: true,
            },
            { id: "severityAsc", accessor: "severity", label: "Severity Ascending", desc: false },
            { id: "severityDesc", accessor: "severity", label: "Severity Descending", desc: true },
          ]}
          sortProps={{
            "aria-controls": `${idsToControl.cards} ${idsToControl.list}`,
          }}
        />
      </HvControls>
      <HvBulkActions
        {...bulkActionProps}
        numTotal={data.length}
        numSelected={instance.selectedFlatRows.length}
        maxVisibleActions={2}
        onSelectAll={() => bulkActionProps.onSelectAll()}
        onSelectAllPages={() => bulkActionProps.onSelectAllPages()}
        actions={actions}
        actionsCallback={handleAction}
        checkboxProps={{ "aria-controls": `${idsToControl.cards} ${idsToControl.list}` }}
      />
      {currentView === "card" && <CardView instance={instance} />}
      {currentView === "list" && <ListView instance={instance} />}
      {instance.page?.length ? (
        <HvPagination {...instance.getHvPaginationProps()} pageSizeOptions={[8, 16, 32, 64]} />
      ) : undefined}
    </HvContainer>
  );
};

export default AssetInventory;
