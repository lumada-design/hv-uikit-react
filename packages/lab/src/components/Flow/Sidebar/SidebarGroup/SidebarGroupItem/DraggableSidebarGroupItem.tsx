import { useRef } from "react";

import { useForkRef } from "@mui/material";

import { useDraggable } from "@dnd-kit/core";

import { useUniqueId } from "@hitachivantara/uikit-react-core";

import {
  HvFlowSidebarGroupItem,
  HvFlowSidebarGroupItemProps,
} from "./SidebarGroupItem";

export interface HvFlowDraggableSidebarGroupItemProps
  extends HvFlowSidebarGroupItemProps {
  /** Item type. */
  type: string;
  /** Item data. */
  data?: unknown;
}

export const HvFlowDraggableSidebarGroupItem = ({
  id,
  label,
  type,
  data,
  ...others
}: HvFlowDraggableSidebarGroupItemProps) => {
  const itemRef = useRef<HTMLElement>(null);

  const elementId = useUniqueId(id, `hvFlowDraggableItem-${type}`);

  const { attributes, listeners, setNodeRef, isDragging, transform } =
    useDraggable({
      id: elementId,
      data: {
        hvFlow: {
          // Needed to know which item is being dragged and dropped
          type,
          // Needed for the drag overlay: otherwise the item is cut by the drawer because of overflow
          label,
          // Item position: used to position the item when dropped
          x: itemRef.current?.getBoundingClientRect().x,
          y: itemRef.current?.getBoundingClientRect().y,
          // Data
          data,
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
