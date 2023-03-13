import { CSSProperties, Fragment, useCallback, useMemo, useState } from "react";
import range from "lodash/range";
import { Meta, StoryObj } from "@storybook/react";
import { useGroupBy } from "react-table";
import {
  useHvData,
  useHvHeaderGroups,
  useHvPagination,
  useHvRowExpand,
  useHvRowSelection,
  useHvSortBy,
  useHvTableSticky,
  useHvBulkActions,
  HvCellProps,
} from "../hooks";
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
} from "components";
import {
  makeData,
  getColumns,
  makeSelectedData,
  getGroupedRowsColumns,
  getGroupedColumns,
  SampleDataProps,
} from "./storiesUtils";
import { theme } from "@hitachivantara/uikit-styles";
import {
  Ban,
  Delete,
  Duplicate,
  Lock,
  Preview,
} from "@hitachivantara/uikit-react-icons";
import {
  StyledCode,
  StyledContainer,
  StyledLink,
  StyledUl,
} from "./StyledComponents";

const meta: Meta<typeof HvTable> = {
  title: "Guides/Table/Table Hooks",
  decorators: [(Story) => <Story />],
};

export default meta;

export const UseHvHooks: StoryObj = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  name: "useHv* Hooks",
  render: () => {
    const data = useMemo(() => makeData(6), []);

    const { getTableProps, getTableBodyProps, prepareRow, headerGroups, rows } =
      useHvData({
        data,
      });

    return (
      <>
        <StyledContainer>
          <span>
            The UI Kit library provides a collection of custom hooks that ease
            the integration with the&nbsp;
            <StyledLink
              target="_blank"
              href="https://lumada-design.github.io/uikit/master/iframe.html?viewMode=docs&id=display-table--main"
            >
              HvTable elements
            </StyledLink>
            &nbsp;and allows more advanced use cases and better data handling.
          </span>
          <span>
            Our custom hooks are built on top of&nbsp;
            <StyledLink
              target="_blank"
              href="https://react-table.tanstack.com/"
            >
              React Table
            </StyledLink>
            &nbsp;which is an "headless" UI utility library to build data tables
            while retaining control over markup and styles. It consists of a
            collection of, lightweight, composable and extensible custom React
            hooks.
          </span>
          <span style={{ ...(theme.typography.title3 as CSSProperties) }}>
            <StyledCode>useHv*</StyledCode> hooks
          </span>
          <span>
            For further ease, you can use the provided{" "}
            <StyledCode>useHvData</StyledCode> hook that wraps the&nbsp;
            <StyledLink
              target="_blank"
              href="https://react-table.tanstack.com/docs/api/useTable"
            >
              React Table's <StyledCode>useTable</StyledCode> hook
            </StyledLink>
            &nbsp;and provides the following functionality:
          </span>
          <StyledUl>
            <li>
              Ensures the use of the needed core and layout plugins when using
              any of the UI Kit custom hooks (e.g. adding{" "}
              <StyledCode>useHvPagination</StyledCode>
              implies the instalation of React Table's{" "}
              <StyledCode>usePagination</StyledCode> hook).
            </li>
            <li>
              Automatically installs the{" "}
              <StyledCode>useHvTableStyles</StyledCode> hook.
            </li>
            <li>
              Generates default column metadata from the data fields, if the
              <StyledCode>columns</StyledCode> option is missing.
            </li>
            <li>
              Defaults to an empty array if no <StyledCode>data</StyledCode> is
              provided.
            </li>
          </StyledUl>
          The following plugin hooks are available:
          <StyledUl>
            <li>
              <StyledCode>useHvTableStyles</StyledCode>: ensures the correct
              styling of the table by injecting the column's{" "}
              <StyledCode>variant</StyledCode> and{" "}
              <StyledCode>align</StyledCode> options into the
              <StyledCode>HvTableHeader</StyledCode> and{" "}
              <StyledCode>HvTableCell</StyledCode> components (via{" "}
              <StyledCode>getHeaderProps</StyledCode> and
              <StyledCode>getCellProps</StyledCode>, respectively). Also adds
              support for injecting the
              <StyledCode>styles</StyledCode>,{" "}
              <StyledCode>className</StyledCode> and{" "}
              <StyledCode>classes</StyledCode> into the{" "}
              <StyledCode>HvTable</StyledCode>,{" "}
              <StyledCode>HvTableHeader</StyledCode> and
              <StyledCode>HvTableCell</StyledCode> components.
            </li>
            <li>
              <StyledCode>useHvPagination</StyledCode>: eases the wiring of the{" "}
              <StyledCode>HvPagination</StyledCode>
              component when using pagination.{" "}
              <StyledLink href="/?path=/docs/display-table-hooks--use-hv-pagination">
                See Pagination.
              </StyledLink>
            </li>
            <li>
              <StyledCode>useHvRowSelection</StyledCode>: creates and manages
              the UI for selecting rows.{" "}
              <StyledLink href="/?path=/docs/display-table-hooks--use-hv-selection">
                See Selection.
              </StyledLink>
            </li>
            <li>
              <StyledCode>useHvBulkActions</StyledCode>: eases the wiring of the
              <StyledCode>HvBulkActions</StyledCode> component.{" "}
              <StyledLink href="/?path=/docs/display-table-hooks--use-hv-bulk-actions">
                See Bulk selection and actions.
              </StyledLink>
            </li>
            <li>
              <StyledCode>useHvSortBy</StyledCode>: manages the table's header
              sorting functionality.{" "}
              <StyledLink href="/?path=/docs/display-table-hooks--use-hv-sort-by">
                See Sorting.
              </StyledLink>
            </li>
            <li>
              <StyledCode>useHvRowExpand</StyledCode>: manages the row expanding
              functionality.{" "}
              <StyledLink href="/?path=/docs/display-table-hooks--use-hv-row-expand">
                See Row expanding.
              </StyledLink>
            </li>
            <li>
              <StyledCode>useHvGroupBy</StyledCode>: allows defining header
              groups.{" "}
              <StyledLink href="/?path=/docs/display-table-hooks--use-hv-selection">
                See Selection.
              </StyledLink>
            </li>
            <li>
              <StyledCode>useHvTableSticky</StyledCode>: allows defining sticky
              headers and columns.{" "}
              <StyledLink href="/?path=/docs/display-table-hooks--use-hv-table-sticky">
                See Sticky Headers And Columns.
              </StyledLink>
            </li>
            <li>
              <StyledCode>useHvHeaderGroups</StyledCode>: allows defining
              grouped headers.{" "}
              <StyledLink href="/?path=/docs/display-table-hooks--use-hv-header-groups">
                See Grouped Headers.
              </StyledLink>
            </li>
          </StyledUl>
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
      </>
    );
  },
};

export const UseHvPagination: StoryObj = {
  name: "useHvPagination",
  render: () => {
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
    } = useHvData({ columns, data }, useHvPagination);

    const EmptyRow = () => (
      <HvTableRow>
        <HvTableCell colSpan={100} />
      </HvTableRow>
    );

    return (
      <>
        <StyledContainer>
          Data can be paginated. Optionally, empty lines can be added to the
          last page to avoid changes in height.&nbsp;
          <StyledLink
            href="https://react-table.tanstack.com/docs/api/usePagination"
            target="_blank"
          >
            Check [React Table's <StyledCode>usePagination</StyledCode>{" "}
            documentation] for configuration details.
          </StyledLink>
          <span>
            The <StyledCode>useHvPagination</StyledCode> hook makes the{" "}
            <StyledCode>getHvPaginationProps</StyledCode>
            function available on the table instance returned that can be used
            to setup a <StyledCode>HvPagination</StyledCode> component.
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
              {range(pageSize).map((i) => {
                const row = page[i];

                if (!row) return <EmptyRow key={i} />;

                prepareRow(row);

                return (
                  <HvTableRow {...row.getRowProps()}>
                    {row.cells.map((cell: HvCellProps<SampleDataProps>) => {
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
          <HvPagination {...getHvPaginationProps()} />
        ) : undefined}
      </>
    );
  },
};

export const UseHvSelection: StoryObj = {
  name: "useHvSelection",
  render: () => {
    const columns = useMemo(() => getColumns(), []);
    const data = useMemo(() => makeData(6), []);

    const { getTableProps, getTableBodyProps, prepareRow, headerGroups, rows } =
      useHvData({ columns, data }, useHvRowSelection);

    return (
      <>
        <StyledContainer>
          <span>
            Rows can be selected individually. Check&nbsp;
            <StyledLink
              target="_blank"
              href="https://react-table.tanstack.com/docs/api/useRowSelect"
            >
              React Table's useRowSelect documentation
            </StyledLink>
            &nbsp;for configuration details.
          </span>
          <span>
            The <StyledCode>useHvRowSelecion</StyledCode> hook injects a new
            column with a <StyledCode>HvCheckBox</StyledCode> to select each
            row. It also manages the <StyledCode>HvTableRow's</StyledCode>{" "}
            <StyledCode>isSelected</StyledCode> property via the{" "}
            <StyledCode>getRowProps</StyledCode>.
          </span>
          <span>
            This hook is originally based on the code useRowSelect hook from
            react-table and implements its API, but extends it with support for
            locking the selection state of individual rows.
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
      </>
    );
  },
};

export const ControlledSelection: StoryObj = {
  name: "useHvRowSelection Controlled",
  render: () => {
    const columns = useMemo(() => getColumns(), []);
    const initialData = useMemo(() => makeSelectedData(6), []);
    const [data, setData] = useState(initialData);

    const { getTableProps, getTableBodyProps, prepareRow, headerGroups, rows } =
      useHvData(
        { columns, data, manualRowSelectedKey: "selected" },
        useHvRowSelection
      );

    return (
      <>
        <StyledContainer>
          <span>
            A selection state can also be included in the data and toggled
            externally.
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
      </>
    );
  },
};

export const UseHvBulkActions: StoryObj = {
  name: "useHvBulkActions",
  render: () => {
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
    } = useHvData(
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
            toggleAllRowsSelected(false);
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
        <StyledContainer>
          <span>
            Rows can also be selected in bulk and actions can be performed on
            the current selection.
          </span>
          <span>
            The <StyledCode>useHvBulkActions</StyledCode> hook makes the{" "}
            <StyledCode>getHvBulkActionsProps</StyledCode> function available on
            the table instance returned that can be used to setup a{" "}
            <StyledCode>HvBulkActions</StyledCode> component.
          </span>
          <span>
            <em>
              Note: This hook depends on the{" "}
              <StyledCode>useRowSelect</StyledCode> hook from{" "}
              <StyledCode>react-table</StyledCode>, but when using{" "}
              <StyledCode>useHvData</StyledCode> only{" "}
              <StyledCode>useHvBulkActions</StyledCode> needs to be installed.
            </em>
          </span>
        </StyledContainer>
        <HvBulkActions
          {...getHvBulkActionsProps()}
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
          <HvPagination {...getHvPaginationProps()} />
        ) : undefined}
      </>
    );
  },
};

export const UseHvSortBy: StoryObj = {
  name: "useHvSortBy",
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
      const cols = getColumns();
      cols[2].disableSortBy = true;
      cols[5].sortType = colSort;
      return cols;
    }, [colSort]);

    const data = useMemo(() => makeData(5), []);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
      useHvData({ columns, data }, useHvSortBy);

    return (
      <>
        <StyledContainer>
          <span>
            Tables can have the capability of sorting the data by column.
            Clicking a sortable column header toggles between ascending or
            descending. Multiple sorting criteria is enabled through holding
            shift while clicking.
          </span>
          <span>
            Check{" "}
            <StyledLink
              target="_blank"
              href="https://react-table.tanstack.com/docs/api/useSortBy"
            >
              React Table's <StyledCode>useSortBy</StyledCode> documentation
            </StyledLink>{" "}
            for configuration details.
          </span>
          <span>
            The <StyledCode>useHvSortBy</StyledCode> hook ensures that the
            proper properties are injected in the{" "}
            <StyledCode>HvTableHeader</StyledCode> (including the on click
            sorting trigger) and
            <StyledCode>HvTableCell</StyledCode> (for styling).
          </span>
          <span>
            <em>
              Note: This hook depends on the <StyledCode>useSortBy</StyledCode>{" "}
              hook from <StyledCode>react-table</StyledCode>, but when using{" "}
              <StyledCode>useHvData</StyledCode> only{" "}
              <StyledCode>useHvSortBy</StyledCode> needs to be installed.
            </em>
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
      </>
    );
  },
};

export const UseHvRowExpand: StoryObj = {
  name: "useHvRowExpand",
  render: () => {
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
      useHvData({ columns, data, labels: i18n }, useHvRowExpand);

    return (
      <>
        <StyledContainer>
          <span>
            Tables rows can have the capability of being expanded to show more
            details.
          </span>
          <span>
            Check{" "}
            <StyledLink
              target="_blank"
              href="https://react-table.tanstack.com/docs/api/useExpanded"
            >
              React Table's useExpanded documentation
            </StyledLink>{" "}
            for configuration details.
          </span>
          <span>
            The <StyledCode>useHvRowExpand</StyledCode> hook injects a{" "}
            <StyledCode>HvButton</StyledCode> into the first data column that
            toggles each row expansion. If the column has a custom renderer, an
            extra column is created instead.
          </span>
          <span>
            <em>
              Note: This hook depends on the{" "}
              <StyledCode>useExpanded</StyledCode> hook from{" "}
              <StyledCode>react-table</StyledCode>, but when using{" "}
              <StyledCode>useHvData</StyledCode> only{" "}
              <StyledCode>useHvRowExpand</StyledCode> needs to be installed.
            </em>
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

                // expandable row
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
      </>
    );
  },
};

export const UseGroupBy: StoryObj = {
  name: "useGroupBy",
  render: () => {
    const columns = useMemo(() => getGroupedRowsColumns(), []);
    const data = useMemo(() => makeData(6), []);

    const { getTableProps, getTableBodyProps, prepareRow, headerGroups, rows } =
      useHvData(
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
      <>
        <StyledContainer>
          <span>
            Tables rows can have the capability of being expanded to show more
            details.
          </span>
          <span>
            Check{" "}
            <StyledLink
              target="_blank"
              href="https://react-table.tanstack.com/docs/api/useGroupBy"
            >
              React Table's <StyledCode>useGroupBy</StyledCode> documentation
            </StyledLink>{" "}
            for configuration details.
          </span>
          <span>
            This example requires <StyledCode>useHvRowExpand</StyledCode> to
            show the grouped rows.
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
                  <Fragment key={row.id}>
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
                          ) : cell.isPlaceholder ? null : ( // For cells with repeated values, render null
                            // Otherwise, just render the regular cell
                            cell.render("Cell")
                          )}
                        </HvTableCell>
                      ))}
                    </HvTableRow>
                  </Fragment>
                );
              })}
            </HvTableBody>
          </HvTable>
        </HvTableContainer>
      </>
    );
  },
};

export const UseHvTableSticky: StoryObj = {
  name: "useHvTableSticky",
  render: () => {
    const columns = useMemo(
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
          Cell: ({ value }) => `${value}%`,
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
    } = useHvData(
      {
        columns,
        data,
        stickyHeader: true,
      },
      useHvTableSticky
    );

    return (
      <>
        <StyledContainer>
          <span>
            The table headers can be fixed at the top, allowing it to keep
            always visible when table has vertical scrolling enabled.
          </span>
          <span>
            It is also possible to stick columns, either on the left or on the
            right, making them always visible when scrolling horizontally.
          </span>

          <span>
            This is implemented using the useHvTableSticky custom React Table
            hook provided by the UI Kit library.
          </span>

          <span>
            When using sticky columns, all column widths will be fixed and a
            non-table-element layout is applied.
          </span>
          <span style={{ ...(theme.typography.title3 as CSSProperties) }}>
            Configuration
          </span>
          <span>
            The following options are supported via the main options object
            passed to <StyledCode>useTable(options)</StyledCode>:
          </span>
          <StyledUl>
            <li>
              <StyledCode>stickyHeader: Bool</StyledCode>:
              <StyledUl>
                <li>Enables the sticky header</li>
              </StyledUl>
            </li>
          </StyledUl>
          <span>
            The following options are supported on any
            <StyledCode>Column</StyledCode> object passed to the{" "}
            <StyledCode>columns</StyledCode> options in{" "}
            <StyledCode>useTable()</StyledCode>:
          </span>
          <StyledUl>
            <li>
              <StyledCode>sticky: "left" | "right"</StyledCode>
              <StyledUl>
                <li>
                  Sticks this column to the defined side. Columns will be
                  re-orderer if needed.
                </li>
              </StyledUl>
            </li>
            <li>
              <StyledCode>width: Int</StyledCode>
              <StyledUl>
                <li>Defaults to 150</li>
                <li>Specifies the width for the column</li>
              </StyledUl>
            </li>
            <li>
              <StyledCode>minWidth: Int</StyledCode>
              <StyledUl>
                <li>Defaults to 0</li>
                <li>Specifies the minimum width for the column</li>
              </StyledUl>
            </li>
          </StyledUl>
          <span style={{ ...(theme.typography.title3 as CSSProperties) }}>
            Usage
          </span>
          <span>
            The <StyledCode>getTableProps</StyledCode>,{" "}
            <StyledCode>getTableHeadProps</StyledCode>,{" "}
            <StyledCode>getHeaderGroupProps</StyledCode>,{" "}
            <StyledCode>getHeaderProps</StyledCode>,{" "}
            <StyledCode>getTableBodyProps</StyledCode>,{" "}
            <StyledCode>getRowProps</StyledCode> and{" "}
            <StyledCode>getCellProps</StyledCode> prop getters must be called
            and the properties injected into the corresponding elements.
          </span>
        </StyledContainer>
        <HvTableContainer style={{ maxHeight: 480 }}>
          <HvTable {...getTableProps()}>
            <HvTableHead {...getTableHeadProps()}>
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
      </>
    );
  },
};

export const UseHvHeaderGroups: StoryObj = {
  name: "useHvHeaderGroups",
  render: () => {
    const columns = useMemo(() => getGroupedColumns(), []);
    const data = useMemo(() => makeData(), []);

    const { getTableProps, getTableBodyProps, prepareRow, headerGroups, rows } =
      useHvData(
        {
          columns,
          data,
        },
        useHvHeaderGroups
      );

    return (
      <>
        <StyledContainer>
          <span>
            The table columns can be grouped, allowing it to have header groups.
          </span>
          <span>
            Check{" "}
            <StyledLink
              target="_blank"
              href="https://react-table.tanstack.com/docs/api/useTable#column-options"
            >
              React Table's useTable#column-options documentation
            </StyledLink>{" "}
            for configuration details.
          </span>
          <span>
            This is implemented using the{" "}
            <StyledCode>useHvHeaderGroups</StyledCode> custom React Table hook
            provided by the UI Kit library.
          </span>
          <span>
            When using grouped columns, all header group columns text will be
            centered.
          </span>
          <span style={{ ...(theme.typography.title3 as CSSProperties) }}>
            Configuration
          </span>
          <span>
            The following options are supported on any
            <StyledCode>Column</StyledCode> object passed to the{" "}
            <StyledCode>columns</StyledCode> options in{" "}
            <StyledCode>useTable()</StyledCode>:
          </span>
          <StyledUl>
            <li>
              <StyledCode>columns: Array&lt;Column&gt;</StyledCode>:
              <StyledUl>
                <li>
                  A nested array of columns. If defined, the column will act as
                  a header group. Columns can be recursively nested as much as
                  needed.
                </li>
              </StyledUl>
            </li>
          </StyledUl>
          <span style={{ ...(theme.typography.title3 as CSSProperties) }}>
            Usage
          </span>
          <span>
            The <StyledCode>getTableProps</StyledCode>,{" "}
            <StyledCode>getHeaderGroupProps</StyledCode>,{" "}
            <StyledCode>getHeaderProps</StyledCode>,{" "}
            <StyledCode>getTableBodyProps</StyledCode>,{" "}
            <StyledCode>getRowProps</StyledCode> and{" "}
            <StyledCode>getCellProps</StyledCode> prop getters must be called
            and the properties injected into the corresponding elements.
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
      </>
    );
  },
};
