import { useEffect, useState } from "react";
import { useEdges, useNodes, useReactFlow } from "reactflow";

import {
  HvCheckBox,
  HvCheckBoxGroup,
  theme,
} from "@hitachivantara/uikit-react-core";
import {
  useFlowNode,
  HvFlowNode,
  HvFlowNodeFC,
} from "@hitachivantara/uikit-react-lab";

import { NodeData } from "./data";

function filterDataByCountries(data, countriesToFilter: string[]) {
  return data.filter((item) => countriesToFilter.includes(item.country));
}

export const Filter: HvFlowNodeFC = (props) => {
  const { id } = props;

  const [checked, setChecked] = useState<string[]>([]);

  const reactFlowInstance = useReactFlow();

  const nodes = useNodes<NodeData>();
  const edges = useEdges();

  let options: string[] = [];

  const self = useFlowNode(id);

  useEffect(() => {
    const dataNodeId = edges.find((e) => e.target === id)?.source;
    if (dataNodeId) {
      const dataNode = nodes.find((n) => n.id === dataNodeId);

      const data = dataNode?.data.jsonData;

      if (data) {
        const newNodes = nodes.map((node) => {
          if (node.id === id) {
            const filteredData = filterDataByCountries(data, checked);
            node.data = { checked, jsonData: filteredData };
          }
          return node;
        });
        reactFlowInstance.setNodes(newNodes);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);

  const dataNodeId = edges.find((e) => e.target === id)?.source;
  if (dataNodeId) {
    const dataNode = nodes.find((n) => n.id === dataNodeId);
    const data = dataNode?.data.jsonData;

    if (data) {
      const distinctCountries = [...new Set(data.map((item) => item.country))];
      options = distinctCountries as string[];
    }
  }

  const handleCheck = (event, val) => {
    setChecked(val);
  };

  return (
    <HvFlowNode
      description="Filtering data"
      expanded
      inputs={[
        {
          label: "Data",
          isMandatory: true,
          accepts: ["jsonData"],
        },
      ]}
      outputs={[
        {
          label: "Filtered Data",
          isMandatory: false,
          provides: "jsonData",
        },
      ]}
      {...props}
    >
      <HvCheckBoxGroup
        onChange={handleCheck}
        style={{
          padding: theme.spacing("xs", "xs", "xs", "sm"),
        }}
      >
        {options.map((o) => {
          return (
            <HvCheckBox
              key={o}
              label={o}
              value={o}
              checked={self?.data?.checked?.includes(o)}
            />
          );
        })}
      </HvCheckBoxGroup>
    </HvFlowNode>
  );
};

Filter.meta = {
  label: "Filter",
  groupId: "transformations",
};
