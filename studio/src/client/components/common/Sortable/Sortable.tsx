import { useSortable } from "@dnd-kit/sortable";
import { CSS, Transform } from "@dnd-kit/utilities";

export interface SortableProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  className?: string;
  children: React.ReactNode;
}

function customTransform(transform: Transform | null) {
  if (!transform) {
    return null;
  }

  // prevent scaling above 1
  return {
    ...transform,
    scaleX: Math.min(transform.scaleX, 1),
    scaleY: Math.min(transform.scaleY, 1),
  };
}

export const Sortable = ({
  id,
  className,
  children,
  ...rest
}: SortableProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Translate.toString(customTransform(transform)) || "",
    transition: transition ?? "",
  };

  return (
    <div
      ref={setNodeRef}
      className={className}
      style={style}
      {...listeners}
      {...attributes}
      {...rest}
    >
      {children}
    </div>
  );
};
