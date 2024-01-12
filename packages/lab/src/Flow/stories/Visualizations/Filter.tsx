import { useMemo } from "react";
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
  useFlowNodeUtils,
} from "@hitachivantara/uikit-react-lab";

import { NodeData } from "./data";

function filterDataByCountries(data, countriesToFilter: string[]) {
  return data.filter((item) => countriesToFilter.includes(item.country));
}

export const Filter: HvFlowNodeFC = (props) => {
  const { data, id } = props;
  const { setNodeData } = useFlowNodeUtils();

  const inputNodes = useFlowInputNodes<NodeData>(id);
  const jsonData = inputNodes[0]?.data.jsonData;

  const options = useMemo(() => {
    return jsonData ? [...new Set(jsonData.map((item) => item.country))] : [];
  }, [jsonData]);

  const handleCheck: HvCheckBoxGroupProps["onChange"] = (event, checked) => {
    if (!jsonData) return;

    setNodeData(() => ({
      checked,
      jsonData: filterDataByCountries(jsonData, checked),
    }));
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
        defaultChecked={data.checked}
        onChange={handleCheck}
        style={{
          padding: theme.spacing("xs", "xs", "xs", "sm"),
        }}
      >
        {options.map((o) => (
          <HvCheckBox key={o} label={o} value={o} />
        ))}
      </HvCheckBoxGroup>
    </HvFlowNode>
  );
};

Filter.meta = {
  label: "Filter",
  groupId: "transformations",
};
