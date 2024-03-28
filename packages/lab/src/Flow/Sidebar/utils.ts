import { HvFlowContextValue } from "../FlowContext";
import { HvFlowNodeGroup } from "../types";
import {
  HvFlowSidebarGroupNode,
  HvFlowSidebarGroupNodes,
} from "./SidebarGroup";

type NodeGroup = HvFlowNodeGroup & { nodes: HvFlowSidebarGroupNodes };

export const buildGroups = (
  nodeGroups: HvFlowContextValue["nodeGroups"],
  nodeTypes: HvFlowContextValue["nodeTypes"],
  defaultGroupProps?: HvFlowNodeGroup,
) => {
  if (!nodeGroups) return {};

  return Object.entries(nodeGroups).reduce(
    (acc, curr) => {
      const nodesWithGroupId: HvFlowSidebarGroupNode[] = [];
      const nodesWithoutGroupId: HvFlowSidebarGroupNode[] = [];

      if (nodeTypes) {
        for (const [nodeType, node] of Object.entries(nodeTypes)) {
          if (node.meta?.groupId === curr[0]) {
            nodesWithGroupId.push({
              type: nodeType,
              label: node.meta?.label,
              data: node.meta?.data,
            });
          } else if (!node.meta?.groupId) {
            nodesWithoutGroupId.push({
              type: nodeType,
              label: node.meta?.label || "",
              data: node.meta?.data,
            });
          }
        }
      }

      acc[curr[0]] = {
        ...curr[1],
        nodes: nodesWithGroupId,
      };

      // Create a "Default" group for nodes without a groupId
      if (nodesWithoutGroupId.length > 0) {
        acc.Default = {
          label: "Default",
          nodes: nodesWithoutGroupId,
          ...defaultGroupProps,
        };
      }

      return acc;
    },
    {} as Record<string, NodeGroup>,
  );
};
