import { useState, useMemo } from "react";
import {
  HvGrid,
  HvGridProps,
  HvGlobalActions,
  HvButton,
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
  useHvFilters,
} from "@hitachivantara/uikit-react-core";

import { Kpi } from "./Kpi";
import { Table } from "./Table";
import { getColumns, actions } from "./utils";
import { makeData } from "./data";
import classes from "./styles";

const idsToControl = {
  cards: "cardsGrid",
  list: "itemList",
};

const ListView = () => {
  const originalData = useMemo(() => makeData(25), []);
  const [data] = useState(originalData);
  const columns = useMemo(() => getColumns(), []);
  const [isLoading, setIsLoading] = useState(false);
  const [kpiSelection, setKpiSelection] = useState<number | undefined>();
  const breakpoints = { xl: 3, lg: 3, md: 3, sm: 6, xs: 12 } as HvGridProps;

  const instance = useHvData(
    {
      data,
      columns,
      initialState: { pageSize: 5 },
    },
    useHvGlobalFilter,
    useHvFilters,
    useHvSortBy,
    useHvPagination,
    useHvRowSelection,
    useHvBulkActions
  );

  const bulkActionProps = instance.getHvBulkActionsProps?.();

  const doRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
    instance.setFilter("status", "");
  };

  const handleAction = (event: Event, id: string, action: HvActionGeneric) => {
    if (action.id === "refresh") {
      doRefresh();
    }
  };

  const getRequestCount = (status: number) => {
    return instance.initialRows.filter((r) => r.original.status === status)
      .length;
  };

  return (
    <>
      <HvGlobalActions title="Requests" backButton={false}>
        <HvButton variant="primary">Request Server</HvButton>
      </HvGlobalActions>

      <HvGrid container className={classes.paddingTop}>
        <HvGrid item {...breakpoints}>
          <Kpi
            title="Sucess Requests"
            count={getRequestCount(0)}
            color="sema1"
            variation="up"
            status={0}
            instance={instance}
            kpiSelection={kpiSelection}
            setKpiSelection={setKpiSelection}
          />
        </HvGrid>
        <HvGrid item {...breakpoints}>
          <Kpi
            title="Error Requests"
            count={getRequestCount(1)}
            color="sema4"
            variation="down"
            status={1}
            instance={instance}
            kpiSelection={kpiSelection}
            setKpiSelection={setKpiSelection}
          />
        </HvGrid>
        <HvGrid item {...breakpoints}>
          <Kpi
            title="Open Requests"
            count={getRequestCount(2)}
            color="sema3"
            variation="down"
            status={2}
            instance={instance}
            kpiSelection={kpiSelection}
            setKpiSelection={setKpiSelection}
          />
        </HvGrid>
        <HvGrid item {...breakpoints}>
          <Kpi
            title="Unassigned Requests"
            count={getRequestCount(3)}
            color="sema2"
            variation="up"
            status={3}
            instance={instance}
            kpiSelection={kpiSelection}
            setKpiSelection={setKpiSelection}
          />
        </HvGrid>
      </HvGrid>

      <HvControls
        className={classes.paddingTop}
        views={[]}
        defaultView="card"
        callbacks={instance}
      >
        <HvLeftControl
          placeholder="Search"
          searchProps={{
            inputProps: {
              "aria-controls": `${idsToControl.cards} ${idsToControl.list}`,
            },
          }}
        />
        <HvRightControl hideSortBy />
      </HvControls>

      <HvBulkActions
        className={classes.marginTop}
        {...bulkActionProps}
        numTotal={data.length}
        numSelected={instance.selectedFlatRows.length}
        maxVisibleActions={2}
        onSelectAll={() => bulkActionProps.onSelectAll()}
        onSelectAllPages={() => bulkActionProps.onSelectAllPages()}
        actions={actions}
        actionsDisabled={false}
        actionsCallback={handleAction}
        checkboxProps={{
          "aria-controls": `${idsToControl.cards} ${idsToControl.list}`,
        }}
      />

      <div className={classes.marginTop}>
        <Table instance={instance} isLoading={isLoading} />
        {instance.page?.length ? (
          <HvPagination {...instance.getHvPaginationProps()} />
        ) : undefined}
      </div>
    </>
  );
};

export default ListView;
