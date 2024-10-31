import { useCallback, useState } from "react";
import { css } from "@emotion/css";
import { Node, ReactFlowInstance } from "reactflow";
import {
  HvButton,
  HvGlobalActions,
  theme,
} from "@hitachivantara/uikit-react-core";
import { HvFlow, HvFlowControls } from "@hitachivantara/uikit-react-lab";

// The code for these values are available here: https://github.com/lumada-design/hv-uikit-react/tree/master/packages/lab/src/components/Flow/stories/Base/index.tsx
import { nodeGroups } from "../Base";
import { SimpleNode } from "../Base/SimpleNode";
import {
  actualLevels,
  BASE_DISTANCE,
  getHandlePositions,
  getNodesAndEdges,
  sumUpToLevel,
} from "./utils";

// Classes
export const classes = {
  root: css({ height: "100vh" }),
  globalActions: css({ paddingBottom: theme.space.md }),
  flow: css({
    height: "calc(100% - 90px)",
  }),
};

const nodeTypes = { simpleNode: SimpleNode };

export const AutoLayout = () => {
  const { nodes, edges } = getNodesAndEdges();
  const [flowEdges] = useState(edges);
  const [flowInstance, setFlowInstance] = useState<ReactFlowInstance>();

  const onNodeDrag = useCallback(
    (_: any, node: Node) => {
      const parentNode = flowInstance?.getNode("parent");
      if (!parentNode) return;

      const { sourceHandlePos, targetHandlePos } = getHandlePositions(
        node,
        parentNode,
      );

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

        node.position.x = parentPosition.x + distance * Math.cos(angle);
        node.position.y = parentPosition.y + distance * Math.sin(angle);

        const { sourceHandlePos, targetHandlePos } = getHandlePositions(
          node,
          parentNode,
        );

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

        return node;
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
