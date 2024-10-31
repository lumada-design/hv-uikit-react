import { Node, Position } from "reactflow";
import { HvFlowProps } from "@hitachivantara/uikit-react-lab";

import { NodeType } from "../Base";

type NodesEdges = {
  nodes: HvFlowProps<NodeType>["nodes"];
  edges: HvFlowProps<NodeType>["edges"];
};

export const TOTAL_NODES = 70;
export const BASE_DISTANCE = 220;
export const LEVELS = [6, 18, 24, 36, 48];

export const sumUpToLevel = (n: number) =>
  LEVELS.slice(0, n + 1).reduce((acc, val) => acc + val, 0);

export const actualLevels = () => {
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

export const getNodesAndEdges = (): NodesEdges => {
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
      position: { x: i * 175, y: 100 },
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

export const getHandlePositions = (target: Node, source: Node) => {
  const xDiff = target.position.x - source.position.x;
  const yDiff = target.position.y - source.position.y;

  let sourceHandlePos = "right";
  let targetHandlePos = "left";

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

  return { sourceHandlePos, targetHandlePos };
};
