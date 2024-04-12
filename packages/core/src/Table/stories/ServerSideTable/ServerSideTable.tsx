/* eslint-disable jsx-a11y/no-interactive-element-to-noninteractive-role, jsx-a11y/control-has-associated-label */
// I don't understand these rules enforced on a td inside an already presentational tr

import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

import {
  HvBulkActions,
  HvButton,
  HvEmptyState,
  HvInput,
  HvLoading,
  HvTable,
  HvTableBody,
  HvTableCell,
  HvTableContainer,
  HvTableHead,
  HvTableHeader,
  HvTableRow,
  HvTableSection,
  HvTypography,
  theme,
  useHvBulkActions,
  useHvData,
  useHvGlobalFilter,
  useHvRowSelection,
  useHvSortBy,
  useHvTableSticky,
} from "@hitachivantara/uikit-react-core";
import { Ban, Reload } from "@hitachivantara/uikit-react-icons";

import { useData } from "./data";

interface SalesData {
  Territory: string;
  Country: string;
  "State Province": string;
  City: string;
  Type: string;
  Line: string;
  Vendor: string;
  Product: string;
  Years: number;
  Quarters: string;
  Months: string;
  "Credit Limit": number;
  Customer: string;
  Quantity: number;
  Sales: number;
}

const baseUrl = "https://lumada-design.github.io/assets/steelwheels.arrow";
const pageSize = 20;

export const ServerSideTable = () => {
  const [url, setUrl] = useState(
    `${baseUrl}?pageSize=${pageSize}&sortBy=&filter=`
  );

  // based on https://swr.vercel.app/examples/infinite-loading
  const { data, mutate, size, setSize, isLoading, isValidating } =
    useData<SalesData>(url);

  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < pageSize);
  const isRefreshing = isValidating && data && data.length === size;

  const allRows = useMemo(() => data?.flat() || [], [data]);

  const {
    getTableProps,
    getTableHeadProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    rows,
    setGlobalFilter,
    getHvBulkActionsProps,
    selectedFlatRows,
    toggleAllRowsSelected,
    isAllRowsSelected,
    state: { globalFilter, sortBy },
  } = useHvData<any, string>(
    {
      data: allRows,
      stickyHeader: true,
      manualGlobalFilter: true,
      manualSortBy: true,
      autoResetSelectedRows: false,
    },
    useHvTableSticky,
    useHvGlobalFilter,
    useHvSortBy,
    useHvRowSelection,
    useHvBulkActions
  );

  useEffect(() => {
    const urlEncodedSortBy = sortBy
      ?.map((sort) => {
        return `${sort.id}:${sort.desc ? "desc" : "asc"}`;
      })
      .join("&sortBy=");
    setUrl(
      `${baseUrl}?pageSize=${pageSize}&sortBy=${urlEncodedSortBy}&filter=${
        globalFilter ?? ""
      }`
    );
  }, [sortBy, globalFilter]);

  const containerRef = useRef<HTMLElement>(null);

  const rowVirtualizer = useVirtualizer({
    // until we know the total size, we'll pretend there is always one more row
    count: allRows.length + (isReachingEnd ? 0 : 1),
    // we're using a HvTableContainer with internal scrolling
    // can be interesting to try to use the window as the scroll container
    getScrollElement: () => containerRef.current,
    // estimated row height... this works best when the row height is constant
    // e.g. when the cells' contents don't wrap
    // it is not the case in this sample, so finding a good estimate is a bit trial and error
    estimateSize: () => 52,
    overscan: 5,
  });

  const items = rowVirtualizer.getVirtualItems();
  const firstItem = items.length > 0 ? items[0] : null;
  const lastItem = items.length > 0 ? items[items.length - 1] : null;

  useEffect(() => {
    if (!lastItem) {
      return;
    }

    // if the fake last item is visible, load more
    if (lastItem.index >= allRows.length - 1 && !isLoadingMore) {
      setSize((currentSize) => currentSize + 1);
    }
  }, [setSize, allRows.length, isLoadingMore, lastItem]);

  const tableRows: ReactNode[] = [];
  for (let i = 0; i < items.length; i++) {
    const virtualRow = items[i];

    const isLoaderRow = virtualRow.index > allRows.length - 1;
    if (isLoaderRow) {
      if (!isReachingEnd) {
        // display a loader at the end of the list
        tableRows.push(
          <tr
            key="loader_row"
            role="presentation"
            style={{
              // this is innocuous when we're rendering just one fake row,
              // but it makes the loading position more attractive
              // when the total amount of data is known beforehand
              // so when can scroll much further down
              // try playing with the count in the useVirtualizer options to see the effect
              position: "sticky",
              top: "50%",
            }}
          >
            <td
              role="presentation"
              colSpan={headerGroups.at(0)?.headers.length}
            >
              <HvLoading role="presentation" />
            </td>
          </tr>
        );
      }

      break;
    }

    const row = rows[virtualRow.index];
    prepareRow(row);

    tableRows.push(
      <HvTableRow
        striped
        {...row.getRowProps()}
        // accessibility properties needed when virtualizing dom elements
        aria-rowindex={virtualRow.index + 1} // 1-based index

        // there are used when virtualizing lists, not tables
        // aria-setsize={!isReachingEnd ? -1 : allRows.length}
        // aria-posinset={virtualRow.index}
      >
        {row.cells.map((cell) => (
          <HvTableCell {...cell.getCellProps()}>
            {cell.render("Cell")}
          </HvTableCell>
        ))}
      </HvTableRow>
    );
  }

  // server side bulk selection is a mess... not only it is difficult to maintain the selection state
  // but also the HvBulkActions component is not designed to handle an undefined number of items
  const [isSelectAll, setIsSelectAll] = useState(false);
  const numberLoaded = useRef(allRows.length);
  useEffect(() => {
    if (isSelectAll && numberLoaded.current !== allRows.length) {
      // this has everything to go wrong, but let's try to find out if new data was loaded
      // and mark it as selected if the select all flag is set
      numberLoaded.current = allRows.length;
      toggleAllRowsSelected?.(true);
    } else if (!isAllRowsSelected) {
      // unset the select all flag if the user unselects a row
      setIsSelectAll(false);
    }
  }, [isAllRowsSelected, toggleAllRowsSelected, allRows.length, isSelectAll]);

  return (
    <HvTableSection
      raisedHeader
      title={<HvTypography variant="title4">Steel Wheels</HvTypography>}
      actions={
        <>
          <HvInput
            type="search"
            placeholder="Search all columns"
            onChange={(e, v) => setGlobalFilter?.(v)}
          />
          <HvButton
            variant="secondaryGhost"
            onClick={() => mutate()}
            disabled={isLoadingMore || isRefreshing}
          >
            <Reload /> Refresh
          </HvButton>
        </>
      }
    >
      <HvBulkActions
        {...getHvBulkActionsProps?.()}
        showSelectAllPages={!isReachingEnd && !isSelectAll}
        numTotal={allRows.length + 1}
        selectAllPagesLabel="Select all"
        checkboxProps={{
          ...(isSelectAll ? { indeterminate: false } : {}),
          label: (
            <HvTypography component="span" variant="body">
              {selectedFlatRows.length === 0 ? (
                <>
                  <HvTypography variant="label">All</HvTypography>
                  {isReachingEnd
                    ? ` (${allRows.length})`
                    : ` (${allRows.length} loaded rows)`}
                </>
              ) : !isSelectAll ? (
                <>
                  <HvTypography variant="label">
                    {selectedFlatRows.length}
                  </HvTypography>
                  {isReachingEnd
                    ? ` / ${allRows.length}`
                    : ` of ${allRows.length} loaded rows`}
                </>
              ) : (
                <>
                  <HvTypography variant="label">All</HvTypography>
                  {` (more than ${allRows.length})`}
                </>
              )}
            </HvTypography>
          ),
        }}
        onSelectAllPages={() => {
          setIsSelectAll(true);
          toggleAllRowsSelected?.(true);
        }}
        onSelectAll={(e, checked) => {
          setIsSelectAll(false);
          toggleAllRowsSelected?.(checked);
        }}
      />

      <HvTableContainer
        ref={containerRef}
        style={{
          maxHeight: 480,
          // reduces the amount of jumps by telling the browser to not try to adjust the scroll position
          overflowAnchor: "none",
        }}
      >
        <HvTable
          {...getTableProps()}
          style={{
            // reduces layout shifts when loading more data...
            // the initial column widths are defined by the initial set of data
            tableLayout: "fixed",
          }}
          // accessibility properties needed when virtualizing dom elements
          aria-rowcount={!isReachingEnd ? -1 : allRows.length}
        >
          <HvTableHead {...getTableHeadProps?.()}>
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
            {tableRows.length > 0 ? (
              <>
                <tr
                  key="padding_top"
                  style={{
                    display: "block",
                    height: items.length > 0 ? items[0].start : 0,
                  }}
                  role="presentation"
                />
                {
                  // fix odd/even row striping when using striped prop
                  // (striped no longer works when using HvTableSection?)
                  firstItem != null && firstItem.index % 2 === 0 && (
                    <tr
                      key="even_row"
                      style={{
                        display: "block",
                        height: 0,
                      }}
                      role="presentation"
                    />
                  )
                }
                {tableRows}
                <tr
                  key="padding_bottom"
                  role="presentation"
                  style={{
                    display: "block",
                    height:
                      lastItem != null
                        ? rowVirtualizer.getTotalSize() - lastItem.end
                        : 0,
                  }}
                />
              </>
            ) : (
              <HvTableRow>
                <HvTableCell
                  colSpan={headerGroups.at(0)?.headers.length}
                  style={{ height: theme.spacing("xl") }}
                >
                  <HvEmptyState message="No data" icon={<Ban role="none" />} />
                </HvTableCell>
              </HvTableRow>
            )}
          </HvTableBody>
        </HvTable>
      </HvTableContainer>
    </HvTableSection>
  );
};
