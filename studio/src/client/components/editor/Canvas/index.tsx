import { clsx } from "clsx";
import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { HvTypography } from "@hitachivantara/uikit-react-core";
import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import useEditorStore from "lib/store/useEditorStore";
import classes from "./styles";
import { renderers } from "../fields";

const getRenderer = (type) => {
  const isSpacer = type === "spacer";

  if (isSpacer) {
    return () => (
      <div
        className={clsx({
          [classes.spacer]: isSpacer,
        })}
      >
        spacer
      </div>
    );
  }

  return renderers[type] || (() => <div>No renderer found for {type}</div>);
};

const Field = (props) => {
  const { field, overlay, ...rest } = props;
  const { type } = field;

  const Component = getRenderer(type);

  return (
    <div
      className={clsx(classes.field, {
        [classes.overlay]: overlay,
      })}
    >
      <Component {...rest} />
    </div>
  );
};

const SortableField = (props) => {
  const { id, index, field } = props;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
      data: {
        index,
        id,
        field,
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Field field={field} />
    </div>
  );
};

export const Canvas = (props) => {
  const { fields } = props;
  const { canvas } = useEditorStore();

  const { setNodeRef } = useDroppable({
    id: "canvas-droppable",
    data: {
      parent: null,
      isContainer: true,
    },
  });

  const renderComponents = () => {
    return (
      <SortableContext
        strategy={verticalListSortingStrategy}
        items={fields.map((f: FieldProps) => f.id)}
      >
        {fields?.map((f, i) => (
          <SortableField key={f.id} id={f.id} field={f} index={i} />
        ))}
      </SortableContext>
    );
  };

  const renderEmpty = () => {
    return (
      <HvTypography variant="caption1" className={classes.empty}>
        You haven't added any components yet.
        <br />
        Drag components from the sidebar and drop here.
      </HvTypography>
    );
  };

  return (
    <section className={classes.root}>
      <div
        ref={setNodeRef}
        className={clsx(classes.canvas, {
          [classes.desktop]: canvas.mode === "desktop",
          [classes.mobile]: canvas.mode === "mobile",
        })}
      >
        {fields.length ? renderComponents() : renderEmpty()}
      </div>
    </section>
  );
};
