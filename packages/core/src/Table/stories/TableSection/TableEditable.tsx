import { FormEvent, Fragment, useCallback, useMemo, useState } from "react";
import { css, keyframes } from "@emotion/css";
import {
  HvButton,
  HvInput,
  HvOverflowTooltip,
  HvPagination,
  HvRowInstance,
  HvSnackbarProvider,
  HvTable,
  HvTableBody,
  HvTableCell,
  HvTableColumnConfig,
  HvTableContainer,
  HvTableHead,
  HvTableHeader,
  HvTableRow,
  HvTableSection,
  HvTableState,
  HvTypography,
  snackbarContentClasses,
  theme,
  useHvData,
  useHvPagination,
  useHvSnackbar,
} from "@hitachivantara/uikit-react-core";
import { Add, Delete, Edit } from "@hitachivantara/uikit-react-icons";

import { AssetEvent, getEditableColumns, useServerData } from "../storiesUtils";
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
    overflow: "hidden",
  }),
  snackbar: css({
    "&&": {
      position: "absolute",
      width: "100%",
      maxWidth: "100%",
      top: 0,
      "& > div": {
        width: "100%",
        "& .SnackbarItem-message": {
          width: "100%",
          padding: 0,
          "& .SnackbarContent-root": {
            width: "100%",
            [`& .${snackbarContentClasses.root}`]: {
              width: "100%",
              borderRadius: 0,
            },
          },
        },
      },
    },
  }),
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

const EmptyRow = () => (
  <HvTableRow>
    <HvTableCell colSpan={100} />
  </HvTableRow>
);

interface Data {
  [key: string]: string | number | boolean | null;
  id: string;
}

interface TableProps<T extends Data> {
  addRow?: boolean;
  data?: T[];
  onUpdate?: (tableParams: HvTableState<T>) => void;
  loading?: boolean;
  pageCount: number;
  columns: HvTableColumnConfig<T, string>[];
  totalRecords?: number;
  onRowRestore?: (id: string) => Promise<void>;
  onRowDelete?: (id: string) => Promise<void>;
  onRowAdd?: (row: Partial<T>) => Promise<void>;
  onRowUpdate?: (row: T) => Promise<void>;
  onExitAddRow?: () => void;
}

const Table = <T extends Data>({
  addRow,
  data,
  loading,
  pageCount,
  columns: columnsProp,
  totalRecords,
  onUpdate,
  onRowRestore,
  onRowDelete,
  onRowAdd,
  onRowUpdate,
  onExitAddRow,
}: TableProps<T>) => {
  const { enqueueSnackbar, closeSnackbar } = useHvSnackbar();

  const [newRowDirty, setNewRowDirty] = useState<boolean>(false);
  const [editRows, setEditRows] = useState<{ id: string; dirty: boolean }[]>(
    []
  );

  const handleUndoDelete = useCallback(
    async (row: HvRowInstance<T>) => {
      try {
        await onRowRestore?.(row.original.id);
      } catch (err) {
        enqueueSnackbar("Could not undo delete", {
          variant: "error",
        });
      }
    },
    [enqueueSnackbar, onRowRestore]
  );

  const handleDelete = useCallback(
    async (row: HvRowInstance<T>) => {
      try {
        await onRowDelete?.(row.original.id);
        enqueueSnackbar("Row deleted successfully", {
          variant: "success",
          snackbarContentProps: {
            action: (
              <div className={classes.snackbarActions}>
                <HvButton
                  variant="secondaryGhost"
                  onClick={() => {
                    handleUndoDelete(row);
                    setEditRows((prev) =>
                      prev.filter((r) => r.id !== row.original.id)
                    );
                    closeSnackbar();
                  }}
                >
                  Undo
                </HvButton>
                <HvButton
                  variant="secondaryGhost"
                  onClick={() => closeSnackbar()}
                >
                  Close
                </HvButton>
              </div>
            ),
          },
        });
      } catch (err) {
        enqueueSnackbar("Could not delete row.", {
          variant: "error",
        });
      }
    },
    [closeSnackbar, enqueueSnackbar, handleUndoDelete, onRowDelete]
  );

  const handleRequestDelete = useCallback(
    (row: HvRowInstance<T>) =>
      enqueueSnackbar("Are you sure you want to delete this row?", {
        variant: "warning",
        snackbarContentProps: {
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
                onClick={() => closeSnackbar()}
              >
                Close
              </HvButton>
            </div>
          ),
        },
      }),
    [closeSnackbar, enqueueSnackbar, handleDelete]
  );

  const columns: HvTableColumnConfig<T, string>[] = useMemo(
    () => [
      ...columnsProp,
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
                { id: row.original.id, dirty: false },
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
            onClick={() => handleRequestDelete(row)}
          >
            <Delete />
          </HvButton>
        ),
      },
    ],
    [columnsProp, handleRequestDelete]
  );

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    getHvPaginationProps,
    state: { pageSize },
  } = useHvData<T, string>(
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
            onUpdate?.(newState);
            break;
          default:
            break;
        }
        return newState;
      },
      defaultColumn: { Cell: ({ value }) => value || "-" },
    },
    useHvPagination
  );

  const handleCancelAddRow = () => {
    if (!newRowDirty) {
      onExitAddRow?.();
      return;
    }
    enqueueSnackbar("Are you sure you want to discard the changes?", {
      variant: "warning",
      snackbarContentProps: {
        action: (
          <div className={classes.snackbarActions}>
            <HvButton
              variant="secondaryGhost"
              onClick={() => {
                onExitAddRow?.();
                setNewRowDirty(false);
                closeSnackbar();
              }}
            >
              Discard
            </HvButton>
            <HvButton variant="secondaryGhost" onClick={() => closeSnackbar()}>
              Close
            </HvButton>
          </div>
        ),
      },
    });
  };

  const handleAddRow: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    try {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const asset = Object.fromEntries(formData.entries());
      await onRowAdd?.(asset as Partial<T>);
      enqueueSnackbar("New row added successfully.", {
        variant: "success",
        snackbarContentProps: {
          action: (
            <HvButton variant="secondaryGhost" onClick={() => closeSnackbar()}>
              Close
            </HvButton>
          ),
        },
      });
    } catch (err) {
      enqueueSnackbar("Could not add row.", {
        variant: "error",
      });
    } finally {
      onExitAddRow?.();
      setNewRowDirty(false);
    }
  };

  const handleCancelEditRow = (id: string) => {
    const editedRow = editRows.find((r) => r.id === id);
    if (!editedRow?.dirty) {
      setEditRows((prev) => prev.filter((row) => row.id !== id));
      return;
    }
    enqueueSnackbar("Are you sure you want to discard the changes?", {
      variant: "warning",
      snackbarContentProps: {
        action: (
          <div className={classes.snackbarActions}>
            <HvButton
              variant="secondaryGhost"
              onClick={() => {
                setEditRows((prev) => prev.filter((row) => row.id !== id));
                closeSnackbar();
              }}
            >
              Discard
            </HvButton>
            <HvButton variant="secondaryGhost" onClick={() => closeSnackbar()}>
              Close
            </HvButton>
          </div>
        ),
      },
    });
  };

  const handleEditRow = async (
    event: FormEvent<HTMLFormElement>,
    id: string
  ) => {
    try {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const asset = Object.fromEntries(formData.entries());
      await onRowUpdate?.({ id, ...asset } as T);
      enqueueSnackbar("Row updated successfully.", {
        variant: "success",
        snackbarContentProps: {
          action: (
            <HvButton variant="secondaryGhost" onClick={() => closeSnackbar()}>
              Close
            </HvButton>
          ),
        },
      });
    } catch (err) {
      enqueueSnackbar("Could not update row.", {
        variant: "error",
      });
    } finally {
      setEditRows((prev) => prev.filter((row) => row.id !== id));
    }
  };

  const renderEditableRow = (row?: HvRowInstance<T, string>) => {
    const cols = columns.filter((col) => col.variant !== "actions");
    const edit = !!row;
    const formId = edit ? `edit-row-${row.original.id}` : "add-row";

    return (
      <Fragment key={`editable_row_group_${row?.original.id}`}>
        <HvTableRow
          className={classes.tableRowEditable}
          {...row?.getRowProps()}
        >
          {cols.map((col, idx) => {
            const last = cols.length - 1 === idx;

            return (
              <HvTableCell
                className={classes.tableCellEditable}
                key={`editable_row_cell-${col.accessor as string}`}
                colSpan={last ? 3 : 1}
                {...row?.cells[idx].getCellProps()}
              >
                <div className={edit ? undefined : classes.slide}>
                  <div className={classes.tableCellContent}>
                    <HvInput
                      inputProps={{
                        form: formId,
                      }}
                      className={classes.inputRoot}
                      name={String(col.accessor)}
                      defaultValue={
                        edit
                          ? row.original[String(col.accessor)]?.toString()
                          : undefined
                      }
                      placeholder={col.Header}
                      onChange={() => {
                        if (
                          edit &&
                          !editRows.find((r) => r.id === row.original.id)?.dirty
                        ) {
                          setEditRows((prev) =>
                            prev.map((r) =>
                              r.id === row.original.id
                                ? {
                                    ...r,
                                    dirty: true,
                                  }
                                : r
                            )
                          );
                          return;
                        }

                        if (!newRowDirty) {
                          setNewRowDirty(true);
                        }
                      }}
                    />
                    {last && (
                      <HvButton
                        icon
                        aria-label="Delete"
                        variant="secondaryGhost"
                        onClick={
                          edit
                            ? () => handleRequestDelete(row)
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
        <HvTableRow className={classes.tableRowEditable}>
          <HvTableCell
            colSpan={columns.length}
            className={classes.tableCellEditable}
          >
            <div className={edit ? undefined : classes.slide}>
              <div className={classes.editableActions}>
                <form
                  id={formId}
                  onSubmit={
                    edit
                      ? (event) => handleEditRow(event, row.original.id)
                      : handleAddRow
                  }
                >
                  <HvButton variant="primaryGhost" type="submit">
                    Save
                  </HvButton>
                </form>
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

    return editRows.find((r) => r.id === row.original.id) ? (
      renderEditableRow(row)
    ) : (
      <HvTableRow {...row.getRowProps()}>
        {row.cells.map((cell) => (
          <HvTableCell {...cell.getCellProps()}>
            <HvOverflowTooltip data={cell.render("Cell")} />
          </HvTableCell>
        ))}
      </HvTableRow>
    );
  };

  return (
    <>
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
              {addRow && renderEditableRow()}
              {data?.length === 0 ? (
                <EmptyRow />
              ) : (
                [...Array(pageSize ?? 0).keys()].map(renderTableRow)
              )}
            </HvTableBody>
          </HvTable>
        </HvTableContainer>
      </LoadingContainer>
      {page.length > 0 ? (
        <HvPagination
          {...getHvPaginationProps?.()}
          labels={{
            pageSizePrev: "",
            pageSizeEntryName: `of ${totalRecords}`,
          }}
        />
      ) : undefined}
    </>
  );
};

export const TableEditable = () => {
  const { data, loading, fetchData, pageCount, mutateData, totalRecords } =
    useServerData();

  const [add, setAdd] = useState(false);
  const [contentRef, setContentRef] = useState<HTMLDivElement | null>(null);

  const columns: HvTableColumnConfig<AssetEvent, string>[] = useMemo(
    () => getEditableColumns(),
    []
  );

  return (
    <HvSnackbarProvider
      container={contentRef ?? undefined}
      maxSnack={1}
      anchorOrigin={{
        horizontal: "center",
        vertical: "top",
      }}
      notistackClassesOverride={{
        containerRoot: classes.snackbar,
      }}
    >
      <HvTableSection
        classes={{ content: classes.sectionContent }}
        title={<HvTypography variant="title4">Event Registry</HvTypography>}
        actions={
          <HvButton
            startIcon={<Add />}
            variant="primaryGhost"
            onClick={() => setAdd(true)}
          >
            Add Row
          </HvButton>
        }
        contentRef={setContentRef}
      >
        <Table<AssetEvent>
          addRow={add}
          data={data}
          pageCount={pageCount}
          loading={loading}
          columns={columns}
          totalRecords={totalRecords}
          onUpdate={({ pageIndex, pageSize, sortBy }) => {
            fetchData({ pageIndex, pageSize, sortBy });
          }}
          onRowRestore={async (id) => {
            await mutateData("restore", [id]);
          }}
          onRowDelete={async (id) => {
            await mutateData("remove", [id]);
          }}
          onRowAdd={async (row) => {
            await mutateData("add", [
              { ...row, id: new Date().valueOf().toString() } as AssetEvent,
            ]);
          }}
          onRowUpdate={async (row) => {
            await mutateData("update", row);
          }}
          onExitAddRow={() => setAdd(false)}
        />
      </HvTableSection>
    </HvSnackbarProvider>
  );
};
