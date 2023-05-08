import { clsx } from "clsx";
import { useState } from "react";
import { HvTypography } from "@hitachivantara/uikit-react-core";
import {
  DndContext,
  pointerWithin,
  PointerSensor,
  useSensor,
  useSensors,
  useDndMonitor,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
  rectSwappingStrategy,
} from "@dnd-kit/sortable";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

import { Droppable } from "components/common";
import useEditorStore from "lib/store/useEditorStore";
import useAppStore from "lib/store/useAppStore";

import { CanvasItem } from "./CanvasItem";
import classes from "./styles";

export const Canvas = () => {
  const [selectedComponent, setSelectedComponent] = useState<Component | undefined>();
  const { canvas } = useEditorStore();
  const { components, setComponents, addComponent, removeComponent } =
    useAppStore();

  useDndMonitor({
    onDragStart(event) { handleDragStart(event) },
    onDragOver(event) { handleDragOver(event) },
    onDragEnd(event) { handleDragEnd(event) },
  });

  const handleDragStart = (event) => {
    const { active } = event;
    console.log('start: ', active.data.current);

    const component = components.find(c => c.id === active.id);
    // setSelectedComponent(component);
  }

  const handleDragOver = (event) => {
    const { active, over } = event;
    console.log('over: ', active.data.current, over);
  }

  const handleDragEnd = (event) => {
    const { active, over } = event;
    console.log('end: ', active.data.current);

    // const component = components.find((item) => item.id === active.id);
    // const current = component || active.data.current;

    // if (components.length && active.id !== over?.id) {
    //   const oldIndex = components.findIndex((item) => item.id === active.id);
    //   const newIndex = components.findIndex((item) => item.id === over?.id);

    //   setComponents(arrayMove(components, oldIndex, newIndex));
    // }

    // if (!component && over) {
    //   addComponent(current as Component, over.id as string);
    // }

    // setSelectedComponent(undefined);
  }

  const renderComponents = () => {
    return (
      <SortableContext items={components} strategy={rectSwappingStrategy}>
        {components.map((component) => {
          const { id, name } = component;

          return (
            <CanvasItem
              key={id}
              data={component}
              selected={selectedComponent?.id === id}
              onRemove={() => removeComponent(id)}
            />
          );
        })}
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
      <Droppable
        id="canvas"
        className={clsx(classes.canvas, {
          [classes.desktop]: canvas.mode === "desktop",
          [classes.mobile]: canvas.mode === "mobile",
        })}
      >
        {components.length ? renderComponents() : renderEmpty()}
      </Droppable>
    </section>
  );
};
