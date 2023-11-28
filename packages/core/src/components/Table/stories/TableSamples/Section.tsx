import { useState, useCallback, useMemo } from "react";
import range from "lodash/range";
import {
  HvTableContainer,
  HvTable,
  HvTableBody,
  HvTableHead,
  HvTableHeader,
  HvTableRow,
  HvTableCell,
  HvPagination,
  HvTypography,
  HvBulkActions,
  HvActionsGeneric,
  HvSection,
  useHvPagination,
  useHvRowSelection,
  useHvBulkActions,
  useHvData,
  theme,
  tableContainerClasses,
  tableCellClasses,
  tableHeaderClasses,
} from "@hitachivantara/uikit-react-core";
import {
  Delete,
  Duplicate,
  Lock,
  Preview,
} from "@hitachivantara/uikit-react-icons";

import { css } from "@emotion/css";

import { AssetEvent, getColumns, makeData } from "../storiesUtils";

const classes = {
  section: css({
    padding: 0,
  }),
  sectionHeader: css({
    padding: theme.spacing("xs", "xs", "xs", "sm"),
    borderBottom: `1px solid ${theme.colors.atmo3}`,
  }),
  sectionActions: css({
    right: theme.space.sm,
  }),
  pagination: css({
    margin: 0,
    backgroundColor: theme.colors.atmo2,
    padding: theme.space.xs,
    borderRadius: `0 0 ${theme.radii.round} ${theme.radii.round}`,
  }),
  pageSizeOptions: css({
    left: theme.space.sm,
  }),
  content: css({
    marginTop: 0,
    [`& .${tableContainerClasses.root}`]: {
      paddingBottom: 0,
    },
    [`& .${tableHeaderClasses.head}`]: {
      backgroundColor: theme.colors.atmo2,
      borderBottomColor: theme.colors.atmo3,
      [`&.${tableHeaderClasses.variantCheckbox}`]: {
        borderRight: "none",
      },
    },
    [`& .${tableCellClasses.root}`]: {
      borderBottomColor: theme.colors.atmo3,
    },
    [`& .${tableCellClasses.variantCheckbox}`]: {
      borderRight: "none",
    },
  }),
  bulkActions: css({
    marginBottom: 0,
    border: "none",
    borderBottom: `1px solid ${theme.colors.atmo3}`,
    padding: theme.spacing("xs", "sm"),
  }),
};

const EmptyRow = () => (
  <HvTableRow>
    <HvTableCell colSpan={100} />
  </HvTableRow>
);

export const Section = () => {
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
    getHvPaginationProps,
    getHvBulkActionsProps,
    state: { pageSize },
  } = useHvData<AssetEvent, string>(
    { columns, data },
    useHvPagination,
    useHvRowSelection,
    useHvBulkActions
  );

  const actions = useMemo(
    () => (
      <HvActionsGeneric
        actions={[
          { id: "action1", label: "Action 1" },
          {
            id: "action2",
            label: "Action 2",
          },
          {
            id: "action3",
            label: "Action 3",
          },
        ]}
        actionsCallback={(_, __, action) => {
          console.log(action.label);
        }}
        maxVisibleActions={1}
      />
    ),
    []
  );

  const handleAction = useCallback(
    (evt, id, action) => {
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

  const renderTableRow = (i: number) => {
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
  };

  return (
    <HvSection
      title={<HvTypography variant="title3">Sample Table</HvTypography>}
      actions={actions}
      classes={{
        root: classes.section,
        header: classes.sectionHeader,
        actions: classes.sectionActions,
        content: classes.content,
      }}
    >
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
        classes={{
          root: classes.bulkActions,
        }}
      />
      <HvTableContainer tabIndex={0}>
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
            {pageSize && range(pageSize).map(renderTableRow)}
          </HvTableBody>
        </HvTable>
      </HvTableContainer>
      {page?.length ? (
        <HvPagination
          classes={{
            root: classes.pagination,
            pageSizeOptions: classes.pageSizeOptions,
          }}
          {...getHvPaginationProps?.()}
        />
      ) : undefined}
    </HvSection>
  );
};
