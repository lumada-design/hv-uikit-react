import { clsx } from "clsx";
import { useDroppable } from "@dnd-kit/core";
import { HvTypography } from "@hitachivantara/uikit-react-core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import useAppStore from "lib/store/useAppStore";
import useEditorStore from "lib/store/useEditorStore";
import { Sortable } from "components/common";

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

const CanvasItem = (props) => {
  const { component, overlay, ...rest } = props;
  const { type, src } = component;
  console.log('component: ', component);

  const Component = () => component.src;

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

export const Canvas = () => {
  const { components } = useAppStore();
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
        items={components.map((component: Component) => component.id)}
      >
        {components?.map((component) => (
          <Sortable key={component.id} id={component.id}>
            <CanvasItem component={component} />
          </Sortable>
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
        {components.length ? renderComponents() : renderEmpty()}
      </div>
    </section>
  );
};
