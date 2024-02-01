import { Fragment, useCallback, useMemo, useRef, useState } from "react";
import { css, keyframes } from "@emotion/css";
import {
  HvButton,
  HvInput,
  HvPagination,
  HvRowInstance,
  HvSnackbar,
  HvSnackbarProps,
  HvTable,
  HvTableBody,
  HvTableCell,
  HvTableColumnConfig,
  HvTableContainer,
  HvTableHead,
  HvTableHeader,
  HvTableRow,
  HvTableSection,
  HvTypography,
  theme,
  useHvData,
  useHvPagination,
} from "@hitachivantara/uikit-react-core";
import { Add, Delete, Edit } from "@hitachivantara/uikit-react-icons";

import {
  AssetEvent,
  EmptyRow,
  getEditableColumns,
  range,
  useServerData,
} from "../storiesUtils";
import { LoadingContainer } from "../TableSamples/LoadingContainer";

const slide = keyframes`
  0% { 
    max-height: 0;
  }
  100% { 
    max-height: 300px;
  }
`;

const classes = {
  sectionContent: css({
    position: "relative",
  }),
  snackbar: css({
    position: "absolute",
    width: "100%",
  }),
  snackbarContent: css({ width: "100%", borderRadius: 0 }),
  snackbarActions: css({
    display: "flex",
    gap: theme.space.sm,
  }),
  tableRowEditable: css({
    backgroundColor: theme.colors.primary_20,
  }),
  tableCellEditable: css({
    padding: 0,
    border: "none",
    "td&": {
      height: "auto",
    },
  }),
  tableCellContent: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.space.sm,
    height: "48px",
    padding: `calc(${theme.space.xs} - 2px) ${theme.space.xs} calc(${
      theme.space.xs
    } - 3px) ${theme.spacing(4)}`,
    borderBottom: `1px solid ${theme.colors.atmo4}`,
  }),
  editableActions: css({
    display: "flex",
    justifyContent: "flex-end",
    borderBottom: `1px solid ${theme.colors.atmo4}`,
  }),
  slide: css({
    overflow: "hidden",
    animation: `${slide} 1.5s ease-in-out`,
  }),
  inputRoot: css({
    width: "100%",
    maxWidth: "160px",
  }),
  tableRoot: css({ tableLayout: "fixed" }),
};

export const TableEditable = () => {
  const { data, loading, fetchData, pageCount, mutateData } = useServerData();

  const [add, setAdd] = useState(false);
  const [notification, setNotification] = useState<HvSnackbarProps>();
  const [newRow, setNewRow] = useState<Partial<AssetEvent>>();
  const [editRows, setEditRows] = useState<
    { row: AssetEvent; dirty: boolean }[]
  >([]);

  const contentRef = useRef<HTMLDivElement>(null);

  const handleUndoDelete = useCallback(
    async (row: HvRowInstance<AssetEvent>) => {
      try {
        await mutateData("add", [row.original]);
        setNotification(undefined);
      } catch (err) {
        setNotification({
          label: `Could not undo delete of ${row.original.name}.`,
          variant: "error",
        });
      }
    },
    [mutateData]
  );

  const handleDelete = useCallback(
    async (row: HvRowInstance<AssetEvent>) => {
      try {
        await mutateData("remove", [row.original.id]);
        setNotification({
          label: `Row ${row.original.name} deleted successfully`,
          variant: "success",
          action: (
            <div className={classes.snackbarActions}>
              <HvButton
                variant="secondaryGhost"
                onClick={() => handleUndoDelete(row)}
              >
                Undo
              </HvButton>
              <HvButton
                variant="secondaryGhost"
                onClick={() => setNotification(undefined)}
              >
                Close
              </HvButton>
            </div>
          ),
        });
      } catch (err) {
        setNotification({
          label: `Could not delete ${row.original.name}.`,
          variant: "error",
        });
      }
    },
    [handleUndoDelete, mutateData]
  );

  const columns: HvTableColumnConfig<AssetEvent, string>[] = useMemo(
    () => [
      ...getEditableColumns(),
      {
        id: "edit",
        variant: "actions",
        Cell: ({ row }) => (
          <HvButton
            icon
            aria-label="Edit row"
            onClick={() =>
              setEditRows((prev) => [
                ...prev,
                { row: row.original, dirty: false },
              ])
            }
          >
            <Edit />
          </HvButton>
        ),
      },
      {
        id: "delete",
        variant: "actions",
        Cell: ({ row }) => (
          <HvButton
            icon
            aria-label="Delete row"
            onClick={() =>
              setNotification({
                label: `Are you sure you want to delete ${row.original.name}?`,
                variant: "warning",
                action: (
                  <div className={classes.snackbarActions}>
                    <HvButton
                      variant="secondaryGhost"
                      onClick={() => handleDelete(row)}
                    >
                      Delete
                    </HvButton>
                    <HvButton
                      variant="secondaryGhost"
                      onClick={() => setNotification(undefined)}
                    >
                      Close
                    </HvButton>
                  </div>
                ),
              })
            }
          >
            <Delete />
          </HvButton>
        ),
      },
    ],
    [handleDelete]
  );

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    getHvPaginationProps,
    state: { pageSize },
  } = useHvData<AssetEvent, string>(
    {
      data,
      columns,
      manualPagination: true,
      pageCount,
      stateReducer: (newState, action) => {
        switch (action.type) {
          // Triggers a data fetch
          case "init":
          case "gotoPage":
          case "setPageSize":
            fetchData(newState);
            break;
          default:
            break;
        }
        return newState;
      },
    },
    useHvPagination
  );

  const handleCancelAddRow = () => {
    if (!newRow) {
      setAdd(false);
      return;
    }
    setNotification({
      label: "Are you sure you want to discard the changes?",
      variant: "warning",
      action: (
        <div className={classes.snackbarActions}>
          <HvButton
            variant="secondaryGhost"
            onClick={() => {
              setAdd(false);
              setNewRow(undefined);
              setNotification(undefined);
            }}
          >
            Discard
          </HvButton>
          <HvButton
            variant="secondaryGhost"
            onClick={() => setNotification(undefined)}
          >
            Close
          </HvButton>
        </div>
      ),
    });
  };

  const handleAddRow = async () => {
    if (newRow) {
      try {
        await mutateData("add", [
          { ...newRow, id: new Date().valueOf().toString() } as AssetEvent,
        ]);
        setNotification({
          label: "New row added successfully.",
          variant: "success",
          action: (
            <HvButton
              variant="secondaryGhost"
              onClick={() => setNotification(undefined)}
            >
              Close
            </HvButton>
          ),
        });
      } catch (err) {
        setNotification({
          label: "Could not add row.",
          variant: "error",
        });
      } finally {
        setAdd(false);
        setNewRow(undefined);
      }
    }
  };

  const handleCancelEditRow = (id: string) => {
    const editedRow = editRows.find((r) => r.row.id === id);
    if (!editedRow?.dirty) {
      setEditRows((prev) => prev.filter((row) => row.row.id !== id));
      return;
    }
    setNotification({
      label: "Are you sure you want to discard the changes?",
      variant: "warning",
      action: (
        <div className={classes.snackbarActions}>
          <HvButton
            variant="secondaryGhost"
            onClick={() => {
              setEditRows((prev) => prev.filter((row) => row.row.id !== id));
              setNotification(undefined);
            }}
          >
            Discard
          </HvButton>
          <HvButton
            variant="secondaryGhost"
            onClick={() => setNotification(undefined)}
          >
            Close
          </HvButton>
        </div>
      ),
    });
  };

  const handleEditRow = async (id: string) => {
    const rowToUpdate = editRows.find((r) => r.row.id === id);
    if (rowToUpdate) {
      try {
        await mutateData("update", rowToUpdate.row);
        setNotification({
          label: "Row updated successfully.",
          variant: "success",
          action: (
            <HvButton
              variant="secondaryGhost"
              onClick={() => setNotification(undefined)}
            >
              Close
            </HvButton>
          ),
        });
      } catch (err) {
        setNotification({
          label: "Could not update row.",
          variant: "error",
        });
      } finally {
        setEditRows((prev) => prev.filter((row) => row.row.id !== id));
      }
    }
  };

  const renderEditableRow = (row?: HvRowInstance<AssetEvent, string>) => {
    const cols = columns.filter((col) => col.variant !== "actions");
    const edit = !!row;

    return (
      <Fragment key={`editable_row_group_${row?.original.id}`}>
        <HvTableRow
          key="editable_row"
          role="row"
          className={classes.tableRowEditable}
          {...row?.getRowProps()}
        >
          {cols.map((col, idx) => {
            const last = cols.length - 1 === idx;

            return (
              <HvTableCell
                className={classes.tableCellEditable}
                key={`editable_row_cell-${col.accessor}`}
                role="cell"
                colSpan={last ? 3 : 1}
                {...row?.cells[idx].getCellProps()}
              >
                <div className={edit ? undefined : classes.slide}>
                  <div className={classes.tableCellContent}>
                    <HvInput
                      className={classes.inputRoot}
                      defaultValue={
                        edit ? row.original[String(col.accessor)] : undefined
                      }
                      placeholder={col.Header}
                      onChange={(event, value) => {
                        if (edit) {
                          setEditRows((prev) =>
                            prev.map((r) =>
                              r.row.id === row.original.id
                                ? {
                                    dirty: true,
                                    row: {
                                      ...r.row,
                                      [String(col.accessor)]: value,
                                    },
                                  }
                                : r
                            )
                          );
                          return;
                        }
                        setNewRow((prev) => ({
                          ...prev,
                          [String(col.accessor)]: value,
                        }));
                      }}
                    />
                    {last && (
                      <HvButton
                        icon
                        aria-label="Delete"
                        variant="secondaryGhost"
                        onClick={
                          edit
                            ? () => handleCancelEditRow(row.original.id)
                            : handleCancelAddRow
                        }
                      >
                        <Delete />
                      </HvButton>
                    )}
                  </div>
                </div>
              </HvTableCell>
            );
          })}
        </HvTableRow>
        <HvTableRow
          key={`editable_row_actions_${row?.original.id}`}
          role="row"
          className={classes.tableRowEditable}
        >
          <HvTableCell
            colSpan={columns.length}
            key={`editable_row_cell_actions_${row?.original.id}`}
            role="cell"
            className={classes.tableCellEditable}
          >
            <div className={edit ? undefined : classes.slide}>
              <div className={classes.editableActions}>
                <HvButton
                  variant="primaryGhost"
                  onClick={
                    edit ? () => handleEditRow(row.original.id) : handleAddRow
                  }
                >
                  Save
                </HvButton>
                <HvButton
                  variant="secondaryGhost"
                  onClick={
                    edit
                      ? () => handleCancelEditRow(row.original.id)
                      : handleCancelAddRow
                  }
                >
                  Cancel
                </HvButton>
              </div>
            </div>
          </HvTableCell>
        </HvTableRow>
      </Fragment>
    );
  };

  const renderTableRow = (i: number) => {
    const row = page[i];

    if (!row) return <EmptyRow key={i} />;

    prepareRow(row);

    return editRows.find((r) => r.row.id === row.original.id) ? (
      renderEditableRow(row)
    ) : (
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
    <HvTableSection
      classes={{ content: classes.sectionContent }}
      title={<HvTypography variant="title4">Event Registry</HvTypography>}
      actions={
        <HvButton
          startIcon={<Add />}
          variant="primaryGhost"
          onClick={() => setAdd(true)}
          disabled={loading}
        >
          Add Row
        </HvButton>
      }
      contentRef={contentRef}
    >
      <LoadingContainer loading={loading} label="Loading">
        <HvTableContainer>
          <HvTable {...getTableProps()} className={classes.tableRoot}>
            <HvTableHead>
              {headerGroups.map((headerGroup) => (
                <HvTableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((col) => (
                    <HvTableHeader
                      {...col.getHeaderProps()}
                      aria-hidden={col.variant === "actions" ? true : undefined}
                    >
                      {col.render("Header")}
                    </HvTableHeader>
                  ))}
                </HvTableRow>
              ))}
            </HvTableHead>
            <HvTableBody {...getTableBodyProps()}>
              {add && renderEditableRow()}
              {data?.length === 0 ? (
                <EmptyRow />
              ) : (
                range(pageSize ?? 0).map(renderTableRow)
              )}
            </HvTableBody>
          </HvTable>
        </HvTableContainer>
      </LoadingContainer>
      {page.length > 0 ? (
        <HvPagination {...getHvPaginationProps?.()} />
      ) : undefined}
      {!!notification && (
        <HvSnackbar
          open
          showIcon
          offset={0}
          anchorOrigin={{
            horizontal: "center",
            vertical: "top",
          }}
          transitionDirection="down"
          className={classes.snackbar}
          snackbarContentProps={{
            classes: {
              root: classes.snackbarContent,
            },
          }}
          container={contentRef.current}
          onClose={() => setNotification(undefined)}
          {...notification}
        />
      )}
    </HvTableSection>
  );
};
