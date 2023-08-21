import { useCallback, useRef, useState } from "react";
import {
  HvButton,
  HvProvider,
  HvTooltip,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";
import { Backwards, Open } from "@hitachivantara/uikit-react-icons";
import ReactFlow, {
  ReactFlowProvider,
  Background,
  Controls,
  MiniMap,
  Panel,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
} from "reactflow";
import { HvNode, HvNodeData, HvNodeTypes, HvEdge } from "../../types";
import "reactflow/dist/style.css";
import { getNode } from "./utils";
import { useClasses } from "./Flow.styles";
import { Sidebar } from "./Sidebar";

export interface HvFlowProps {
  classes?: any;
  nodes: HvNode<HvNodeData>[];
  edges: HvEdge[];
  nodesTypes?: HvNodeTypes;
}
const minimapStyle = {
  height: 120,
};

const HvFlowContent = ({
  classes: classesProp,
  nodes: nodesProp,
  edges: edgesProp,
  nodesTypes: nodesTypesProp,
}: HvFlowProps) => {
  const { classes } = useClasses(classesProp);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [nodes, setNodes, onNodesChange] = useNodesState(nodesProp);
  const [edges, setEdges, onEdgesChange] = useEdgesState(edgesProp);
  const reactFlowInstance = useReactFlow();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const isValidConnection = (connection) => {
    // only allow connections if the target node includes the source node in its allowed nodes
    const sourceNode = getNode(nodes, connection.source);
    const targetNode = getNode(nodes, connection.target);

    if (sourceNode && targetNode) {
      if (
        targetNode?.data.acceptedNodes?.includes(sourceNode?.type as string)
      ) {
        return true;
      }
    }
    return false;
  };

  const exportHandler = () => {
    console.log({ nodes, edges });
  };

  const addNode = useCallback(
    (nodeType: string, position: any) => {
      const newNode: HvNode = {
        id: `${nodeType}-${nodes.length + 1}`,
        position,
        data: { label: `${nodeType} label`, status: "negative" },
        type: nodeType,
      };
      setNodes((nds) => [...nds, newNode]);
    },
    [nodes.length, setNodes]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const rfBounds = { left: 0, top: 0 };
      if (reactFlowWrapper.current) {
        const reactFlowBounds =
          reactFlowWrapper.current.getBoundingClientRect();
        rfBounds.left = reactFlowBounds.left;
        rfBounds.top = reactFlowBounds.top;
      }

      // `project` converts the coordinates to the react flow coordinate system
      const position = reactFlowInstance.project({
        x: event.clientX - rfBounds.left,
        y: event.clientY - rfBounds.top,
      });

      addNode(event.dataTransfer.getData("application/reactflow"), position);
    },
    [addNode, reactFlowInstance]
  );

  return (
    <div
      className="reactflow-wrapper"
      ref={reactFlowWrapper}
      style={{
        height: "100vh",
        padding: 0,
      }}
    >
      <ReactFlow
        className={classes.root}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodesTypesProp}
        isValidConnection={isValidConnection}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        // fitview
        defaultViewport={{
          x: 400,
          y: 200,
          zoom: 1.2,
        }}
      >
        {nodesTypesProp && (
          <Panel position="top-right">
            <Backwards
              iconSize="M"
              onClick={() => setSidebarOpen((prev) => !prev)}
            />
            <Sidebar
              open={sidebarOpen}
              setOpen={setSidebarOpen}
              nodesTypes={nodesTypesProp}
            />
          </Panel>
        )}
        <MiniMap
          style={minimapStyle}
          zoomable
          pannable
          position="bottom-left"
        />
        <Controls
          position="bottom-center"
          style={{ display: "flex", marginBottom: theme.space.lg }}
        >
          <HvTooltip title={<HvTypography>Export</HvTypography>}>
            <HvButton
              icon
              variant="secondaryGhost"
              onClick={() => exportHandler()}
              aria-label="Export"
              style={{ width: 26, height: 27 }}
            >
              <Open iconSize="XS" />
            </HvButton>
          </HvTooltip>
        </Controls>
        <Background color={theme.colors.secondary} gap={16} />
      </ReactFlow>
    </div>
  );
};

// We're wrapping the main Flow component with the ReactFlowProvider here
// in order to access the react flow instance in the onDrop handler.
export const HvFlow = (props) => {
  return (
    <HvProvider>
      <ReactFlowProvider>
        <HvFlowContent {...props} />
      </ReactFlowProvider>
    </HvProvider>
  );
};
