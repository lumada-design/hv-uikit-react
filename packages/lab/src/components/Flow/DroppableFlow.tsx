import { useCallback, useState } from "react";

import ReactFlow, {
  Connection,
  EdgeChange,
  NodeChange,
  ReactFlowProps,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";

import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";

import { uid } from "uid";

import { ExtractNames, useUniqueId } from "@hitachivantara/uikit-react-core";

import { HvFlowEdge, HvFlowNode } from "./types";
import { staticClasses, useClasses } from "./Flow.styles";
import { useFlowContext } from "./FlowContext";

export { staticClasses as flowClasses };

export type HvFlowClasses = ExtractNames<typeof useClasses>;

export interface HvDroppableFlowProps<
  NodeData = any,
  NodeType extends string | undefined = string | undefined
> extends Omit<ReactFlowProps, "nodes" | "edges" | "nodeTypes"> {
  /** Flow content: background, controls, and minimap. */
  children?: React.ReactNode;
  /** Flow nodes. */
  nodes?: HvFlowNode<NodeData, NodeType>[];
  /** Flow edges. */
  edges?: HvFlowEdge[];
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvFlowClasses;
  /** Function called when the flow changes. Returns the updated nodes and edges. */
  onFlowChange?: (
    nodes: HvFlowNode<NodeData, NodeType>[],
    edges: HvFlowEdge[]
  ) => void;
}

export const HvDroppableFlow = ({
  id,
  className,
  children,
  onFlowChange,
  classes: classesProp,
  nodes: initialNodes = [],
  edges: initialEdges = [],
  onConnect: onConnectProp,
  onNodesChange: onNodesChangeProp,
  onEdgesChange: onEdgesChangeProp,
  ...others
}: HvDroppableFlowProps) => {
  const { classes, cx } = useClasses(classesProp);

  const elementId = useUniqueId(id, "hvFlow");

  const reactFlowInstance = useReactFlow();

  const { nodeTypes } = useFlowContext();

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const { setNodeRef } = useDroppable({
    id: elementId,
  });

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      if (event.over && event.over.id === elementId) {
        const type = event.active.id.toString();

        // Converts the coordinates to the react flow coordinate system
        const position = reactFlowInstance.project({
          x: (event.active.data.current?.hvFlow?.x || 0) - event.over.rect.left,
          y: (event.active.data.current?.hvFlow?.y || 0) - event.over.rect.top,
        });

        const newNode: HvFlowNode = {
          id: uid(),
          position,
          data: {},
          type,
        };

        setNodes((nds) => nds.concat(newNode));
      }
    },
    [elementId, reactFlowInstance, setNodes]
  );

  useDndMonitor({
    onDragEnd: handleDragEnd,
  });

  const handleFlowChange = useCallback(
    (
      nds: NonNullable<HvDroppableFlowProps["nodes"]>,
      eds: NonNullable<HvDroppableFlowProps["edges"]>
    ) => {
      // The new flow is returned if the user is not dragging nodes
      // This avoids triggering this handler too many times
      const isDragging = nds.find((node) => node.dragging);
      if (!isDragging) {
        onFlowChange?.(nds, eds);
      }
    },
    [onFlowChange]
  );

  const handleConnect = useCallback(
    (connection: Connection) => {
      const eds = addEdge(connection, edges);
      setEdges(eds);

      handleFlowChange(nodes, eds);
      onConnectProp?.(connection);
    },
    [edges, handleFlowChange, nodes, onConnectProp]
  );

  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      const nds = applyNodeChanges(changes, nodes);
      setNodes(nds);

      handleFlowChange(nds, edges);
      onNodesChangeProp?.(changes);
    },
    [edges, handleFlowChange, nodes, onNodesChangeProp]
  );

  const handleEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      const eds = applyEdgeChanges(changes, edges);
      setEdges(eds);

      handleFlowChange(nodes, eds);
      onEdgesChangeProp?.(changes);
    },
    [edges, handleFlowChange, nodes, onEdgesChangeProp]
  );

  return (
    <div
      id={elementId}
      ref={setNodeRef}
      className={cx(classes.root, className)}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={handleConnect}
        {...others}
      >
        {children}
      </ReactFlow>
    </div>
  );
};
