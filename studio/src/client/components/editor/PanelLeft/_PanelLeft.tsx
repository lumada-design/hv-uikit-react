import { useRef } from "react";
import { clsx } from "clsx";
import { nanoid } from "nanoid";
import { useDraggable } from "@dnd-kit/core";

import useEditor from "lib/hooks/useEditorStore";
import { fields } from "../fields";
import classes from "./styles";

export function PanelLeftField(props) {
  const { field, overlay } = props;
  const { title } = field;

  return (
    <div
      className={clsx(classes.panelLeftField, {
        [classes.overlay]: overlay,
      })}
    >
      {title}
    </div>
  );
}

function DraggableField(props) {
  const { field, ...rest } = props;

  const id = useRef(nanoid());

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: id.current,
    data: {
      field,
      fromSidebar: true,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={classes.panelLeftField}
      {...listeners}
      {...attributes}
    >
      <PanelLeftField field={field} {...rest} />
    </div>
  );
}

export function PanelLeft(props) {
  const { fieldsRegKey } = props;

  return (
    <div key={fieldsRegKey} className={classes.panelLeft}>
      {fields.map((f) => (
        <DraggableField key={f.type} field={f} />
      ))}
    </div>
  );
}
