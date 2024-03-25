import { useState, useMemo, useEffect, useId } from "react";
import { css } from "@emotion/css";
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
  HvLoadingContainer,
  theme,
} from "@hitachivantara/uikit-react-core";

import { Kpi } from "./Kpi";
import { Table } from "./Table";
import {
  AssetDataParams,
  AssetEvent,
  actions,
  getColumns,
  usePaginationData,
  useSummaryData,
} from "./data";

const classes = {
  paddingTop: css({
    paddingTop: theme.space.md,
  }),
  marginTop: css({
    marginTop: theme.space.md,
  }),
};

const INIT_PAGE_SIZE = 5;
const breakpoints: HvGridProps = { xl: 3, lg: 3, md: 3, sm: 6, xs: 12 };

const ListView = () => {
  const listId = useId();

  const [statusSelection, setStatusSelection] =
    useState<AssetEvent["status"]>();

  const [params, setParams] = useState<AssetDataParams>({
    take: INIT_PAGE_SIZE,
    skip: 0,
  });

  const { data, isLoading } = usePaginationData(params);

  const { data: indicatorData, isLoading: indicatorLoading } = useSummaryData();

  const columns = useMemo(() => getColumns(), []);

  const instance = useHvData<AssetEvent, string>(
    {
      data: data?.items,
      columns,
      manualPagination: true,
      autoResetPage: false,
      manualFilters: true,
      autoResetFilters: true,
      pageCount: Math.ceil((data?.total || 0) / params.take),
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
    const pageSize = instance.state.pageSize || INIT_PAGE_SIZE;
    const pageIndex = instance.state.pageIndex || 0;

    setParams((prev) => ({
      ...prev,
      take: pageSize,
      skip: pageSize * pageIndex,
    }));
  }, [instance.state.pageIndex, instance.state.pageSize]);

  const handleAction: HvActionsGenericProps["onAction"] = (event, action) => {
    if (action.id === "refresh") {
      instance.gotoPage?.(0);
      setStatusSelection(undefined);
      setParams((prev) => ({ ...prev, skip: 0 }));
    }
  };

  const handleSearch: HvLeftControlProps["onSearch"] = (e, value) => {
    instance.gotoPage?.(0);
    setParams((prev) => ({
      ...prev,
      skip: 0,
      name: value,
    }));
  };

  const handleKpiSelection = (status: AssetEvent["status"]) => {
    setStatusSelection((prev) => (prev === status ? undefined : status));
    instance.gotoPage?.(0);
    setParams((prev) => ({
      ...prev,
      skip: 0,
      status,
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
            status="Open"
            selected={statusSelection === "Open"}
            onSelect={handleKpiSelection}
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
            status="Closed"
            selected={statusSelection === "Closed"}
            onSelect={handleKpiSelection}
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
            status="Pending"
            selected={statusSelection === "Pending"}
            onSelect={handleKpiSelection}
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
            status={undefined}
            selected={statusSelection === undefined}
            onSelect={handleKpiSelection}
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
          placeholder="Search by name"
          onSearch={handleSearch}
          searchProps={{
            inputProps: {
              "aria-label": "Search by name",
              "aria-controls": listId,
            },
          }}
        />
        <HvRightControl hideSortBy />
      </HvControls>

      <HvBulkActions
        className={classes.marginTop}
        {...instance.getHvBulkActionsProps?.()}
        numTotal={data?.items.length}
        numSelected={instance.selectedFlatRows.length}
        maxVisibleActions={2}
        actions={actions}
        actionsDisabled={false}
        onAction={handleAction}
        checkboxProps={{
          "aria-controls": listId,
        }}
      />

      <HvLoadingContainer hidden={!isLoading}>
        <div className={classes.marginTop}>
          <Table instance={instance} id={listId} />
          {instance.page?.length > 1 && (
            <HvPagination {...instance.getHvPaginationProps?.()} />
          )}
        </div>
      </HvLoadingContainer>
    </>
  );
};

export default ListView;
