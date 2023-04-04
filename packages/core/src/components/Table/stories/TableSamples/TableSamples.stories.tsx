import { useMemo, useState } from "react";
import { StoryObj } from "@storybook/react";
import { useFlexLayout, useBlockLayout, useAbsoluteLayout } from "react-table";
import {
  useHvData,
  useHvPagination,
  useHvRowSelection,
  useHvSortBy,
  useHvBulkActions,
  useHvResizeColumns,
} from "../../hooks";
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
  HvEmptyState,
  HvBulkActions,
  HvToggleButton,
  HvDropdown,
  HvSwitch,
  HvButton,
  HvDropDownMenu,
  HvListValue,
} from "components";
import {
  makeData,
  getColumns,
  makeSelectedData,
  SampleColumn,
  SampleDataProps,
} from "../storiesUtils";
import {
  Ban,
  Delete,
  Duplicate,
  Lock,
  Preview,
  Unlock,
} from "@hitachivantara/uikit-react-icons";

const Complete = () => {
  const colSort = useMemo(() => {
    const levels = ["minor", "average", "major", "critical"];

    return (rowA, rowB, columnId) => {
      const a = levels.indexOf(rowA.values[columnId]?.toLowerCase());
      const b = levels.indexOf(rowB.values[columnId]?.toLowerCase());

      return a === b ? 0 : a > b ? 1 : -1;
    };
  }, []);

  const columns = useMemo(() => {
    const cols: SampleColumn[] = [
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
              onClick={() => row.toggleRowLockedSelection()}
            />
          );
        },
      },
      {
        id: "secundaryActions",
        variant: "actions",
        width: 32,
        Cell: () => {
          return (
            <HvDropDownMenu
              keepOpened={false}
              placement="left"
              onClick={(e, item) => alert(item.label)}
              dataList={[
                {
                  label: "Share",
                },
                {
                  label: "Hide",
                },
                {
                  label: "Remove",
                },
              ]}
            />
          );
        },
      },
    ];

    cols[2].disableSortBy = true;
    cols[5].sortType = colSort;

    return cols;
  }, [colSort]);

  const initialData: SampleDataProps[] = useMemo(
    () =>
      makeSelectedData(64).map((entry) => ({
        ...entry,
        // make some entries empty
        status: entry.status === "Closed" ? null : entry.status,
      })),
    []
  );
  const [data, setData] = useState(initialData);

  const EmptyRow = () => (
    <HvTableRow>
      <HvTableCell colSpan={100} style={{ height: 100 }}>
        <HvEmptyState
          message="No data to display"
          icon={<Ban role="presentation" />}
        />
      </HvTableCell>
    </HvTableRow>
  );

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
  } = useHvData<SampleDataProps>(
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

  const handleAction = (evt, id, action) => {
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
        toggleAllRowsSelected(false);
        setData(data.filter((el) => !selectedIds.includes(el.id)));
        break;
      }
      case "lock":
      case "preview":
      default:
        break;
    }
  };

  const rowRenderer = (pages) => {
    return pages.map((row, index) => {
      prepareRow(row);

      return (
        <HvTableRow
          key={row.Header}
          {...row.getRowProps({
            "aria-rowindex": index,
          })}
        >
          {row.cells.map((cell) => (
            <HvTableCell key={cell.Header} {...cell.getCellProps()}>
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
        {...getHvBulkActionsProps()}
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
            caption: "Table Caption",
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
            {page.length === 0 ? <EmptyRow /> : rowRenderer(page)}
          </HvTableBody>
        </HvTable>
      </HvTableContainer>

      <HvPagination {...getHvPaginationProps()} />
    </>
  );
};

export const CompleteStory: StoryObj = {
  parameters: {
    docs: {
      source: {
        code: `
const colSort = useMemo(() => {
  const levels = ["minor", "average", "major", "critical"];

  return (rowA, rowB, columnId) => {
    const a = levels.indexOf(rowA.values[columnId]?.toLowerCase());
    const b = levels.indexOf(rowB.values[columnId]?.toLowerCase());

    return a === b ? 0 : a > b ? 1 : -1;
  };
}, []);

const columns = useMemo(() => {
  const cols = [
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
            onClick={() => row.toggleRowLockedSelection()}
          />
        );
      },
    },
    {
      id: "secundaryActions",
      variant: "actions",
      width: 32,
      Cell: () => {
        return (
          <HvDropDownMenu
            keepOpened={false}
            placement="left"
            onClick={(e, item) => alert(item.label)}
            dataList={[
              {
                label: "Share",
              },
              {
                label: "Hide",
              },
              {
                label: "Remove",
              },
            ]}
          />
        );
      },
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
      status: entry.status === "Closed" ? null : entry.status,
    })),
  []
);
const [data, setData] = useState(initialData);

const EmptyRow = () => (
  <HvTableRow>
    <HvTableCell colSpan={100} style={{ height: 100 }}>
      <HvEmptyState
        message="No data to display"
        icon={<Ban role="presentation" />}
      />
    </HvTableCell>
  </HvTableRow>
);

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
} = useHvData(
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

const handleAction = (evt, id, action) => {
  const selected = selectedFlatRows.map((el) => el.original);

  switch (action.id) {
    case "duplicate": {
      const newEls = selected.map((el) => ({
        ...el,
        id: \`\${el.id}-copy\`\,
        name: \`\${el.name}-copy\`\,
      }));
      setData([...data, ...newEls]);
      break;
    }
    case "delete": {
      const selectedIds = selected.map((el) => el.id);
      toggleAllRowsSelected(false);
      setData(data.filter((el) => !selectedIds.includes(el.id)));
      break;
    }
    case "lock":
    case "preview":
    default:
      break;
  }
};

const rowRenderer = (pages) => {
  return pages.map((row, index) => {
    prepareRow(row);

    return (
      <HvTableRow
        key={row.Header}
        {...row.getRowProps({
          "aria-rowindex": index,
        })}
      >
        {row.cells.map((cell) => (
          <HvTableCell key={cell.Header} {...cell.getCellProps()}>
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
      {...getHvBulkActionsProps()}
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
          caption: "Table Caption",
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
          {page.length === 0 ? <EmptyRow /> : rowRenderer(page)}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>

    <HvPagination {...getHvPaginationProps()} />
  </>
);`,
      },
    },
  },
  render: () => <Complete />,
};

const EmptyCells = () => {
  const columns: SampleColumn[] = getColumns();
  const data: SampleDataProps[] = makeData(6).map((entry) => ({
    ...entry,
    // make some entries empty
    status: entry.status === "Closed" ? null : entry.status,
  }));

  const { getTableProps, getTableBodyProps, prepareRow, headerGroups, rows } =
    useHvData<SampleDataProps>({
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
const columns = getColumns();
const data = makeData(6).map((entry) => ({
  ...entry,
  status: entry.status === "Closed" ? null : entry.status,
}));

const { getTableProps, getTableBodyProps, prepareRow, headerGroups, rows } =
  useHvData({
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
  const data: SampleDataProps[] = useMemo(() => makeData(64), []);

  const columns: SampleColumn[] = useMemo(
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
              onClick={() => row.toggleRowLockedSelection()}
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
  } = useHvData<SampleDataProps>(
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
        {...getHvBulkActionsProps()}
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
      {page?.length ? <HvPagination {...getHvPaginationProps()} /> : undefined}
    </>
  );
};

export const LockedSelectionStory: StoryObj = {
  parameters: {
    docs: {
      source: {
        code: `
const data = useMemo(() => makeData(64), []);

const columns = useMemo(
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
            onClick={() => row.toggleRowLockedSelection()}
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
} = useHvData(
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
      {...getHvBulkActionsProps()}
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
    {page?.length ? <HvPagination {...getHvPaginationProps()} /> : undefined}
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
        {...getHvBulkActionsProps()}
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
      {page?.length ? <HvPagination {...getHvPaginationProps()} /> : undefined}
    </>
  );
};

const AlternativeLayout = () => {
  const alternativeLayouts: HvListValue[] = useMemo(
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

  const data: SampleDataProps[] = useMemo(() => makeData(64), []);

  const columns: SampleColumn[] = useMemo(
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
            <HvButton aria-label="Delete" icon variant="secondaryGhost">
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
const alternativeLayouts = useMemo(
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

const columns = useMemo(
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
          <HvButton aria-label="Delete" icon variant="secondaryGhost">
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
      key={layoutHook}
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
            setLayoutHook(() => item?.hook)
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
  const columns: SampleColumn[] = useMemo(
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
  const data: SampleDataProps[] = useMemo(() => makeData(6), []);

  const defaultColumn = useMemo(
    () => ({
      minWidth: 150,
      width: 200,
      maxWidth: 400,
    }),
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useHvData<SampleDataProps>(
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
const columns = useMemo(
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
  useHvData(
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
