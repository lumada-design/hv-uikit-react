import { clsx } from "clsx";
import { useState } from "react";
import { useDroppable, useDndMonitor } from "@dnd-kit/core";

import classes from "./styles";

interface DroppableProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

export const Droppable = ({ id, className, children }: DroppableProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  useDndMonitor({
    onDragStart() {
      setIsDragging(true);
    },
    onDragEnd() {
      setIsDragging(false);
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={clsx(
        {
          [classes.over]: isOver,
          [classes.dragging]: isDragging,
        },
        className
      )}
    >
      {children}
    </div>
  );
};
