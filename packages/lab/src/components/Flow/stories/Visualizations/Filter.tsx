import { HvCheckBox, HvCheckBoxGroup } from "@hitachivantara/uikit-react-core";
import { useEffect, useState } from "react";
import { useReactFlow, useStore } from "reactflow";
import { useFlowNode } from "../../hooks/useFlowNode";
import { HvFlowNode } from "../../Node/Node";

function filterDataByCountries(data, countriesToFilter: string[]) {
  return data.filter((item) => countriesToFilter.includes(item.country));
}

export const Filter = (props) => {
  const { id } = props;

  const [checked, setChecked] = useState<string[]>([]);
  const reactFlowInstance = useReactFlow();
  const nodes = useStore((state) => state.getNodes());
  const edges = useStore((state) => state.edges);
  // const filter = useStore((state) => state.getNodes().find((n) => n.id === id))
  //   ?.data.filter;
  let options: string[] = [];
  const { node: self } = useFlowNode(id);

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
    <HvFlowNode description="Filtering data" expanded {...props}>
      <HvCheckBoxGroup onChange={handleCheck}>
        {options.map((o) => {
          return (
            <HvCheckBox
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
  inputs: [
    {
      label: "Data",
      isMandatory: true,
      accepts: ["jsonData"],
    },
  ],
  outputs: [
    {
      label: "Filtered Data",
      isMandatory: false,
      provides: "jsonData",
    },
  ],
};
