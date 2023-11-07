import { HvFlowContextValue } from "../FlowContext";
import { HvFlowNodeGroup } from "../types";
import {
  HvFlowSidebarGroupNodes,
  HvFlowSidebarGroupNode,
} from "./SidebarGroup";

export const buildGroups = (
  nodeGroups: HvFlowContextValue["nodeGroups"],
  nodeTypes: HvFlowContextValue["nodeTypes"],
  defaultGroupProps?: HvFlowNodeGroup
): {
  [key: string]: HvFlowNodeGroup & { nodes: HvFlowSidebarGroupNodes };
} => {
  if (nodeGroups) {
    const groups = Object.entries(nodeGroups).reduce((acc, curr) => {
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
      } as HvFlowNodeGroup & { nodes: HvFlowSidebarGroupNodes };

      // Create a "Default" group for nodes without a groupId
      if (nodesWithoutGroupId.length > 0) {
        // @ts-ignore
        acc.Default = {
          name: "Default",
          label: "Default",
          nodes: nodesWithoutGroupId,
          ...defaultGroupProps,
        } as HvFlowNodeGroup & { nodes: HvFlowSidebarGroupNodes };
      }

      return acc;
    }, {});

    return groups;
  }

  return {};
};
