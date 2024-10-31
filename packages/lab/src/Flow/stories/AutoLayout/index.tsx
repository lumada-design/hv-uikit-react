import { useCallback, useState } from "react";
import { css } from "@emotion/css";
import { Node, Position, ReactFlowInstance } from "reactflow";
import {
  HvButton,
  HvGlobalActions,
  theme,
} from "@hitachivantara/uikit-react-core";
import {
  HvFlow,
  HvFlowControls,
  HvFlowProps,
} from "@hitachivantara/uikit-react-lab";

// The code for these values are available here: https://github.com/lumada-design/hv-uikit-react/tree/master/packages/lab/src/components/Flow/stories/Base/index.tsx
import { nodeGroups, NodeType } from "../Base";
import { SimpleNode } from "../Base/SimpleNode";

const TOTAL_NODES = 72;
const BASE_DISTANCE = 220;
const LEVELS = [6, 18, 24, 36, 48];

const sumUpToLevel = (n: number) =>
  LEVELS.slice(0, n + 1).reduce((acc, val) => acc + val, 0);

const actualLevels = () => {
  const actualCounts = [...LEVELS];
  const totalUsed = actualCounts.reduce((sum, count) => sum + count, 0);

  // If totalUsed exceeds TOTAL_NODES, we need to adjust
  if (totalUsed > TOTAL_NODES) {
    // Calculate the total excess
    let excess = totalUsed - TOTAL_NODES;

    // Start reducing from the last level until the excess is covered
    for (let i = actualCounts.length - 1; i >= 0; i--) {
      if (excess <= 0) break; // Exit if no excess left to adjust
      const reducible = actualCounts[i];
      const adjustment = Math.min(reducible, excess); // Can't reduce below zero
      actualCounts[i] -= adjustment;
      excess -= adjustment;
    }
  }

  return actualCounts;
};

// Classes
export const classes = {
  root: css({ height: "100vh" }),
  globalActions: css({ paddingBottom: theme.space.md }),
  flow: css({
    height: "calc(100% - 90px)",
  }),
};

type NodesEdges = {
  nodes: HvFlowProps<NodeType>["nodes"];
  edges: HvFlowProps<NodeType>["edges"];
};

const nodeTypes = { simpleNode: SimpleNode };

const getNodesAndEdges = (): NodesEdges => {
  const tempNodes: any[] = [];
  const tempEdges: any[] = [];

  // add parent node
  const parent = {
    id: `parent`,
    type: "simpleNode",
    position: { x: 0, y: 0 },
    data: {
      nodeLabel: "Parent",
      id: "parent",
      handleSource: Position.Right,
      handleTarget: Position.Left,
    },
  };

  tempNodes.push(parent);

  for (let i = 0; i < TOTAL_NODES; i++) {
    // add child nodes
    const child = {
      id: `child-${i}`,
      type: "simpleNode",
      position: { x: 0, y: i * 100 },
      data: {
        nodeLabel: "Child",
        id: `child-${i}`,
        handleSource: Position.Right,
        handleTarget: Position.Left,
      },
    };

    tempNodes.push(child);

    // add edges
    tempEdges.push({
      id: `edge-${i}`,
      source: parent.id,
      target: child.id,
      sourceHandle: "right",
      targetHandle: "left",
    });
  }

  return { nodes: tempNodes, edges: tempEdges };
};

export const AutoLayout = () => {
  const { nodes, edges } = getNodesAndEdges();
  const [flowEdges] = useState(edges);
  const [flowInstance, setFlowInstance] = useState<ReactFlowInstance>();

  const onNodeDrag = useCallback(
    (_: any, node: Node) => {
      // get the source or target node
      const sourceNode = flowInstance?.getNode("parent");
      // const targetNode = flowInstance?.getNode(node.id);

      if (!sourceNode) return;

      let sourceHandlePos = "right";
      let targetHandlePos = "left";

      const xDiff = node.position.x - sourceNode.position.x;
      const yDiff = node.position.y - sourceNode.position.y;

      if (xDiff < 0) {
        if ((yDiff < 0 && yDiff > -100) || (yDiff > 0 && yDiff < 100)) {
          sourceHandlePos = "left";
          targetHandlePos = "right";
        } else if (yDiff < 0) {
          sourceHandlePos = "top";
          targetHandlePos = "right";
        } else if (yDiff > 100) {
          sourceHandlePos = "bottom";
          targetHandlePos = "right";
        }
      } else if (xDiff > 75) {
        if ((yDiff < 0 && yDiff > -100) || (yDiff > 0 && yDiff < 100)) {
          sourceHandlePos = "right";
          targetHandlePos = "left";
        } else if (yDiff < 0) {
          sourceHandlePos = "top";
          targetHandlePos = "left";
        } else if (yDiff > 100) {
          sourceHandlePos = "bottom";
          targetHandlePos = "left";
        }
      } else if (xDiff > 0 && xDiff < 75) {
        if (yDiff < 0) {
          sourceHandlePos = "top";
        } else if (yDiff > 0) {
          sourceHandlePos = "bottom";
        }
      }

      // Set edges only once with the computed handle positions
      flowInstance?.setEdges((eds) => {
        return eds.map((edge) => {
          if (edge.target === node.id) {
            return {
              ...edge,
              sourceHandle: sourceHandlePos,
              targetHandle: targetHandlePos,
            };
          }
          return edge;
        });
      });
    },
    [flowInstance],
  );

  const handleArrange = () => {
    flowInstance?.setNodes((nds) => {
      const parentNode = nds.find((node) => node.id === "parent");
      if (!parentNode) return nds;

      const parentPosition = { x: 0, y: 0 };
      let level = 1;
      let newEdges = flowInstance.getEdges();
      let totalNodesProcessed = 0;

      // we want to know how many nodes are in each level, not just how many are allowed per level
      const nodesPerLevel = actualLevels();

      const updatedNodes = nds.map((node) => {
        if (node.id === "parent") {
          return { ...node, position: parentPosition };
        }

        // increase distance to center for each level
        const distance = level * BASE_DISTANCE;
        // angle step depends on the *actual* number of nodes in the level
        const angleStep = (2 * Math.PI) / nodesPerLevel[level - 1];
        // the index of the node inside the current level
        const nodeLevelIndex = totalNodesProcessed % nodesPerLevel[level - 1];
        // the actual angle for the node
        const angle = nodeLevelIndex * angleStep;

        const x = parentPosition.x + distance * Math.cos(angle);
        const y = parentPosition.y + distance * Math.sin(angle);

        let sourceHandlePos = "right";
        let targetHandlePos = "left";
        const xDiff = x - parentPosition.x;
        const yDiff = y - parentPosition.y;

        if (xDiff < 0) {
          if ((yDiff < 0 && yDiff > -100) || (yDiff > 0 && yDiff < 100)) {
            sourceHandlePos = "left";
            targetHandlePos = "right";
          } else if (yDiff < 0) {
            sourceHandlePos = "top";
            targetHandlePos = "right";
          } else if (yDiff > 100) {
            sourceHandlePos = "bottom";
            targetHandlePos = "right";
          }
        } else if (xDiff >= 0) {
          if ((yDiff < 0 && yDiff > -100) || (yDiff > 0 && yDiff < 100)) {
            sourceHandlePos = "right";
            targetHandlePos = "left";
          } else if (yDiff < 0) {
            sourceHandlePos = "top";
            targetHandlePos = "left";
          } else if (yDiff > 100) {
            sourceHandlePos = "bottom";
            targetHandlePos = "left";
          }
        }

        // Update edges to set the handle positions
        newEdges = newEdges.map((edge) => {
          if (edge.target === node.id) {
            return {
              ...edge,
              sourceHandle: sourceHandlePos,
              targetHandle: targetHandlePos,
            };
          }
          return edge;
        });

        totalNodesProcessed += 1;
        if (totalNodesProcessed === sumUpToLevel(level - 1)) {
          level += 1;
        }

        return { ...node, position: { x, y } };
      });

      flowInstance?.setEdges(newEdges);

      return updatedNodes;
    });

    // Add timeout to defer fitView
    setTimeout(() => {
      flowInstance?.fitView({ padding: 0.2 });
    }, 0);
  };

  return (
    <div className={classes.root}>
      <HvGlobalActions
        className={classes.globalActions}
        position="relative"
        title="New Flow"
      >
        <HvButton variant="primary" onClick={() => handleArrange()}>
          Arrange
        </HvButton>
      </HvGlobalActions>
      <div className={classes.flow}>
        <HvFlow
          fitView
          nodes={nodes}
          edges={flowEdges}
          nodeTypes={nodeTypes}
          nodeGroups={nodeGroups}
          onInit={setFlowInstance}
          onNodeDrag={onNodeDrag}
          defaultEdgeOptions={{
            type: "default",
          }}
          minZoom={0.1}
          maxZoom={2}
        >
          <HvFlowControls />
        </HvFlow>
      </div>
    </div>
  );
};
