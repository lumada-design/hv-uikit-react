import { HTMLAttributes, useMemo, useState } from "react";
import {
  DndContext,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  Modifier,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { css } from "@emotion/css";
import {
  HvListContainer,
  HvListItem,
  HvTypography,
  theme,
  useTheme,
} from "@hitachivantara/uikit-react-core";
import { Drag } from "@hitachivantara/uikit-react-icons";

import { Item } from "../types";
import { sampleItems } from "./sampleData";
import classes from "./styles";

// #region Fixes a problem we have while dragging items in storybook docs mode
type RestrictToSampleModifier = Modifier extends (...args: infer A) => infer R
  ? (rootId: string, ...args: A) => R
  : unknown;

export const restrictToSample: RestrictToSampleModifier = (
  rootId,
  { transform },
) => {
  const rect = document.getElementById(rootId)?.getBoundingClientRect();

  const docsMode = window.location.search.includes("?viewMode=docs");

  return {
    ...transform,
    x: docsMode && rect?.x ? -rect.x + transform.x : transform.x,
    y: docsMode && rect?.y ? -rect.y + transform.y : transform.y,
  };
};
// #endregion

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
      classes={{ root: classes.item }}
      ref={setNodeRef}
      selectable
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

export const DndKitSingle = () => {
  const [items, setItems] = useState<Item[]>(sampleItems.filter((i) => i.id));
  const [activeItem, setActiveItem] = useState<Item | null>(null);
  const { rootId } = useTheme();

  const itemsIds = useMemo(() => items?.map((task) => task.id), [items]) || [];

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 2,
      },
    }),
    useSensor(KeyboardSensor, {
      // the `sortableKeyboardCoordinates` function moves the active draggable
      // item to the closest sortable element in a given direction
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Item") {
      setActiveItem(event.active.data.current.item);
    }
  };

  const onDragEnd = () => {
    setActiveItem(null);
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
        return arrayMove(item, activeIndex, overIndex);
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
      <div className={classes.column}>
        <div className={classes.columnHeader}>
          <HvTypography variant="title4">To Do</HvTypography>
        </div>
        <HvListContainer selectable>
          <SortableContext items={itemsIds}>
            {items &&
              items?.map((item) => <ItemCard key={item.id} item={item} />)}
          </SortableContext>
        </HvListContainer>
      </div>

      <DragOverlay
        modifiers={[
          restrictToWindowEdges,
          (args) => restrictToSample(rootId || "", args),
        ]}
      >
        {activeItem && (
          <ItemCard
            item={activeItem}
            className={css({
              border: `2px solid ${theme.colors.primary}`,
              backgroundColor: theme.colors.atmo1,
            })}
          />
        )}
      </DragOverlay>
    </DndContext>
  );
};
