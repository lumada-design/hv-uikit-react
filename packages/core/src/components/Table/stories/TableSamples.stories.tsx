import { useMemo, useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { useFlexLayout, useBlockLayout, useAbsoluteLayout } from "react-table";
import {
  useHvData,
  useHvPagination,
  useHvRowSelection,
  useHvSortBy,
  useHvBulkActions,
  useHvResizeColumns,
} from "../hooks/index";
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
} from "~/components";
import {
  makeData,
  getColumns,
  makeSelectedData,
  SampleColumn,
  SampleDataProps,
} from "./storiesUtils";
import {
  Ban,
  Delete,
  Duplicate,
  Lock,
  Preview,
  Unlock,
} from "@hitachivantara/uikit-react-icons";
import { StyledCode, StyledContainer, StyledUl } from "./StyledComponents";

const meta: Meta<typeof HvTable> = {
  title: "Guides/Table/Table Samples",
  decorators: [(Story) => <Story />],
};

export default meta;

export const KitchenSink: StoryObj = {
  render: () => {
    const colSort = useMemo(() => {
      const levels = ["minor", "average", "major", "critical"];

      return (rowA, rowB, columnId) => {
        const a = levels.indexOf(rowA.values[columnId]?.toLowerCase());
        const b = levels.indexOf(rowB.values[columnId]?.toLowerCase());

        // eslint-disable-next-line no-nested-ternary
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
        <StyledContainer>
          <span>
            Complete sample table that uses most of the features provided.
          </span>
        </StyledContainer>
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
  },
};

export const EmptyCells: StoryObj = {
  render: () => {
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
      <>
        <StyledContainer>
          <span>
            The absence of data within an individual cell in the table should be
            displayed as a <StyledCode>—</StyledCode> (<em>em dash</em>),
            according to Design System guidelines.
          </span>
          <span>
            This must be handled by the developer in the respective cell
            renderer, as it is an guideline and not a strict rule. Different use
            cases may require different solutions, like{" "}
            <StyledCode>N/A</StyledCode> or <StyledCode>0</StyledCode>. Empty
            cells should be avoided.
          </span>
        </StyledContainer>
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
      </>
    );
  },
};

export const LockedSelection: StoryObj = {
  render: () => {
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
        <StyledContainer>
          <span>
            Individual rows can have its selection state locked (becoming either
            not selectable or not unselectable), disabling the selection
            checkbox and also preventing the bulk actions to change the row
            state.Individual rows can have its selection state locked (becoming
            either not selectable or not unselectable), disabling the selection
            checkbox and also preventing the bulk actions to change the row
            state.Individual rows can have its selection state locked (becoming
            either not selectable or not unselectable), disabling the selection
            checkbox and also preventing the bulk actions to change the row
            state.
          </span>
        </StyledContainer>
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
        {page?.length ? (
          <HvPagination {...getHvPaginationProps()} />
        ) : undefined}
      </>
    );
  },
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

export const AlternativeLayout: StoryObj = {
  render: () => {
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
        <StyledContainer>
          <span>
            react-table provides some layout plugin hooks useful for instance
            when needing to virtualize rows and cells for performance or
            enabling user resizable tables/columns. They rely on the core column
            options <StyledCode>width</StyledCode>,{" "}
            <StyledCode>minWidth</StyledCode> and{" "}
            <StyledCode>maxWidth</StyledCode>, that are used to calculate column
            and cell widths.
          </span>
          <StyledUl>
            <li>
              <StyledCode>useBlockLayout</StyledCode> renders headers and cells
              as inline-block elements with explicit width.
            </li>
            <li>
              <StyledCode>useAbsoluteLayout</StyledCode> renders headers and
              cells as absolutely positioned elements with explicit width.
            </li>
            <li>
              <StyledCode>useFlexLayout</StyledCode> renders headers and cells
              as inline-block elements, with the <StyledCode>width</StyledCode>
              being used as the <StyledCode>flex-basis</StyledCode> and{" "}
              <StyledCode>flex-grow</StyledCode>.
            </li>
          </StyledUl>
          <span>
            Note that not all built-in styles will apply when using any of the
            alternative layouts, so additional styling might be needed to
            accomplish the same look. Also, styles affecting element's widths (
            <StyledCode>width</StyledCode>, <StyledCode>min-width</StyledCode>,{" "}
            <StyledCode>max-width</StyledCode> and flex properties) must be
            avoided and the core column options used instead.
          </span>
          <span>
            Most layouts work well with the default html table elements, keeping
            the semantics while loosing the table layout rules. Elements can be
            changed (to <StyledCode>div</StyledCode> or any other appropriate
            html element) by using the
            <StyledCode>component</StyledCode> property.
          </span>
          <span>
            <StyledCode>useGridLayout</StyledCode> implies a totally different
            dom structure and is currently not supported by the HvTable
            components.
          </span>
        </StyledContainer>
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
          <div
            style={{ display: "flex", alignItems: "center", marginLeft: 20 }}
          >
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
  },
};

export const ColumnResize: StoryObj = {
  render: () => {
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
      <>
        <StyledContainer>
          <span>
            Columns can be resized using the useHvResizeColumn hook, which
            leverages the react-table capabilities. Resize, although not an
            accessible functionality, it allows columns to be resizable via
            dragging column right border.
          </span>
        </StyledContainer>
        <HvTableContainer>
          <HvTable {...getTableProps()}>
            <HvTableHead>
              {headerGroups.map((headerGroup) => (
                <HvTableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((col) => (
                    <HvTableHeader
                      {...col.getHeaderProps({ align: col.align })}
                    >
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
      </>
    );
  },
};
