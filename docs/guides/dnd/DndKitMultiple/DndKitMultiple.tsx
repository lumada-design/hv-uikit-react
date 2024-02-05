import { useMemo, useState, HTMLAttributes } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  Modifier,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import {
  HvListContainer,
  HvListItem,
  HvTypography,
  theme,
  useTheme,
} from "@hitachivantara/uikit-react-core";
import { Drag } from "@hitachivantara/uikit-react-icons";

import { css } from "@emotion/css";

import { sampleColumns, sampleItems } from "./sampleData";
import { Column, Item } from "../types";
import classes from "./styles";

type RestrictToSampleModifier = Modifier extends (...args: infer A) => infer R
  ? (rootId: string, ...args: A) => R
  : unknown;

export const restrictToSample: RestrictToSampleModifier = (
  rootId,
  { transform }
) => {
  const rect = document.getElementById(rootId)?.getBoundingClientRect();

  const docsMode = window.location.search.includes("?viewMode=docs");

  return {
    ...transform,
    x: docsMode && rect?.x ? -rect.x + transform.x : transform.x,
    y: docsMode && rect?.y ? -rect.y + transform.y : transform.y,
  };
};

interface ColumnContainerProps {
  column: Column;
  items?: Item[];
}

interface ItemProps extends HTMLAttributes<HTMLLIElement> {
  item: Item;
}

export const ItemCard = ({ item, style: overlayStyle }: ItemProps) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id, data: { type: "Item", item } });

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
        ...(isDragging
          ? {
              border: `1px dashed ${theme.colors.primary}`,
              outline: "none",
              boxShadow: "none",
            }
          : { ...overlayStyle }),
      }}
      {...attributes}
      {...listeners}
    >
      <div className={classes.itemTitle}>
        {item.icon}
        {item.title}
      </div>
      <Drag />
    </HvListItem>
  );
};

export const ColumnContainer = ({ column, items }: ColumnContainerProps) => {
  const itemsIds = useMemo(() => items?.map((task) => task.id), [items]) || [];

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: column.id, data: { type: "Column", column } });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        ...(isDragging
          ? {
              ...style,
              opacity: 0.2,
              border: `1px solid ${theme.colors.secondary_80}`,
            }
          : {}),
      }}
      className={classes.column}
    >
      <div className={classes.columnHeader} {...attributes} {...listeners}>
        <HvTypography variant="title4">{column.title}</HvTypography>
      </div>
      <HvListContainer selectable>
        <SortableContext items={itemsIds}>
          {items &&
            items?.map((item) => <ItemCard key={item.id} item={item} />)}
        </SortableContext>
      </HvListContainer>
    </div>
  );
};

export const DndKitMultiple = () => {
  const [columns, setColumns] = useState<Column[]>(sampleColumns);
  const [items, setItems] = useState<Item[]>(sampleItems);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeItem, setActiveItem] = useState<Item | null>(null);
  const { rootId } = useTheme();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 2,
      },
    }),
    useSensor(KeyboardSensor, {})
  );

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
    }
    if (event.active.data.current?.type === "Item") {
      setActiveItem(event.active.data.current.item);
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveItem(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) return;

    setColumns((cs) => {
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

    const isActiveAnItem = active.data.current?.type === "Item";
    const isOverAnItem = over.data.current?.type === "Item";

    if (!isActiveAnItem) return;

    // Dropping an Item over another Item
    if (isActiveAnItem && isOverAnItem) {
      setItems((item) => {
        const activeIndex = item.findIndex((t) => t.id === activeId);
        const overIndex = item.findIndex((t) => t.id === overId);

        if (item[activeIndex].columnId !== item[overIndex].columnId) {
          item[activeIndex].columnId = item[overIndex].columnId;
          return arrayMove(item, activeIndex, overIndex - 1);
        }

        return arrayMove(item, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // Dropping a Item over a Column
    if (isActiveAnItem && isOverAColumn) {
      setItems((item) => {
        const activeIndex = item.findIndex((t) => t.id === activeId);

        item[activeIndex].columnId = overId.toString();
        return arrayMove(item, activeIndex, activeIndex);
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
      <div className={classes.columnsContainer}>
        <SortableContext items={columnsId}>
          {columns.map((column) => (
            <ColumnContainer
              key={column.id}
              column={column}
              items={items.filter((item) => item.columnId === column.id)}
            />
          ))}
        </SortableContext>
      </div>

      <DragOverlay
        modifiers={[
          restrictToWindowEdges,
          (args) => restrictToSample(rootId || "", args),
        ]}
      >
        {activeColumn && (
          <ColumnContainer
            column={activeColumn}
            items={items.filter((item) => item.columnId === activeColumn.id)}
          />
        )}
        {activeItem && (
          <ItemCard
            item={activeItem}
            className={css({ border: `2px solid ${theme.colors.primary}` })}
          />
        )}
      </DragOverlay>
    </DndContext>
  );
};
