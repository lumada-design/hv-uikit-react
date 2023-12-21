import { useEffect, useMemo, useState } from "react";
import { useReactFlow } from "reactflow";
import {
  HvCheckBox,
  HvCheckBoxGroup,
  HvCheckBoxGroupProps,
  theme,
} from "@hitachivantara/uikit-react-core";
import {
  HvFlowNode,
  HvFlowNodeFC,
  useFlowInputNodes,
} from "@hitachivantara/uikit-react-lab";

import { NodeData } from "./data";

function filterDataByCountries(data, countriesToFilter: string[]) {
  return data.filter((item) => countriesToFilter.includes(item.country));
}

export const Filter: HvFlowNodeFC = (props) => {
  const { data, id } = props;

  const [checked, setChecked] = useState<string[]>([]);

  const reactFlowInstance = useReactFlow();

  const inputNodes = useFlowInputNodes<NodeData>(id);
  const jsonData = inputNodes[0]?.data.jsonData;

  const options = useMemo(() => {
    return jsonData ? [...new Set(jsonData.map((item) => item.country))] : [];
  }, [jsonData]);

  useEffect(() => {
    if (jsonData) {
      reactFlowInstance.setNodes((nds) =>
        nds.map((node) => {
          if (node.id === id) {
            const filteredData = filterDataByCountries(jsonData, checked);
            node.data = { checked, jsonData: filteredData };
          }
          return node;
        })
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);

  const handleCheck: HvCheckBoxGroupProps["onChange"] = (event, val) => {
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
          maxConnections: 1,
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
              checked={data.checked?.includes(o)}
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
