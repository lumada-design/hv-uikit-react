import { css } from "@emotion/css";
import { HvFlowNode } from "@hitachivantara/uikit-react-lab";
import { HvLineChart } from "@hitachivantara/uikit-react-viz";
import { NodeProps, useEdges, useNodes } from "reactflow";

import { NodeData } from "./data";

export const LineChart = (props: NodeProps) => {
  const { id } = props;
  const nodes = useNodes<NodeData>();
  const edges = useEdges();
  const dataNodeId = edges.find((e) => e.target === id)?.source;

  const dataNode = nodes.find((n) => n.id === dataNodeId);

  return (
    <HvFlowNode
      description="Line Chart description"
      expanded
      classes={{ root: css({ width: 500 }) }}
      {...props}
    >
      {dataNode &&
        dataNode.data &&
        dataNode.data.jsonData &&
        dataNode.data.jsonData.length > 0 && (
          <div
            className={css({
              height: 300,
            })}
          >
            <HvLineChart
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

LineChart.meta = {
  label: "Line Chart",
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
