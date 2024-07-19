import { useState } from "react";
import { cx } from "@emotion/css";
import {
  HvListContainer,
  HvListItem,
  HvListItemProps,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import { Drag } from "@hitachivantara/uikit-react-icons";

import { Item } from "../types";
import { sampleItems } from "./sampleData";
import classes from "./styles";

export const Vanilla = () => {
  const [items, setItems] = useState<Item[]>(sampleItems.filter((i) => i.id));
  const [draggedItem, setDraggedItem] = useState<Item>();
  const [dragging, setDragging] = useState(false);
  const [draggedOverIndex, setDraggedOverIndex] = useState<number | null>(null);

  const onDragStart: HvListItemProps["onDragStart"] = (event) => {
    const draggedIndex = items?.findIndex(
      (i) => i.id === (event.target as any).id,
    );
    if (draggedIndex === -1) return;
    setDragging(true);
    setDraggedItem(items[draggedIndex]);
  };

  const onDragEnd: HvListItemProps["onDragEnd"] = (event) => {
    event.preventDefault();
    setDraggedItem(undefined);
    setDragging(false);
    setDraggedOverIndex(null);
  };

  const onDragOver = (event: React.DragEvent<HTMLLIElement>, index: number) => {
    event.preventDefault();
    setDraggedOverIndex(index);
  };

  const onDragLeave = () => {
    setDraggedOverIndex(null);
  };

  const onDrop: HvListItemProps["onDrop"] = (event) => {
    event.preventDefault();

    setDraggedOverIndex(null);
    setDraggedItem(undefined);

    const draggedIndex = items?.findIndex((i) => i === draggedItem);
    const droppedIndex =
      draggedOverIndex !== null ? draggedOverIndex : items.length;

    if (draggedIndex === -1 || droppedIndex === -1) return;

    const updatedItems = [...items];

    updatedItems.splice(draggedIndex, 1);

    // The first splice mutated the array so I'll updated the droppedIndex to take that into account
    const updatedDroppedIndex =
      droppedIndex > draggedIndex ? droppedIndex - 1 : droppedIndex;

    updatedItems.splice(updatedDroppedIndex + 1, 0, draggedItem as Item);

    setItems(updatedItems);
  };

  return (
    <div>
      <div className={classes.column}>
        <div className={classes.columnHeader}>
          <HvTypography variant="title4">To Do</HvTypography>
        </div>
        <HvListContainer>
          {items?.map((item, index) => (
            <div key={item.id}>
              <HvListItem
                id={item.id}
                className={cx(classes.item, {
                  [classes.itemDragging]:
                    dragging && item.id === draggedItem?.id,
                })}
                draggable
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDragOver={(e) => onDragOver(e, index)}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
              >
                <div className={classes.itemTitle}>
                  {item.icon}
                  {item.title}
                </div>
                <div className={classes.handle}>
                  <Drag />
                </div>
              </HvListItem>
              {draggedOverIndex === index && (
                <div className={classes.placeholder} />
              )}
            </div>
          ))}
        </HvListContainer>
      </div>
    </div>
  );
};
