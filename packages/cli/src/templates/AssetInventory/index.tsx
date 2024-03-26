import { useState, useMemo, useEffect, useId } from "react";
import { css } from "@emotion/css";
import {
  HvBulkActions,
  HvPagination,
  HvControls,
  HvLeftControl,
  HvRightControl,
  useHvData,
  useHvGlobalFilter,
  useHvRowSelection,
  useHvBulkActions,
  useHvPagination,
  useHvSortBy,
  HvLeftControlProps,
  HvActionsGenericProps,
  theme,
} from "@hitachivantara/uikit-react-core";

import { ListView } from "./ListView";
import { CardView } from "./CardView";
import {
  AssetEvent,
  AssetDataParams,
  useAssetData,
  actions,
  views,
  rightControlValues,
  getColumns,
  useStickyResult,
} from "./data";

const classes = {
  root: css({
    display: "grid",
    gap: theme.space.sm,
  }),
};

const PAGE_OPTIONS = [6, 12, 18];

const AssetInventory = () => {
  const [currentView, setCurrentView] = useState("card");
  const [params, setParams] = useState<AssetDataParams>({
    take: PAGE_OPTIONS[0],
    skip: 0,
  });

  const cardViewId = useId();
  const listViewId = useId();

  const { data: dataRes, isLoading } = useAssetData(params);
  const data = useStickyResult(dataRes);

  const columns = useMemo(() => getColumns(isLoading), [isLoading]);

  const instance = useHvData<AssetEvent, string>(
    {
      data: data?.items,
      columns,
      manualPagination: true,
      manualSortBy: true,
      autoResetPage: false,
      autoResetSortBy: true,
      pageCount: Math.ceil((data?.total || 0) / params.take),
      initialState: { pageSize: PAGE_OPTIONS[0] },
    },
    useHvGlobalFilter,
    useHvSortBy,
    useHvPagination,
    useHvRowSelection,
    useHvBulkActions
  );

  useEffect(() => {
    const pageSize = instance.state.pageSize || PAGE_OPTIONS[0];
    const pageIndex = instance.state.pageIndex || 0;
    const sortBy = instance.state.sortBy?.[0];

    setParams((prev) => ({
      ...prev,
      ...(sortBy && {
        sort: `${sortBy.id}-${sortBy.desc ? "desc" : "asc"}`,
      }),
      take: pageSize,
      skip: pageSize * pageIndex,
    }));
  }, [
    instance.state.pageIndex,
    instance.state.pageSize,
    instance.state.sortBy,
  ]);

  const handleSearch: HvLeftControlProps["onSearch"] = (e, value) => {
    instance.gotoPage?.(0);
    setParams((prev) => ({
      ...prev,
      skip: 0,
      name: value,
    }));
  };

  const handleAction: HvActionsGenericProps["onAction"] = async (
    event,
    action
  ) => {
    alert(
      `Callback for action ${action.label} on items ${instance.selectedFlatRows
        .map((r) => r.original.id)
        .join(", ")}`
    );
  };

  return (
    <div className={classes.root}>
      <HvControls
        views={views}
        callbacks={instance}
        defaultView="card"
        onViewChange={(evt, id) => setCurrentView(id)}
      >
        <HvLeftControl
          placeholder="Search by name"
          onSearch={handleSearch}
          searchProps={{
            inputProps: {
              "aria-label": "Search by name",
              "aria-controls": `${cardViewId} ${listViewId}`,
            },
          }}
        />
        <HvRightControl
          values={rightControlValues}
          sortProps={{
            "aria-label": "Sort by",
            "aria-controls": `${cardViewId} ${listViewId}`,
          }}
        />
      </HvControls>

      <HvBulkActions
        {...instance.getHvBulkActionsProps?.()}
        numTotal={data?.items.length}
        numSelected={instance.selectedFlatRows.length}
        maxVisibleActions={2}
        actions={actions}
        onAction={handleAction}
        checkboxProps={{
          "aria-controls": `${cardViewId} ${listViewId}`,
        }}
      />

      {currentView === "card" && (
        <CardView id={cardViewId} instance={instance} loading={isLoading} />
      )}

      {currentView === "list" && (
        <ListView id={listViewId} instance={instance} columns={columns} />
      )}

      {instance.page?.length ? (
        <HvPagination
          {...instance.getHvPaginationProps?.()}
          pageSizeOptions={PAGE_OPTIONS}
          labels={{
            pageSizeEntryName: currentView === "card" ? "cards" : "rows",
          }}
        />
      ) : undefined}
    </div>
  );
};

export default AssetInventory;
