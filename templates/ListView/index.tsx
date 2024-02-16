import { useState, useMemo, useEffect } from "react";
import {
  HvGrid,
  HvGridProps,
  HvGlobalActions,
  HvButton,
  HvBulkActions,
  HvPagination,
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
  HvLeftControlProps,
  HvActionsGenericProps,
} from "@hitachivantara/uikit-react-core";

import { LoadingContainer } from "../utils";
import { Kpi } from "./Kpi";
import { Table } from "./Table";
import classes from "./styles";
import {
  PaginationDataProps,
  useSummaryData,
  usePaginationData,
  getColumns,
  actions,
  ListViewEntry,
  idsToControl,
} from "./data";

const INIT_PAGE_SIZE = 5;

const ListView = () => {
  const breakpoints = { xl: 3, lg: 3, md: 3, sm: 6, xs: 12 } as HvGridProps;

  const [kpiSelection, setKpiSelection] = useState<number | undefined>();

  const [params, setParams] = useState<PaginationDataProps>({
    limit: INIT_PAGE_SIZE,
    skip: 0,
  });

  const {
    data: { pages, data },
    loading,
  } = usePaginationData(params);

  const { data: indicatorData, loading: indicatorLoading } = useSummaryData();

  const columns = useMemo(() => getColumns(), []);

  const instance = useHvData<ListViewEntry, string>(
    {
      data,
      columns,
      manualPagination: true,
      autoResetPage: false,
      manualFilters: true,
      autoResetFilters: true,
      pageCount: pages,
      initialState: { pageSize: INIT_PAGE_SIZE },
    },
    useHvGlobalFilter,
    useHvFilters,
    useHvSortBy,
    useHvPagination,
    useHvRowSelection,
    useHvBulkActions
  );

  useEffect(() => {
    const { pageSize = INIT_PAGE_SIZE, pageIndex = 0 } = instance.state;

    setParams((prev) => ({
      ...prev,
      limit: pageSize,
      skip: pageSize * pageIndex,
    }));
  }, [instance.state]);

  useEffect(() => {
    instance.gotoPage?.(0);
    setParams((prev) => ({
      ...prev,
      skip: 0,
      filter:
        instance.state.filters && instance.state.filters?.length > 0
          ? instance.state.filters[0]
          : undefined,
    }));
  }, [instance, instance.state.filters]);

  const bulkActionProps = instance.getHvBulkActionsProps?.();

  const handleAction: HvActionsGenericProps["onAction"] = (event, action) => {
    if (action.id === "refresh") {
      instance.gotoPage?.(0);
      setKpiSelection(undefined);
      setParams((prev) => ({
        ...prev,
        skip: 0,
        filter: undefined,
      }));
    }
  };

  const handleSearch: HvLeftControlProps["onSearch"] = (e, value) => {
    instance.gotoPage?.(0);
    setParams((prev) => ({
      ...prev,
      skip: 0,
      search: value,
    }));
  };

  return (
    <>
      <HvGlobalActions title="Requests" backButton={false}>
        <HvButton variant="primary">Request Server</HvButton>
      </HvGlobalActions>

      <HvGrid container className={classes.paddingTop}>
        <HvGrid item {...breakpoints}>
          <Kpi
            title="Success Requests"
            color="positive"
            status={0}
            instance={instance}
            kpiSelection={kpiSelection}
            setKpiSelection={setKpiSelection}
            loading={indicatorLoading}
            count={indicatorData?.success.count}
            variation={indicatorData?.success.variation}
            trendData={indicatorData?.success.data}
          />
        </HvGrid>
        <HvGrid item {...breakpoints}>
          <Kpi
            title="Error Requests"
            color="negative"
            status={1}
            instance={instance}
            kpiSelection={kpiSelection}
            setKpiSelection={setKpiSelection}
            loading={indicatorLoading}
            count={indicatorData?.error.count}
            variation={indicatorData?.error.variation}
            trendData={indicatorData?.error.data}
          />
        </HvGrid>
        <HvGrid item {...breakpoints}>
          <Kpi
            title="Open Requests"
            color="warning"
            status={2}
            instance={instance}
            kpiSelection={kpiSelection}
            setKpiSelection={setKpiSelection}
            loading={indicatorLoading}
            count={indicatorData?.open.count}
            variation={indicatorData?.open.variation}
            trendData={indicatorData?.open.data}
          />
        </HvGrid>
        <HvGrid item {...breakpoints}>
          <Kpi
            title="Unassigned Requests"
            color="neutral"
            status={3}
            instance={instance}
            kpiSelection={kpiSelection}
            setKpiSelection={setKpiSelection}
            loading={indicatorLoading}
            count={indicatorData?.unassign.count}
            variation={indicatorData?.unassign.variation}
            trendData={indicatorData?.unassign.data}
          />
        </HvGrid>
      </HvGrid>

      <HvControls
        className={classes.paddingTop}
        defaultView="card"
        callbacks={instance}
      >
        <HvLeftControl
          placeholder="Search"
          onSearch={handleSearch}
          searchProps={{
            inputProps: {
              "aria-label": "Search",
              "aria-controls": idsToControl.list,
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
        onSelectAll={() => bulkActionProps?.onSelectAll()}
        onSelectAllPages={() => bulkActionProps?.onSelectAllPages()}
        actions={actions}
        actionsDisabled={false}
        onAction={handleAction}
        checkboxProps={{
          "aria-controls": idsToControl.list,
        }}
      />

      <LoadingContainer loading={loading}>
        <div className={classes.marginTop}>
          <Table instance={instance} id={idsToControl.list} />
          {instance.page?.length > 1 && (
            <HvPagination {...instance.getHvPaginationProps?.()} />
          )}
        </div>
      </LoadingContainer>
    </>
  );
};

export default ListView;
