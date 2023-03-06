import { useState, useMemo } from "react";
import {
  HvBulkActions,
  HvPagination,
  HvActionGeneric,
  HvControls,
  HvLeftControl,
  HvRightControl,
  useHvData,
  useHvSortBy,
  useHvGlobalFilter,
  useHvRowSelection,
  useHvBulkActions,
  useHvPagination,
} from "@hitachivantara/uikit-react-core";

import { ListView, CardView } from "components/assetInventory";
import {
  getColumns,
  makeData,
  actions,
  views,
  idsToControl,
  rightControlValues,
} from "lib/utils/assetInventory";
import classes from "./styles";

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

  const handleAction = (event: Event, id: string, action: HvActionGeneric) =>
    alert(
      `Callback for action ${action.label} on items ${instance.selectedFlatRows
        .map((r) => r.id)
        .join(", ")}`
    );

  return (
    <div className={classes.root}>
      <HvControls
        views={views}
        defaultView="card"
        callbacks={instance}
        onViewChange={(evt, id) => setCurrentView(id)}
      >
        <HvLeftControl
          placeholder="Search"
          searchProps={{
            inputProps: {
              "aria-controls": `${idsToControl.cards} ${idsToControl.list}`,
            },
          }}
        />
        <HvRightControl
          values={rightControlValues}
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
        checkboxProps={{
          "aria-controls": `${idsToControl.cards} ${idsToControl.list}`,
        }}
      />

      {currentView === "card" && <CardView instance={instance} />}
      {currentView === "list" && <ListView instance={instance} />}

      {instance.page?.length ? (
        <HvPagination
          {...instance.getHvPaginationProps()}
          pageSizeOptions={[8, 16, 32]}
        />
      ) : undefined}
    </div>
  );
};

export default AssetInventory;
