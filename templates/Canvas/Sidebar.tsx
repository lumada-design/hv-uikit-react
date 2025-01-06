import { useState } from "react";
import {
  DndContextProps,
  DragOverlay,
  useDndMonitor,
  useDroppable,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { useTheme, useUniqueId } from "@hitachivantara/uikit-react-core";
import {
  HvCanvasSidePanel,
  HvCanvasSidePanelProps,
} from "@hitachivantara/uikit-react-pentaho";

import { classes } from "./styles";
import { restrictToSample } from "./utils";

export const CanvasSidebar = (props: HvCanvasSidePanelProps) => {
  const { rootId } = useTheme();

  const [overlay, setOverlay] = useState<React.ReactNode>();

  const elementId = useUniqueId("canvas-panel");

  // The sidebar is droppable to distinguish between the canvas and the sidebar
  // Otherwise items dropped inside the sidebar will be added to the canvas
  const { setNodeRef } = useDroppable({ id: elementId });

  const handleDragStart: DndContextProps["onDragStart"] = (event) => {
    if (event.active.data.current?.dragOverlay) {
      setOverlay(event.active.data.current.dragOverlay?.component);
    }
  };

  const handleDragEnd: DndContextProps["onDragEnd"] = () => {
    setOverlay(undefined);
  };

  useDndMonitor({
    onDragEnd: handleDragEnd,
    onDragStart: handleDragStart,
  });

  return (
    <>
      <HvCanvasSidePanel
        id={elementId}
        ref={setNodeRef}
        className={classes.panel}
        labels={{
          open: "Click to Add Nodes & View Files",
        }}
        {...props}
      />
      {/** Shown when the dragged item leaves the sidebar to drop it in the canvas */}
      <DragOverlay
        modifiers={[
          restrictToWindowEdges,
          (args) => restrictToSample(rootId || "", args), // This modifier shouldn't be used in a real use case. It's only needed for Storybook samples.
        ]}
      >
        {overlay ?? null}
      </DragOverlay>
    </>
  );
};
