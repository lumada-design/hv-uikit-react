import { useForkRef } from "@mui/material";

import { useRef } from "react";

import { useDraggable } from "@dnd-kit/core";

import {
  HvFlowSidebarGroupItem,
  HvFlowSidebarGroupItemProps,
} from "./SidebarGroupItem";

export interface HvFlowDraggableSidebarGroupItemProps
  extends HvFlowSidebarGroupItemProps {
  /** Item id: the item type. */
  id: string;
}

export const HvFlowDraggableSidebarGroupItem = ({
  label,
  id,
  ...others
}: HvFlowDraggableSidebarGroupItemProps) => {
  const itemRef = useRef<HTMLElement>(null);

  const { attributes, listeners, setNodeRef, isDragging, transform } =
    useDraggable({
      id,
      data: {
        hvFlow: {
          // Needed for the drag overlay: otherwise the item is cut by the drawer because of overflow
          label,
          // Item position: used to position the item when dropped
          x: itemRef.current?.getBoundingClientRect().x,
          y: itemRef.current?.getBoundingClientRect().y,
        },
      },
    });

  const forkedRef = useForkRef(itemRef, setNodeRef);

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <HvFlowSidebarGroupItem
      ref={forkedRef}
      style={style}
      label={label}
      isDragging={isDragging}
      {...listeners}
      {...attributes}
      {...others}
    />
  );
};
