import { useCallback, useEffect, useMemo, useState } from "react";
import { StoryObj } from "@storybook/react";
import {
  useFlexLayout,
  useBlockLayout,
  useAbsoluteLayout,
  SortByFn,
} from "react-table";
import range from "lodash/range";
import {
  HvTable,
  HvTableBody,
  HvTableContainer,
  HvTableHead,
  HvTableHeader,
  HvTableRow,
  HvTableCell,
  HvRowInstance,
  HvPagination,
  HvTypography,
  HvEmptyState,
  HvBulkActions,
  HvBulkActionsProps,
  HvToggleButton,
  HvDropdown,
  HvSwitch,
  HvButton,
  HvDropDownMenu,
  HvListValue,
  useHvData,
  useHvPagination,
  useHvRowSelection,
  useHvSortBy,
  useHvBulkActions,
  useHvResizeColumns,
  HvTableColumnConfig,
} from "@hitachivantara/uikit-react-core";
import {
  Ban,
  Delete,
  Duplicate,
  Lock,
  Preview,
  Unlock,
} from "@hitachivantara/uikit-react-icons";
import {
  makeData,
  getColumns,
  makeSelectedData,
  AssetEvent,
  useServerData,
} from "../storiesUtils";
import LoadingContainer from "./LoadingContainer";

const EmptyRow = ({ height }) => (
  <HvTableRow>
    <HvTableCell colSpan={100} style={{ height }}>
      <HvEmptyState message="No data to display" icon={<Ban role="none" />} />
    </HvTableCell>
  </HvTableRow>
);

const Complete = () => {
  const colSort = useCallback<SortByFn<AssetEvent>>((rowA, rowB, columnId) => {
    const levels = ["minor", "average", "major", "critical"];

    const a = levels.indexOf(rowA.values[columnId]?.toLowerCase());
    const b = levels.indexOf(rowB.values[columnId]?.toLowerCase());

    return a - b;
  }, []);

  const columns = useMemo<HvTableColumnConfig<AssetEvent, string>[]>(() => {
    const cols: HvTableColumnConfig<AssetEvent, string>[] = [
      ...getColumns(),
      {
        id: "actions",
        variant: "actions",
        Cell: ({ row }) => (
          <HvToggleButton
            aria-label="Lock"
            notSelectedIcon={<Unlock />}
            selectedIcon={<Lock />}
            selected={row.isSelectionLocked}
            onClick={() => row.toggleRowLockedSelection?.()}
          />
        ),
      },
      {
        id: "secondaryActions",
        variant: "actions",
        width: 32,
        Cell: () => (
          <HvDropDownMenu
            keepOpened={false}
            placement="left"
            onClick={(e, item) => alert(item.id)}
            dataList={[
              { id: "share", label: "Share" },
              { id: "hide", label: "Hide" },
              { id: "remove", label: "Remove" },
            ]}
          />
        ),
      },
    ];

    cols[2].disableSortBy = true;
    cols[5].sortType = colSort;

    return cols;
  }, [colSort]);

  const initialData = useMemo(
    () =>
      makeSelectedData(64).map((entry) => ({
        ...entry,
        // make some entries empty
        status: entry.status === "Closed" ? null : entry.status,
      })),
    []
  );
  const [data, setData] = useState(initialData);

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    selectedFlatRows,
    toggleAllRowsSelected,
    getHvBulkActionsProps,
    getHvPaginationProps,
  } = useHvData<AssetEvent, string>(
    {
      columns,
      data,
      autoResetSelectedRows: false,
      aditivePageBulkSelection: true,
      subtractivePageBulkDeselection: false,
      initialState: {
        selectedRowIds: { 2: true },
        lockedSelectionRowIds: { 1: true, 6: true },
      },
      defaultColumn: {
        Cell: ({ value }) => value ?? "—",
      },
    },
    useHvSortBy,
    useHvPagination,
    useHvRowSelection,
    useHvBulkActions
  );

  const handleAction: HvBulkActionsProps["actionsCallback"] = (
    evt,
    id,
    action
  ) => {
    const selected = selectedFlatRows.map((el) => el.original);

    switch (action.id) {
      case "duplicate": {
        const newEls = selected.map((el) => ({
          ...el,
          id: `${el.id}-copy`,
          name: `${el.name}-copy`,
        }));
        setData([...data, ...newEls]);
        break;
      }
      case "delete": {
        const selectedIds = selected.map((el) => el.id);
        toggleAllRowsSelected?.(false);
        setData(data.filter((el) => !selectedIds.includes(el.id)));
        break;
      }
      case "lock":
      case "preview":
      default:
        break;
    }
  };

  const rowRenderer = (pageRows: HvRowInstance<AssetEvent, string>[]) => {
    return pageRows.map((row, index) => {
      prepareRow(row);

      return (
        <HvTableRow
          {...row.getRowProps({
            "aria-rowindex": index + 1,
          })}
        >
          {row.cells.map((cell) => (
            <HvTableCell {...cell.getCellProps()}>
              {cell.render("Cell")}
            </HvTableCell>
          ))}
        </HvTableRow>
      );
    });
  };

  return (
    <>
      <HvBulkActions
        {...getHvBulkActionsProps?.()}
        maxVisibleActions={1}
        actionsCallback={handleAction}
        actions={[
          { id: "delete", label: "Delete", icon: <Delete /> },
          { id: "duplicate", label: "Duplicate", icon: <Duplicate /> },
          { id: "lock", label: "Lock", icon: <Lock /> },
          { id: "preview", label: "Preview", icon: <Preview /> },
        ]}
      />

      <HvTableContainer>
        <HvTable
          {...getTableProps({
            "aria-rowcount": data.length,
          })}
        >
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
            {page.length === 0 ? <EmptyRow height={100} /> : rowRenderer(page)}
          </HvTableBody>
        </HvTable>
      </HvTableContainer>

      <HvPagination {...getHvPaginationProps?.()} />
    </>
  );
};

export const CompleteStory: StoryObj = {
  parameters: {
    docs: {
      source: {
        code: `
const colSort = useCallback<SortByFn<AssetEvent>>((rowA, rowB, columnId) => {
  const levels = ["minor", "average", "major", "critical"];

  const a = levels.indexOf(rowA.values[columnId]?.toLowerCase());
  const b = levels.indexOf(rowB.values[columnId]?.toLowerCase());

  return a - b;
}, []);

const columns = useMemo<HvTableColumnConfig<AssetEvent, string>[]>(() => {
  const cols: HvTableColumnConfig<AssetEvent, string>[] = [
    ...getColumns(),
    {
      id: "actions",
      variant: "actions",
      Cell: ({ row }) => (
        <HvToggleButton
          aria-label="Lock"
          notSelectedIcon={<Unlock />}
          selectedIcon={<Lock />}
          selected={row.isSelectionLocked}
          onClick={() => row.toggleRowLockedSelection?.()}
        />
      ),
    },
    {
      id: "secondaryActions",
      variant: "actions",
      width: 32,
      Cell: () => (
        <HvDropDownMenu
          keepOpened={false}
          placement="left"
          onClick={(e, item) => alert(item.id)}
          dataList={[
            { id: "share", label: "Share" },
            { id: "hide", label: "Hide" },
            { id: "remove", label: "Remove" },
          ]}
        />
      ),
    },
  ];

  cols[2].disableSortBy = true;
  cols[5].sortType = colSort;

  return cols;
}, [colSort]);

const initialData = useMemo(
  () =>
    makeSelectedData(64).map((entry) => ({
      ...entry,
      // make some entries empty
      status: entry.status === "Closed" ? null : entry.status,
    })),
  []
);
const [data, setData] = useState(initialData);

const {
  getTableProps,
  getTableBodyProps,
  prepareRow,
  headerGroups,
  page,
  selectedFlatRows,
  toggleAllRowsSelected,
  getHvBulkActionsProps,
  getHvPaginationProps,
} = useHvData<AssetEvent, string>(
  {
    columns,
    data,
    autoResetSelectedRows: false,
    aditivePageBulkSelection: true,
    subtractivePageBulkDeselection: false,
    initialState: {
      selectedRowIds: { 2: true },
      lockedSelectionRowIds: { 1: true, 6: true },
    },
    defaultColumn: {
      Cell: ({ value }) => value ?? "—",
    },
  },
  useHvSortBy,
  useHvPagination,
  useHvRowSelection,
  useHvBulkActions
);

const handleAction: HvBulkActionsProps["actionsCallback"] = (
  evt,
  id,
  action
) => {
  const selected = selectedFlatRows.map((el) => el.original);

  switch (action.id) {
    case "duplicate": {
      const newEls = selected.map((el) => ({
        ...el,
        id: \`\${el.id}-copy\`,
        name: \`\${el.name}-copy\`,
      }));
      setData([...data, ...newEls]);
      break;
    }
    case "delete": {
      const selectedIds = selected.map((el) => el.id);
      toggleAllRowsSelected?.(false);
      setData(data.filter((el) => !selectedIds.includes(el.id)));
      break;
    }
    case "lock":
    case "preview":
    default:
      break;
  }
};

const rowRenderer = (pageRows: HvRowInstance<AssetEvent, string>[]) => {
  return pageRows.map((row, index) => {
    prepareRow(row);

    return (
      <HvTableRow
        {...row.getRowProps({
          "aria-rowindex": index + 1,
        })}
      >
        {row.cells.map((cell) => (
          <HvTableCell {...cell.getCellProps()}>
            {cell.render("Cell")}
          </HvTableCell>
        ))}
      </HvTableRow>
    );
  });
};

return (
  <>
    <HvBulkActions
      {...getHvBulkActionsProps?.()}
      maxVisibleActions={1}
      actionsCallback={handleAction}
      actions={[
        { id: "delete", label: "Delete", icon: <Delete /> },
        { id: "duplicate", label: "Duplicate", icon: <Duplicate /> },
        { id: "lock", label: "Lock", icon: <Lock /> },
        { id: "preview", label: "Preview", icon: <Preview /> },
      ]}
    />

    <HvTableContainer>
      <HvTable
        {...getTableProps({
          "aria-rowcount": data.length,
        })}
      >
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
          {page.length === 0 ? <EmptyRow height={100} /> : rowRenderer(page)}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>

    <HvPagination {...getHvPaginationProps?.()} />
  </>
);`,
      },
    },
  },
  render: () => <Complete />,
};

const EmptyCells = () => {
  const columns = useMemo(() => getColumns(), []);
  const data = useMemo(
    () =>
      makeData(6).map((entry) => ({
        ...entry,
        // make some entries empty
        status: entry.status === "Closed" ? null : entry.status,
      })),
    []
  );

  const { getTableProps, getTableBodyProps, prepareRow, headerGroups, rows } =
    useHvData<AssetEvent, string>({
      columns,
      data,
      defaultColumn: {
        Cell: ({ value }) => value ?? "—",
      },
    });

  return (
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
          {rows.map((row) => {
            prepareRow(row);

            return (
              <HvTableRow {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <HvTableCell {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </HvTableCell>
                  );
                })}
              </HvTableRow>
            );
          })}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
  );
};

export const EmptyCellsStory: StoryObj = {
  parameters: {
    docs: {
      source: {
        code: `
const columns = useMemo(() => getColumns(), []);
const data = useMemo(
  () =>
    makeData(6).map((entry) => ({
      ...entry,
      // make some entries empty
      status: entry.status === "Closed" ? null : entry.status,
    })),
  []
);

const { getTableProps, getTableBodyProps, prepareRow, headerGroups, rows } =
  useHvData<AssetEvent, string>({
    columns,
    data,
    defaultColumn: {
      Cell: ({ value }) => value ?? "—",
    },
  });

return (
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
        {rows.map((row) => {
          prepareRow(row);

          return (
            <HvTableRow {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <HvTableCell {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </HvTableCell>
                );
              })}
            </HvTableRow>
          );
        })}
      </HvTableBody>
    </HvTable>
  </HvTableContainer>
);
`,
      },
    },
  },
  render: () => <EmptyCells />,
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

const EmptyRowSimple = () => (
  <HvTableRow>
    <HvTableCell colSpan={100} />
  </HvTableRow>
);

const ServerSide = () => {
  const columns = useMemo(() => getColumns(), []);
  const { data = [], fetchData, loading, pageCount } = useServerData();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    state: { pageSize, pageIndex, sortBy },
    getHvPaginationProps,
  } = useHvData(
    {
      columns,
      data,
      manualPagination: true,
      manualSortBy: true,
      autoResetPage: false,
      autoResetSortBy: false,
      disableMultiSort: true,
      pageCount,
    },
    useHvSortBy,
    useHvPagination
  );

  useEffect(() => {
    gotoPage?.(0);
  }, [sortBy, gotoPage]);

  useEffect(() => {
    fetchData({ pageIndex, pageSize, sortBy });
  }, [sortBy, fetchData, pageIndex, pageSize]);

  return (
    <LoadingContainer loading={loading}>
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
          <HvTableBody
            {...getTableBodyProps({ style: { position: "relative" } })}
          >
            {range(pageSize || 0).map((i) => {
              const row = page[i];

              if (!row) return <EmptyRowSimple key={i} />;

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
      <HvPagination {...getHvPaginationProps?.()} />
    </LoadingContainer>
  );
};

export const ServerSideStory: StoryObj = {
  parameters: {
    docs: {
      source: {
        code: `
const columns = useMemo(() => getColumns(), []);
const { data = [], fetchData, loading, pageCount } = useServerData();

const {
  getTableProps,
  getTableBodyProps,
  headerGroups,
  prepareRow,
  page,
  gotoPage,
  state: { pageSize, pageIndex, sortBy },
  getHvPaginationProps,
} = useHvData(
  {
    columns,
    data,
    manualPagination: true,
    manualSortBy: true,
    autoResetPage: false,
    autoResetSortBy: false,
    disableMultiSort: true,
    pageCount,
  },
  useHvSortBy,
  useHvPagination
);

useEffect(() => {
  gotoPage?.(0);
}, [sortBy, gotoPage]);

useEffect(() => {
  fetchData({ pageIndex, pageSize, sortBy });
}, [sortBy, fetchData, pageIndex, pageSize]);

const EmptyRow = () => (
  <HvTableRow>
    <HvTableCell colSpan={100} />
  </HvTableRow>
);

return (
  <LoadingContainer loading={loading}>
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
        <HvTableBody
          {...getTableBodyProps({ style: { position: "relative" } })}
        >
          {range(pageSize || 0).map((i) => {
            const row = page[i];

            if (!row) return <EmptyRow key={i} />;

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
    <HvPagination {...getHvPaginationProps?.()} />
  </LoadingContainer>
);
`,
      },
    },
  },
  render: () => <ServerSide />,
};
