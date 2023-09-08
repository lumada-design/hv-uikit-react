import { HvFlowContextValue } from "../FlowContext";
import { HvFlowNodeGroup } from "../types";
import { HvFlowSidebarGroupNodes } from "./SidebarGroup";

export const buildGroups = (
  nodeGroups: HvFlowContextValue["nodeGroups"],
  nodeTypes: HvFlowContextValue["nodeTypes"]
): {
  [key: string]: HvFlowNodeGroup & { nodes: HvFlowSidebarGroupNodes };
} => {
  if (nodeGroups) {
    const groups = Object.entries(nodeGroups).reduce((acc, curr) => {
      const nodes = nodeTypes
        ? Object.entries(nodeTypes).reduce(
            (accN: HvFlowSidebarGroupNodes, currN) => {
              if (currN[1].meta?.groupId === curr[0]) {
                accN.push({
                  id: currN[0],
                  label: currN[1].meta?.label,
                });
              }
              return accN;
            },
            []
          )
        : [];

      acc[curr[0]] = {
        ...curr[1],
        nodes,
      };

      return acc;
    }, {});

    return groups;
  }

  return {};
};
