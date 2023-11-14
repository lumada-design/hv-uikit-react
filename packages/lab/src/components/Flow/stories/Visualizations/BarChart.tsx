import { css } from "@emotion/css";
import { HvFlowNode, HvFlowNodeFC } from "@hitachivantara/uikit-react-lab";
import { HvBarChart } from "@hitachivantara/uikit-react-viz";
import { useEdges, useNodes } from "reactflow";

import type { NodeData } from "./data";
import type { NodeGroups } from ".";

export const BarChart: HvFlowNodeFC<NodeGroups> = (props) => {
  const { id } = props;
  const nodes = useNodes<NodeData>();
  const edges = useEdges();
  const dataNodeId = edges.find((e) => e.target === id)?.source;

  const dataNode = nodes.find((n) => n.id === dataNodeId);

  return (
    <HvFlowNode
      description="Bar Chart description"
      expanded
      classes={{ root: css({ width: 500 }) }}
      {...props}
    >
      {dataNode?.data?.jsonData && dataNode.data.jsonData.length > 0 && (
        <div className={css({ height: 300 })}>
          <HvBarChart
            data={dataNode.data.jsonData}
            splitBy="country"
            groupBy="year"
            measures="population"
            yAxis={{
              name: "Millions",
              labelFormatter: (value) => `${Number(value) / 1000000}`,
            }}
            grid={{ bottom: 40 }}
          />
        </div>
      )}
    </HvFlowNode>
  );
};

BarChart.meta = {
  label: "Bar Chart",
  groupId: "visualizations",
  inputs: [
    {
      label: "Data",
      isMandatory: true,
      accepts: ["jsonData"],
    },
  ],
  outputs: [],
};
