import { useDraggable } from "@dnd-kit/core";

export interface DraggableProps {
  id: string;
  data: any;
  className?: string;
  children: React.ReactNode;
}

export const Draggable = ({
  id,
  data,
  className,
  children,
}: DraggableProps) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id,
    data,
  });

  return (
    <div ref={setNodeRef} className={className} {...listeners} {...attributes}>
      {children}
    </div>
  );
};
