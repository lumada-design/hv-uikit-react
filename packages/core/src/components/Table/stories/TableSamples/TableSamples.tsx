import { useMemo, useState } from "react";
import type { StoryObj } from "@storybook/react";
import { screen, waitFor } from "@storybook/testing-library";
import { useFlexLayout, useBlockLayout, useAbsoluteLayout } from "react-table";
import {
  HvTable,
  HvTableBody,
  HvTableContainer,
  HvTableHead,
  HvTableHeader,
  HvTableRow,
  HvTableCell,
  HvPagination,
  HvTypography,
  HvBulkActions,
  HvToggleButton,
  HvDropdown,
  HvSwitch,
  HvButton,
  HvListValue,
  useHvData,
  useHvPagination,
  useHvRowSelection,
  useHvBulkActions,
  useHvResizeColumns,
  HvTableColumnConfig,
} from "@hitachivantara/uikit-react-core";
import { Delete, Lock, Unlock } from "@hitachivantara/uikit-react-icons";

import { makeData, getColumns, AssetEvent } from "../storiesUtils";

import { TableComplete } from "./TableCompleteSample";
import TableCompleteRaw from "./TableCompleteSample?raw";

export const CompleteStory: StoryObj = {
  parameters: {
    docs: { source: { code: TableCompleteRaw } },
    eyes: {
      runBefore: () =>
        waitFor(() => screen.getByRole("button", { name: /Next Page/i })),
    },
  },
  render: () => <TableComplete />,
};

const LockedSelection = () => {
  const data = useMemo(() => makeData(64), []);

  const columns: HvTableColumnConfig<AssetEvent, string>[] = useMemo(
    () => [
      ...getColumns(),
      {
        id: "actions",
        variant: "actions",
        Cell: ({ row }) => {
          return (
            <HvToggleButton
              aria-label="Lock"
              notSelectedIcon={<Unlock />}
              selectedIcon={<Lock />}
              selected={row.isSelectionLocked}
              onClick={() => row.toggleRowLockedSelection?.()}
            />
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    rows,
    selectedFlatRows,
    getHvBulkActionsProps,
    getHvPaginationProps,
  } = useHvData<AssetEvent, string>(
    {
      columns,
      data,
      aditivePageBulkSelection: true,
      subtractivePageBulkDeselection: false,
      initialState: {
        selectedRowIds: { 5: true, 7: true },
        lockedSelectionRowIds: { 2: true, 6: true },
      },
    },
    useHvPagination,
    useHvRowSelection,
    useHvBulkActions
  );

  return (
    <>
      <HvBulkActions
        {...getHvBulkActionsProps?.()}
        numTotal={rows.length}
        numSelected={selectedFlatRows.length}
        showSelectAllPages
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
            {page.map((row) => {
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
            })}
          </HvTableBody>
        </HvTable>
      </HvTableContainer>
      {page?.length ? (
        <HvPagination {...getHvPaginationProps?.()} />
      ) : undefined}
    </>
  );
};

export const LockedSelectionStory: StoryObj = {
  parameters: {
    docs: {
      source: {
        code: `
const data = useMemo(() => makeData(64), []);
const columns: HvTableColumnConfig<AssetEvent, string>[] = useMemo(
  () => [
    ...getColumns(),
    {
      id: "actions",
      variant: "actions",
      Cell: ({ row }) => {
        return (
          <HvToggleButton
            aria-label="Lock"
            notSelectedIcon={<Unlock />}
            selectedIcon={<Lock />}
            selected={row.isSelectionLocked}
            onClick={() => row.toggleRowLockedSelection?.()}
          />
        );
      },
    },
  ],
  []
);
const {
  getTableProps,
  getTableBodyProps,
  prepareRow,
  headerGroups,
  page,
  rows,
  selectedFlatRows,
  getHvBulkActionsProps,
  getHvPaginationProps,
} = useHvData<AssetEvent, string>(
  {
    columns,
    data,
    aditivePageBulkSelection: true,
    subtractivePageBulkDeselection: false,
    initialState: {
      selectedRowIds: { 5: true, 7: true },
      lockedSelectionRowIds: { 2: true, 6: true },
    },
  },
  useHvPagination,
  useHvRowSelection,
  useHvBulkActions
);
return (
  <>
    <HvBulkActions
      {...getHvBulkActionsProps?.()}
      numTotal={rows.length}
      numSelected={selectedFlatRows.length}
      showSelectAllPages
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
          {page.map((row) => {
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
          })}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
    {page?.length ? (
      <HvPagination {...getHvPaginationProps?.()} />
    ) : undefined}
  </>
);`,
      },
    },
  },
  render: () => <LockedSelection />,
};

const SampleTable = ({ columns, data, layoutHook, component }) => {
  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    rows,
    selectedFlatRows,
    getHvBulkActionsProps,
    getHvPaginationProps,
  } = useHvData(
    {
      columns,
      data,
    },
    layoutHook,
    useHvPagination,
    useHvRowSelection,
    useHvBulkActions
  );

  return (
    <>
      <HvBulkActions
        {...getHvBulkActionsProps?.()}
        numTotal={rows.length}
        numSelected={selectedFlatRows.length}
        showSelectAllPages
      />
      <HvTableContainer>
        <HvTable {...getTableProps()} component={component}>
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
            {page.map((row) => {
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
            })}
          </HvTableBody>
        </HvTable>
      </HvTableContainer>
      {page?.length ? (
        <HvPagination {...getHvPaginationProps?.()} />
      ) : undefined}
    </>
  );
};

const AlternativeLayout = () => {
  const alternativeLayouts = useMemo<HvListValue[]>(
    () => [
      {
        id: "0",
        label: "useFlexLayout",
        hook: useFlexLayout,
        selected: true,
      },
      { id: "1", label: "useBlockLayout", hook: useBlockLayout },
      { id: "2", label: "useAbsoluteLayout", hook: useAbsoluteLayout },
    ],
    []
  );

  const [layoutHook, setLayoutHook] = useState(() => useFlexLayout);
  const [tableElements, setTableElements] = useState(false);

  const data = useMemo(() => makeData(64), []);

  const columns: HvTableColumnConfig<AssetEvent, string>[] = useMemo(
    () => [
      { Header: "Title", accessor: "name", minWidth: 120 },
      { Header: "Time", accessor: "createdDate", minWidth: 100 },
      { Header: "Status", accessor: "status", width: 120 },
      {
        Header: "Probability",
        accessor: "riskScore",
        align: "right",
        Cell: ({ value }) => <>{value}%</>,
      },
      { Header: "Priority", accessor: "priority" },
      {
        id: "actions",
        variant: "actions",
        width: 32,
        Cell: () => {
          return (
            <HvButton aria-label="Delete" icon>
              <Delete />
            </HvButton>
          );
        },
      },
    ],
    []
  );

  const table = useMemo(
    () => (
      <SampleTable
        columns={columns}
        data={data}
        layoutHook={layoutHook}
        component={tableElements ? "table" : "div"}
        // Key ensures a new context for the SampleTable's
        // useHvTable call when React reconciles the tree
        key={layoutHook as any}
      />
    ),
    [columns, data, layoutHook, tableElements]
  );

  return (
    <>
      <div
        style={{ display: "flex", alignItems: "baseline", marginBottom: 20 }}
      >
        <div style={{ width: 200 }}>
          <HvDropdown
            label="Select layout"
            values={alternativeLayouts}
            multiSelect={false}
            onChange={(item) =>
              setLayoutHook(() => (item as HvListValue)?.hook)
            }
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", marginLeft: 20 }}>
          <HvTypography
            aria-hidden="true"
            onClick={() => setTableElements((v) => !v)}
            style={{ marginRight: 10 }}
          >
            <pre>&lt;div&gt;</pre>
          </HvTypography>
          <HvSwitch
            checked={tableElements}
            aria-label="Use table html elements"
            onChange={(_evt, newChecked) => setTableElements(newChecked)}
          />
          <HvTypography
            aria-hidden="true"
            onClick={() => setTableElements((v) => !v)}
            style={{ marginLeft: 10 }}
          >
            <pre>&lt;table&gt;</pre>
          </HvTypography>
        </div>
      </div>
      {table}
    </>
  );
};

export const AlternativeLayoutStory: StoryObj = {
  parameters: {
    docs: {
      source: {
        code: `
const alternativeLayouts = useMemo<HvListValue[]>(
  () => [
    {
      id: "0",
      label: "useFlexLayout",
      hook: useFlexLayout,
      selected: true,
    },
    { id: "1", label: "useBlockLayout", hook: useBlockLayout },
    { id: "2", label: "useAbsoluteLayout", hook: useAbsoluteLayout },
  ],
  []
);

const [layoutHook, setLayoutHook] = useState(() => useFlexLayout);
const [tableElements, setTableElements] = useState(false);

const data = useMemo(() => makeData(64), []);

const columns: HvTableColumnConfig<AssetEvent, string>[] = useMemo(
  () => [
    { Header: "Title", accessor: "name", minWidth: 120 },
    { Header: "Time", accessor: "createdDate", minWidth: 100 },
    { Header: "Status", accessor: "status", width: 120 },
    {
      Header: "Probability",
      accessor: "riskScore",
      align: "right",
      Cell: ({ value }) => <>{value}%</>,
    },
    { Header: "Priority", accessor: "priority" },
    {
      id: "actions",
      variant: "actions",
      width: 32,
      Cell: () => {
        return (
          <HvButton aria-label="Delete" icon>
            <Delete />
          </HvButton>
        );
      },
    },
  ],
  []
);

const table = useMemo(
  () => (
    <SampleTable
      columns={columns}
      data={data}
      layoutHook={layoutHook}
      component={tableElements ? "table" : "div"}
      // Key ensures a new context for the SampleTable's
      // useHvTable call when React reconciles the tree
      key={layoutHook as any}
    />
  ),
  [columns, data, layoutHook, tableElements]
);

return (
  <>
    <div
      style={{ display: "flex", alignItems: "baseline", marginBottom: 20 }}
    >
      <div style={{ width: 200 }}>
        <HvDropdown
          label="Select layout"
          values={alternativeLayouts}
          multiSelect={false}
          onChange={(item) =>
            setLayoutHook(() => (item as HvListValue)?.hook)
          }
        />
      </div>
      <div style={{ display: "flex", alignItems: "center", marginLeft: 20 }}>
        <HvTypography
          aria-hidden="true"
          onClick={() => setTableElements((v) => !v)}
          style={{ marginRight: 10 }}
        >
          <pre>&lt;div&gt;</pre>
        </HvTypography>
        <HvSwitch
          checked={tableElements}
          aria-label="Use table html elements"
          onChange={(_evt, newChecked) => setTableElements(newChecked)}
        />
        <HvTypography
          aria-hidden="true"
          onClick={() => setTableElements((v) => !v)}
          style={{ marginLeft: 10 }}
        >
          <pre>&lt;table&gt;</pre>
        </HvTypography>
      </div>
    </div>
    {table}
  </>
);`,
      },
    },
  },
  render: () => <AlternativeLayout />,
};

const ColumnResize = () => {
  const columns = useMemo<HvTableColumnConfig<AssetEvent, string>[]>(
    () => [
      { Header: "Title", accessor: "name", minWidth: 120 },
      { Header: "Time", accessor: "createdDate", minWidth: 100 },
      {
        Header: "Status",
        accessor: "status",
        width: 120,
        disableResizing: true,
      },
      {
        Header: "Probability",
        accessor: "riskScore",
        align: "right",
        Cell: ({ value }) => <>{value}%</>,
      },
      { Header: "Priority", accessor: "priority" },
    ],
    []
  );
  const data = useMemo(() => makeData(6), []);

  const defaultColumn = useMemo(
    () => ({
      minWidth: 150,
      width: 200,
      maxWidth: 400,
    }),
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useHvData<AssetEvent, string>(
      {
        columns,
        data,
        defaultColumn,
      },
      useBlockLayout,
      useHvResizeColumns
    );

  return (
    <HvTableContainer>
      <HvTable {...getTableProps()}>
        <HvTableHead>
          {headerGroups.map((headerGroup) => (
            <HvTableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((col) => (
                <HvTableHeader {...col.getHeaderProps({ align: col.align })}>
                  {col.render("Header")}
                </HvTableHeader>
              ))}
            </HvTableRow>
          ))}
        </HvTableHead>
        <HvTableBody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);

            return (
              <HvTableRow hover {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <HvTableCell
                    {...cell.getCellProps({ align: cell.column.align })}
                  >
                    {cell.render("Cell")}
                  </HvTableCell>
                ))}
              </HvTableRow>
            );
          })}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
  );
};

export const ColumnResizeStory: StoryObj = {
  parameters: {
    docs: {
      source: {
        code: `
const columns: HvTableColumnConfig<AssetEvent, string>[] = useMemo(
  () => [
    { Header: "Title", accessor: "name", minWidth: 120 },
    { Header: "Time", accessor: "createdDate", minWidth: 100 },
    {
      Header: "Status",
      accessor: "status",
      width: 120,
      disableResizing: true,
    },
    {
      Header: "Probability",
      accessor: "riskScore",
      align: "right",
      Cell: ({ value }) => <>{value}%</>,
    },
    { Header: "Priority", accessor: "priority" },
  ],
  []
);
const data = useMemo(() => makeData(6), []);

const defaultColumn = useMemo(
  () => ({
    minWidth: 150,
    width: 200,
    maxWidth: 400,
  }),
  []
);

const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
  useHvData<AssetEvent, string>(
    {
      columns,
      data,
      defaultColumn,
    },
    useBlockLayout,
    useHvResizeColumns
  );

return (
  <HvTableContainer>
    <HvTable {...getTableProps()}>
      <HvTableHead>
        {headerGroups.map((headerGroup) => (
          <HvTableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((col) => (
              <HvTableHeader {...col.getHeaderProps({ align: col.align })}>
                {col.render("Header")}
              </HvTableHeader>
            ))}
          </HvTableRow>
        ))}
      </HvTableHead>
      <HvTableBody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);

          return (
            <HvTableRow hover {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <HvTableCell
                  {...cell.getCellProps({ align: cell.column.align })}
                >
                  {cell.render("Cell")}
                </HvTableCell>
              ))}
            </HvTableRow>
          );
        })}
      </HvTableBody>
    </HvTable>
  </HvTableContainer>
);`,
      },
    },
  },
  render: () => <ColumnResize />,
};
