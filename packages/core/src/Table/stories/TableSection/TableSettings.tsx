import { useMemo, useState } from "react";
import { css } from "@emotion/css";
import {
  HvBaseDropdown,
  HvListContainer,
  HvListItem,
  HvPanel,
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
  useHvSortBy,
  useHvTableSticky,
  useUniqueId,
} from "@hitachivantara/uikit-react-core";
import { useColumnOrder } from "react-table";
import {
  DndContext,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
  KeyboardSensor,
  Modifier,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

import {
  Drag,
  Pin,
  Preview,
  PreviewOff,
  Settings,
} from "@hitachivantara/uikit-react-icons";

import { AssetEvent, getColumns, makeData } from "../storiesUtils";

export type Group = {
  id: string;
  title: string;
  icon?: React.ReactNode;
};

export type Column = {
  id: string;
  groupId: Group["id"];
  title: string;
};

const classes = {
  groupContainer: css({
    display: "flex",
    flexDirection: "column",
    gap: 4,
    paddingBottom: theme.space.md,
  }),
  groupHeader: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(0, "xs", 0, 0),
  }),
  groupTitle: css({
    display: "flex",
    alignItems: "center",
  }),
  emptyGroup: css({
    backgroundColor: theme.colors.atmo2,
    border: `1px dashed ${theme.colors.atmo4}`,
    padding: theme.space.xs,
    display: "grid",
    placeItems: "center",
  }),
  item: css({
    backgroundColor: theme.colors.atmo1,
    border: `1px solid ${theme.colors.atmo4}`,
    padding: theme.spacing(0, 0, 0, "xs"),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "&:hover": {
      cursor: "grab",
    },
  }),
  settingsRoot: css({
    width: 32,
    height: 32,
  }),
  settingsHeader: css({
    border: "none",
    "&:hover": {
      border: "none",
    },
  }),
};

const EmptyRow = () => (
  <HvTableRow>
    <HvTableCell colSpan={100} />
  </HvTableRow>
);

const ColumnItem = ({ item }: { item: Column }) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id, data: { type: "Column", item } });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <HvListItem
      className={classes.item}
      ref={setNodeRef}
      style={{
        ...style,
        ...(isDragging && { border: `1px dashed ${theme.colors.primary}` }),
      }}
      {...attributes}
      {...listeners}
    >
      {item.title}
      <Drag />
    </HvListItem>
  );
};

const ColumnGroup = ({
  group,
  columns,
  total,
}: {
  group: Group;
  columns: Column[];
  total?: number;
}) => {
  const columnsIds =
    useMemo(() => columns?.map((col) => col.id), [columns]) || [];

  const { setNodeRef, transform, transition } = useSortable({
    id: group.id,
    data: { type: "Group", group },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div className={classes.groupContainer}>
        <div className={classes.groupHeader}>
          <div className={classes.groupTitle}>
            {group.icon}
            <HvTypography variant="title4">{group.title}</HvTypography>
          </div>
          {columns.length} / {total}
        </div>
        {columns.length === 0 && (
          <div className={classes.emptyGroup}>
            <HvTypography variant="caption1">Drag columns here</HvTypography>
          </div>
        )}
        {columns.length > 0 && (
          <HvListContainer selectable>
            <SortableContext items={columnsIds}>
              {columns &&
                columns.map((col) => <ColumnItem key={col.id} item={col} />)}
            </SortableContext>
          </HvListContainer>
        )}
      </div>
    </div>
  );
};

type RestrictToSampleModifier = Modifier extends (...args: infer A) => infer R
  ? (rootId: string, ...args: A) => R
  : unknown;

const myModifier: RestrictToSampleModifier = (rootId, { transform }) => {
  const rect = document.getElementById(rootId)?.getBoundingClientRect();
  const docsMode = window.location.search.includes("?viewMode=docs");

  if (docsMode && rect) {
    return {
      ...transform,
      x: -rect.x + transform.x,
      y: -rect.y + transform.y,
    };
  }
  return {
    ...transform,
    x: rect?.x ? -rect.x + transform.x : transform.x,
    y: rect?.y ? -rect.y + transform.y : transform.y,
  };
};

const SettingsDialog = ({
  tableColumns,
  onOrderChange,
  onColumnHide,
  setFixedColumns,
  settingsPanelId,
  hiddenColumns,
  fixedColumns,
  columnOrder,
}) => {
  const [activeGroup, setActiveGroup] = useState<Group | null>(null);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const [groups, setGroups] = useState<Group[]>([
    { id: "fixed", title: "Fixed", icon: <Pin /> },
    { id: "visible", title: "Visible", icon: <Preview /> },
    { id: "hidden", title: "Hidden", icon: <PreviewOff /> },
  ]);

  const orderedColumns = columnOrder.some((c) => c === undefined)
    ? tableColumns
    : columnOrder.map((columnId) => {
        return tableColumns.find((c) => c.accessor === columnId);
      });

  const [columns, setColumns] = useState<Column[]>(
    orderedColumns.map((c) => ({
      id: c.accessor || "",
      groupId: hiddenColumns.includes(c.accessor)
        ? "hidden"
        : fixedColumns.includes(c.accessor)
        ? "fixed"
        : "visible",
      title: c.Header || "",
    }))
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 2,
      },
    }),
    useSensor(KeyboardSensor, {})
  );

  const columnsId = useMemo(() => groups.map((col) => col.id), [groups]);

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Group") {
      setActiveGroup(event.active.data.current.column);
    }

    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.item);
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveGroup(null);
    setActiveColumn(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAGroup = active.data.current?.type === "Group";

    if (!isActiveAGroup) return;

    setGroups((cs) => {
      const activeColumnIndex = cs.findIndex((col) => col.id === activeId);
      const overColumnIndex = cs.findIndex((col) => col.id === overId);

      return arrayMove(cs, activeColumnIndex, overColumnIndex);
    });
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    const isOverAColumn = over.data.current?.type === "Column";

    if (!isActiveAColumn) return;

    // Dropping over an item
    if (isOverAColumn) {
      setColumns((cols) => {
        const activeIndex = cols.findIndex((c) => c.id === activeId);
        const overIndex = cols.findIndex((c) => c.id === overId);

        if (cols[activeIndex].groupId !== cols[overIndex].groupId) {
          cols[activeIndex].groupId = cols[overIndex].groupId;
          return arrayMove(cols, activeIndex, overIndex - 1);
        }

        const newArray = arrayMove(cols, activeIndex, overIndex);
        onOrderChange?.(newArray.map((className) => className.id));

        if (event.collisions?.some((c) => c.id === "hidden")) {
          onColumnHide?.(cols[activeIndex].id, "hide");
        } else {
          onColumnHide?.(cols[activeIndex].id, "show");
          if (event.collisions?.some((c) => c.id === "fixed")) {
            setFixedColumns?.((p) => {
              const fc = arrayMove(p, activeIndex, overIndex);
              const filteredFc = fc.filter((id) => id !== undefined);
              return filteredFc;
            });
          } else {
            setFixedColumns?.((p) => {
              const newFixed = p.filter((id) => id !== cols[activeIndex].id);
              return newFixed;
            });
          }
        }
        return newArray;
      });
    }

    const isOverAGroup = over.data.current?.type === "Group";

    // Dropping over a column
    if (isOverAGroup) {
      setColumns((cols) => {
        const activeIndex = cols.findIndex((c) => c.id === activeId);
        cols[activeIndex].groupId = overId.toString();

        if (overId.toString() === "hidden") {
          onColumnHide?.(cols[activeIndex].id, "hide");
          setFixedColumns?.((p) => {
            const newFixed = p.filter((id) => id !== cols[activeIndex].id);
            return newFixed;
          });
        } else {
          onColumnHide?.(cols[activeIndex].id, "show");
          if (overId.toString() === "fixed") {
            setFixedColumns?.((p) => {
              const uniqueIds = new Set([...p, cols[activeIndex].id]);
              return Array.from(uniqueIds);
            });
          } else {
            setFixedColumns?.((p) => {
              const newFixed = p.filter((id) => id !== cols[activeIndex].id);
              return newFixed;
            });
          }
        }
        const newArray = arrayMove(cols, activeIndex, activeIndex);
        onOrderChange?.(newArray.map((c) => c.id));
        return newArray;
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <SortableContext items={columnsId}>
        {groups.map((column) => (
          <ColumnGroup
            key={column.id}
            group={column}
            columns={columns.filter((item) => item.groupId === column.id)}
            total={columns.length}
          />
        ))}
      </SortableContext>
      <DragOverlay
        modifiers={[
          restrictToWindowEdges,
          (args) => myModifier(settingsPanelId || "", args),
        ]}
      >
        {activeGroup && (
          <ColumnGroup
            group={activeGroup}
            columns={columns.filter((item) => item.groupId === activeGroup.id)}
          />
        )}
        {activeColumn && <ColumnItem item={activeColumn} />}
      </DragOverlay>
    </DndContext>
  );
};

export const TableSettings = () => {
  const tableColumns = useMemo(() => getColumns(), []);
  const [popperOpen, setPopperOpen] = useState(false);
  const data = useMemo(() => makeData(5), []);
  const [columnOrder, setColumnOrder] = useState(tableColumns.map((c) => c.id));
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);
  const [fixedColumns, setFixedColumns] = useState<string[]>([]);
  const settingsPanelId = useUniqueId("settingsPanel");

  const updatedColumns = useMemo(() => {
    const fixed: HvTableColumnConfig<AssetEvent, string>[] = [];
    for (let i = 0; i < fixedColumns.length; i++) {
      if (fixedColumns[i]) {
        const col = tableColumns.filter((c) => c.accessor === fixedColumns[i]);
        // @ts-expect-error sticky isn't part of the column object
        fixed.push({ ...col[0], sticky: "left" });
      }
    }
    const rest = tableColumns.filter(
      (tc) => !fixedColumns.includes(tc.accessor as string)
    );
    return [...fixed, ...rest];
  }, [fixedColumns, tableColumns]);

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    state: { pageSize },
    setColumnOrder: setTableColumnOrder,
    setHiddenColumns: setTableHiddenColumns,
  } = useHvData<AssetEvent, string>(
    {
      columns: updatedColumns,
      data,
      initialState: {
        pageSize: 5,
        columnOrder: [...fixedColumns, ...columnOrder] as string[],
        hiddenColumns: hiddenColumns as string[],
      },
    },
    useHvSortBy,
    useHvPagination,
    useHvTableSticky,
    useColumnOrder
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

  const handleOrderChange = (order) => {
    setColumnOrder(order);
    setTableColumnOrder?.(order);
  };

  const handleHideColumn = (columnId: string, operation: "show" | "hide") => {
    if (operation === "hide") {
      const newHiddenColumns = new Set([...hiddenColumns, columnId]);
      const newHiddenColumnsArray = Array.from(newHiddenColumns);
      setHiddenColumns(newHiddenColumnsArray);
      setTableHiddenColumns?.(newHiddenColumnsArray);
    } else if (operation === "show") {
      const newHiddenColumns = hiddenColumns.filter((c) => c !== columnId);
      setHiddenColumns(newHiddenColumns);
      setTableHiddenColumns?.(newHiddenColumns);
    }
  };

  return (
    <HvTableSection
      title={<HvTypography variant="title4">Events</HvTypography>}
      actions={
        <HvBaseDropdown
          expanded={popperOpen}
          onToggle={() => setPopperOpen((p) => !p)}
          adornment={<Settings />}
          variableWidth
          classes={{
            header: classes.settingsHeader,
            root: classes.settingsRoot,
          }}
          aria-label="Table Settings"
        >
          <HvPanel style={{ width: "200px" }} id={settingsPanelId}>
            <SettingsDialog
              tableColumns={tableColumns}
              onOrderChange={handleOrderChange}
              onColumnHide={handleHideColumn}
              setFixedColumns={setFixedColumns}
              settingsPanelId={settingsPanelId}
              fixedColumns={fixedColumns}
              hiddenColumns={hiddenColumns}
              columnOrder={columnOrder}
            />
          </HvPanel>
        </HvBaseDropdown>
      }
    >
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
            {pageSize && [...Array(pageSize).keys()].map(renderTableRow)}
          </HvTableBody>
        </HvTable>
      </HvTableContainer>
    </HvTableSection>
  );
};
