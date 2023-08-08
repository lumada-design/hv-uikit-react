import { Fragment, useCallback, useMemo, useState } from "react";
import range from "lodash/range";
import { StoryObj } from "@storybook/react";
import { useGroupBy } from "react-table";
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
  useHvData,
  useHvHeaderGroups,
  useHvPagination,
  useHvRowExpand,
  useHvRowSelection,
  useHvSortBy,
  useHvTableSticky,
  HvTableColumnConfig,
  useHvBulkActions,
  theme,
} from "@hitachivantara/uikit-react-core";
import {
  Ban,
  Delete,
  Duplicate,
  Lock,
  Preview,
} from "@hitachivantara/uikit-react-icons";
import {
  makeData,
  getColumns,
  makeSelectedData,
  getGroupedRowsColumns,
  getGroupedColumns,
  AssetEvent,
} from "../storiesUtils";

const UseHvHooks = () => {
  const data = useMemo(() => makeData(6), []);

  const { getTableProps, getTableBodyProps, prepareRow, headerGroups, rows } =
    useHvData<AssetEvent, string>({ data });

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
  );
};

export const UseHvHooksStory: StoryObj = {
  parameters: {
    docs: {
      source: {
        code: `
const data = useMemo(() => makeData(6), []);

const { getTableProps, getTableBodyProps, prepareRow, headerGroups, rows } =
  useHvData<AssetEvent, string>({ data });

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
);
`,
      },
    },
  },
  render: () => <UseHvHooks />,
};

const EmptyRow = () => (
  <HvTableRow>
    <HvTableCell colSpan={100} />
  </HvTableRow>
);

const UseHvPagination = () => {
  const columns = useMemo(() => getColumns(), []);
  const data = useMemo(() => makeData(32), []);

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    state: { pageSize },
    getHvPaginationProps,
  } = useHvData<AssetEvent, string>({ columns, data }, useHvPagination);

  return (
    <>
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
            {pageSize &&
              range(pageSize).map((i) => {
                const row = page[i];

                if (!row) return <EmptyRow key={i} />;

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
      {page?.length ? (
        <HvPagination {...getHvPaginationProps?.()} />
      ) : undefined}
    </>
  );
};

export const UseHvPaginationStory: StoryObj = {
  parameters: {
    docs: {
      source: {
        code: `
const columns = useMemo(() => getColumns(), []);
const data = useMemo(() => makeData(32), []);

const {
  getTableProps,
  getTableBodyProps,
  prepareRow,
  headerGroups,
  page,
  state: { pageSize },
  getHvPaginationProps,
} = useHvData<AssetEvent, string>({ columns, data }, useHvPagination);

const EmptyRow = () => (
  <HvTableRow>
    <HvTableCell colSpan={100} />
  </HvTableRow>
);

return (
  <>
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
          {pageSize &&
            range(pageSize).map((i) => {
              const row = page[i];

              if (!row) return <EmptyRow key={i} />;

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
    {page?.length ? (
      <HvPagination {...getHvPaginationProps?.()} />
    ) : undefined}
  </>
);
`,
      },
    },
  },
  render: () => <UseHvPagination />,
};

const UseHvSelection = () => {
  const columns = useMemo(() => getColumns(), []);
  const data = useMemo(() => makeData(6), []);

  const { getTableProps, getTableBodyProps, prepareRow, headerGroups, rows } =
    useHvData<AssetEvent, string>({ columns, data }, useHvRowSelection);

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
  );
};

export const UseHvSelectionStory: StoryObj = {
  parameters: {
    docs: {
      source: {
        code: `
const columns = useMemo(() => getColumns(), []);
const data = useMemo(() => makeData(6), []);

const { getTableProps, getTableBodyProps, prepareRow, headerGroups, rows } =
  useHvData<AssetEvent, string>({ columns, data }, useHvRowSelection);

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
);
  `,
      },
    },
  },
  render: () => <UseHvSelection />,
};

const UseHvSelectionControlled = () => {
  const columns = useMemo(() => getColumns(), []);
  const initialData = useMemo(() => makeSelectedData(6), []);
  const [data, setData] = useState(initialData);

  const { getTableProps, getTableBodyProps, prepareRow, headerGroups, rows } =
    useHvData<AssetEvent, string>(
      { columns, data, manualRowSelectedKey: "selected" },
      useHvRowSelection
    );

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
          {rows.map((row, index) => {
            prepareRow(row);

            return (
              <HvTableRow
                onChange={(event) => {
                  const newData = [...data];
                  newData[index].selected = (
                    event.target as HTMLInputElement
                  ).checked;
                  setData(newData);
                }}
                {...row.getRowProps()}
              >
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
  );
};

export const UseHvSelectionControlledStory: StoryObj = {
  parameters: {
    docs: {
      source: {
        code: `
const columns = useMemo(() => getColumns(), []);
const initialData = useMemo(() => makeSelectedData(6), []);
const [data, setData] = useState(initialData);

const { getTableProps, getTableBodyProps, prepareRow, headerGroups, rows } =
  useHvData<AssetEvent, string>(
    { columns, data, manualRowSelectedKey: "selected" },
    useHvRowSelection
  );

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
        {rows.map((row, index) => {
          prepareRow(row);

          return (
            <HvTableRow
              onChange={(event) => {
                const newData = [...data];
                newData[index].selected = (
                  event.target as HTMLInputElement
                ).checked;
                setData(newData);
              }}
              {...row.getRowProps()}
            >
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
);
`,
      },
    },
  },
  render: () => <UseHvSelectionControlled />,
};

const UseHvBulkActions = () => {
  const columns = useMemo(() => getColumns(), []);
  const [data, setData] = useState(makeData(64));

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
    { columns, data },
    useHvPagination,
    useHvRowSelection,
    useHvBulkActions
  );

  const handleAction = useCallback(
    (_evt, id, action) => {
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
    },
    [data, selectedFlatRows, toggleAllRowsSelected]
  );

  const EmptyStateRow = useCallback(
    () => (
      <HvTableRow>
        <HvTableCell colSpan={100} style={{ height: 96 }}>
          <HvEmptyState
            message="No data to display."
            icon={<Ban role="presentation" />}
          />
        </HvTableCell>
      </HvTableRow>
    ),
    []
  );

  return (
    <>
      <HvBulkActions
        {...getHvBulkActionsProps?.()}
        maxVisibleActions={1}
        actionsCallback={handleAction}
        actions={[
          { id: "duplicate", label: "Duplicate", icon: <Duplicate /> },
          { id: "delete", label: "Delete", icon: <Delete /> },
          { id: "lock", label: "Lock", icon: <Lock /> },
          { id: "preview", label: "Preview", icon: <Preview /> },
        ]}
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
            {page?.length ? (
              page.map((row) => {
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
              })
            ) : (
              <EmptyStateRow />
            )}
          </HvTableBody>
        </HvTable>
      </HvTableContainer>
      {page?.length ? (
        <HvPagination {...getHvPaginationProps?.()} />
      ) : undefined}
    </>
  );
};

export const UseHvBulkActionsStory: StoryObj = {
  parameters: {
    docs: {
      source: {
        code: `
const columns = useMemo(() => getColumns(), []);
const [data, setData] = useState(makeData(64));

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
  { columns, data },
  useHvPagination,
  useHvRowSelection,
  useHvBulkActions
);

const handleAction = useCallback(
  (_evt, id, action) => {
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
  },
  [data, selectedFlatRows, toggleAllRowsSelected]
);

const EmptyStateRow = useCallback(
  () => (
    <HvTableRow>
      <HvTableCell colSpan={100} style={{ height: 96 }}>
        <HvEmptyState
          message="No data to display."
          icon={<Ban role="presentation" />}
        />
      </HvTableCell>
    </HvTableRow>
  ),
  []
);

return (
  <>
    <HvBulkActions
      {...getHvBulkActionsProps?.()}
      maxVisibleActions={1}
      actionsCallback={handleAction}
      actions={[
        { id: "duplicate", label: "Duplicate", icon: <Duplicate /> },
        { id: "delete", label: "Delete", icon: <Delete /> },
        { id: "lock", label: "Lock", icon: <Lock /> },
        { id: "preview", label: "Preview", icon: <Preview /> },
      ]}
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
          {page?.length ? (
            page.map((row) => {
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
            })
          ) : (
            <EmptyStateRow />
          )}
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
  render: () => <UseHvBulkActions />,
};

const UseHvSortBy = () => {
  const colSort = useMemo(() => {
    const levels = ["minor", "average", "major", "critical"];

    return (rowA, rowB, columnId) => {
      const a = levels.indexOf(rowA.values[columnId]?.toLowerCase());
      const b = levels.indexOf(rowB.values[columnId]?.toLowerCase());

      return a === b ? 0 : a > b ? 1 : -1;
    };
  }, []);

  const columns = useMemo(() => {
    const cols = getColumns();
    cols[2].disableSortBy = true;
    cols[5].sortType = colSort;
    return cols;
  }, [colSort]);

  const data = useMemo(() => makeData(5), []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useHvData<AssetEvent, string>({ columns, data }, useHvSortBy);

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
  );
};

export const UseHvSortByStory: StoryObj = {
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
  const cols = getColumns();
  cols[2].disableSortBy = true;
  cols[5].sortType = colSort;
  return cols;
}, [colSort]);

const data = useMemo(() => makeData(5), []);

const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
  useHvData<AssetEvent, string>({ columns, data }, useHvSortBy);

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
);`,
      },
    },
  },
  render: () => <UseHvSortBy />,
};

const UseHvRowExpand = () => {
  const columns = useMemo(() => getColumns(), []);
  const data = useMemo(() => makeData(6), []);
  const i18n = useMemo(
    () => ({
      expandRowButtonAriaLabel: "Click to expand this row",
      collapseRowButtonAriaLabel: "Click to collapse this row",
    }),
    []
  );

  const { getTableProps, getTableBodyProps, prepareRow, headerGroups, rows } =
    useHvData<AssetEvent, string>(
      { columns, data, labels: i18n },
      useHvRowExpand
    );

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
              <Fragment key={row.id}>
                <HvTableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <HvTableCell {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </HvTableCell>
                  ))}
                </HvTableRow>
                <HvTableRow
                  style={{
                    display: row.isExpanded ? undefined : "none",
                    background: theme.table.rowExpandBackgroundColor,
                  }}
                >
                  <HvTableCell
                    style={{
                      paddingBottom: 0,
                      paddingTop: 0,
                      textAlign: "center",
                      height: 100,
                    }}
                    colSpan={100}
                  >
                    <HvTypography>
                      Expanded content for: {row.values.name}
                    </HvTypography>
                  </HvTableCell>
                </HvTableRow>
              </Fragment>
            );
          })}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
  );
};

export const UseHvRowExpandStory: StoryObj = {
  parameters: {
    docs: {
      source: {
        code: `
const columns = useMemo(() => getColumns(), []);
const data = useMemo(() => makeData(6), []);
const i18n = useMemo(
  () => ({
    expandRowButtonAriaLabel: "Click to expand this row",
    collapseRowButtonAriaLabel: "Click to collapse this row",
  }),
  []
);

const { getTableProps, getTableBodyProps, prepareRow, headerGroups, rows } =
  useHvData<AssetEvent, string>(
    { columns, data, labels: i18n },
    useHvRowExpand
  );

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
            <Fragment key={row.id}>
              <HvTableRow {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <HvTableCell {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </HvTableCell>
                ))}
              </HvTableRow>
              <HvTableRow
                style={{
                  display: row.isExpanded ? undefined : "none",
                  background: theme.table.rowExpandBackgroundColor,
                }}
              >
                <HvTableCell
                  style={{
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: "center",
                    height: 100,
                  }}
                  colSpan={100}
                >
                  <HvTypography>
                    Expanded content for: {row.values.name}
                  </HvTypography>
                </HvTableCell>
              </HvTableRow>
            </Fragment>
          );
        })}
      </HvTableBody>
    </HvTable>
  </HvTableContainer>
);`,
      },
    },
  },
  render: () => <UseHvRowExpand />,
};

const UseHvGroupBy = () => {
  const columns = useMemo(() => getGroupedRowsColumns(), []);
  const data = useMemo(() => makeData(6), []);

  const { getTableProps, getTableBodyProps, prepareRow, headerGroups, rows } =
    useHvData<AssetEvent, string>(
      {
        columns,
        data,
        initialState: {
          groupBy: ["status"],
          expanded: {
            "status:Closed": true,
            "status:Open": true,
          },
        },
      },
      useGroupBy,
      useHvRowExpand
    );

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
              <HvTableRow
                {...row.getRowProps()}
                style={{
                  backgroundColor:
                    row.subRows.length > 0
                      ? theme.colors.atmo1
                      : theme.table.rowExpandBackgroundColor,
                }}
              >
                {row.cells.map((cell) => (
                  <HvTableCell {...cell.getCellProps()}>
                    {cell.isGrouped ? (
                      // If it's a grouped cell, add an expander and row count
                      <>
                        {cell.render("Cell")} ({row.subRows.length})
                      </>
                    ) : cell.isAggregated ? (
                      // If the cell is aggregated, use the Aggregated
                      // renderer for cell
                      cell.render("Aggregated")
                    ) : cell.isPlaceholder ? null : (
                      // For cells with repeated values, render null
                      // Otherwise, just render the regular cell
                      cell.render("Cell")
                    )}
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

export const UseHvGroupByStory: StoryObj = {
  parameters: {
    docs: {
      source: {
        code: `
const columns = useMemo(() => getGroupedRowsColumns(), []);
const data = useMemo(() => makeData(6), []);

const { getTableProps, getTableBodyProps, prepareRow, headerGroups, rows } =
  useHvData<AssetEvent, string>(
    {
      columns,
      data,
      initialState: {
        groupBy: ["status"],
        expanded: {
          "status:Closed": true,
          "status:Open": true,
        },
      },
    },
    useGroupBy,
    useHvRowExpand
  );

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
            <HvTableRow
              {...row.getRowProps()}
              style={{
                backgroundColor:
                  row.subRows.length > 0
                    ? theme.colors.atmo1
                    : theme.table.rowExpandBackgroundColor,
              }}
            >
              {row.cells.map((cell) => (
                <HvTableCell {...cell.getCellProps()}>
                  {cell.isGrouped ? (
                    <>
                      {cell.render("Cell")} ({row.subRows.length})
                    </>
                  ) : cell.isAggregated ? (
                    cell.render("Aggregated")
                  ) : cell.isPlaceholder ? null : (
                    cell.render("Cell")
                  )}
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
  render: () => <UseHvGroupBy />,
};

const UseHvTableSticky = () => {
  const columns = useMemo<HvTableColumnConfig<AssetEvent, string>[]>(
    () => [
      { Header: "Title", accessor: "name", sticky: "left", width: 120 },
      {
        Header: "Time",
        accessor: "createdDate",
        sticky: "right",
        width: 120,
      },
      { Header: "Event Type", accessor: "eventType" },
      { Header: "Status", accessor: "status", width: 70 },
      {
        Header: "Probability",
        accessor: "riskScore",
        align: "right",
        Cell: ({ value }) => <>{value}%</>,
        width: 80,
      },
      {
        Header: "Severity",
        accessor: "severity",
        sticky: "left",
        width: 100,
      },
      { Header: "Priority", accessor: "priority", width: 80 },
    ],
    []
  );
  const data = useMemo(() => makeData(100), []);

  const {
    getTableProps,
    getTableHeadProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    rows,
  } = useHvData<AssetEvent, string>(
    {
      columns,
      data,
      stickyHeader: true,
    },
    useHvTableSticky
  );

  return (
    <HvTableContainer style={{ maxHeight: 480 }}>
      <HvTable {...getTableProps()}>
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
          {rows.map((row) => {
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
  );
};

export const UseHvTableStickyStory: StoryObj = {
  parameters: {
    docs: {
      source: {
        code: `
const columns = useMemo<HvTableColumnConfig<AssetEvent, string>[]>(
  () => [
    { Header: "Title", accessor: "name", sticky: "left", width: 120 },
    {
      Header: "Time",
      accessor: "createdDate",
      sticky: "right",
      width: 120,
    },
    { Header: "Event Type", accessor: "eventType" },
    { Header: "Status", accessor: "status", width: 70 },
    {
      Header: "Probability",
      accessor: "riskScore",
      align: "right",
      Cell: ({ value }) => <>{value}%</>,
      width: 80,
    },
    {
      Header: "Severity",
      accessor: "severity",
      sticky: "left",
      width: 100,
    },
    { Header: "Priority", accessor: "priority", width: 80 },
  ],
  []
);
const data = useMemo(() => makeData(100), []);

const {
  getTableProps,
  getTableHeadProps,
  getTableBodyProps,
  prepareRow,
  headerGroups,
  rows,
} = useHvData<AssetEvent, string>(
  {
    columns,
    data,
    stickyHeader: true,
  },
  useHvTableSticky
);

return (
  <HvTableContainer style={{ maxHeight: 480 }}>
    <HvTable {...getTableProps()}>
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
        {rows.map((row) => {
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
);`,
      },
    },
  },
  render: () => <UseHvTableSticky />,
};

const UseHvHeaderGroups = () => {
  const columns = useMemo(() => getGroupedColumns(), []);
  const data = useMemo(() => makeData(), []);

  const { getTableProps, getTableBodyProps, prepareRow, headerGroups, rows } =
    useHvData<AssetEvent, string>(
      {
        columns,
        data,
      },
      useHvHeaderGroups
    );

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
  );
};

export const UseHvHeaderGroupsStory: StoryObj = {
  parameters: {
    docs: {
      source: {
        code: `
const columns = useMemo(() => getGroupedColumns(), []);
const data = useMemo(() => makeData(), []);

const { getTableProps, getTableBodyProps, prepareRow, headerGroups, rows } =
  useHvData<AssetEvent, string>(
    {
      columns,
      data,
    },
    useHvHeaderGroups
  );

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
);`,
      },
    },
  },
  render: () => <UseHvHeaderGroups />,
};
