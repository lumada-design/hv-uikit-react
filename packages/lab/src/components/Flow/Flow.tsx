import { useState } from "react";

import {
  DndContext,
  DndContextProps,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

import { ReactFlowProvider } from "reactflow";

import {
  HvFlowDefaultActions,
  HvFlowNodeGroups,
  HvFlowNodeTypes,
} from "./types";
import { HvFlowProvider } from "./FlowContext";
import { HvDroppableFlow, HvDroppableFlowProps } from "./DroppableFlow";
import { HvFlowSidebarGroupItem } from "./Sidebar/SidebarGroup/SidebarGroupItem";

export interface HvFlowProps<
  NodeData = any,
  NodeType extends string | undefined = string | undefined,
  NodeGroups extends keyof any = string
> extends HvDroppableFlowProps<NodeData, NodeType> {
  /** Flow nodes groups. */
  nodeGroups?: HvFlowNodeGroups<NodeGroups>;
  /** Flow nodes types. */
  nodeTypes?: HvFlowNodeTypes<NodeGroups>;
  /** Flow sidebar. */
  sidebar?: React.ReactNode;
  /** Flow default actions. */
  defaultActions?: HvFlowDefaultActions[];
  /**
   * Dnd Kit context props. This should be used for accessibility purposes.
   *
   * More information can be found on the [Dnd Kit documentation](https://docs.dndkit.com/guides/accessibility)
   */
  dndContextProps?: Pick<DndContextProps, "accessibility">;
}

/**
 * Flow component to build interactive node-based UIs.
 *
 * This implementation leverages [React Flow](https://reactflow.dev).
 * The drag and drop functionality leverages [Dnd Kit](https://docs.dndkit.com)
 *
 * DISCLAIMER: This component is a work in progress and there might be breaking changes.
 */
export const HvFlow = ({
  nodeTypes,
  nodeGroups,
  sidebar,
  defaultActions,
  dndContextProps,
  ...others
}: HvFlowProps) => {
  const [draggingLabel, setDraggingLabel] = useState(undefined);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragStart: DndContextProps["onDragStart"] = (event) => {
    if (event.active.data.current?.hvFlow) {
      setDraggingLabel(event.active.data.current.hvFlow?.label);
    }
  };

  const handleDragEnd: DndContextProps["onDragEnd"] = () => {
    setDraggingLabel(undefined);
  };

  // We're wrapping the main Flow component with the ReactFlowProvider to access the react flow instance.
  // HvFlowContext is our custom internal context.
  return (
    <ReactFlowProvider>
      <HvFlowProvider
        nodeGroups={nodeGroups}
        nodeTypes={nodeTypes}
        defaultActions={defaultActions}
      >
        <DndContext
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          sensors={sensors}
          modifiers={[restrictToWindowEdges]}
          {...dndContextProps}
        >
          <HvDroppableFlow {...others} />
          {sidebar}
          <DragOverlay modifiers={[restrictToWindowEdges]}>
            {draggingLabel ? (
              <HvFlowSidebarGroupItem label={draggingLabel} isDragging />
            ) : null}
          </DragOverlay>
        </DndContext>
      </HvFlowProvider>
    </ReactFlowProvider>
  );
};
