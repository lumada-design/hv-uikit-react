import { css } from "@emotion/css";
import { HvFlowNode, HvFlowNodeFC } from "@hitachivantara/uikit-react-lab";
import { HvLineChart } from "@hitachivantara/uikit-react-viz";
import { useEdges, useNodes } from "reactflow";

import { NodeData, data } from "./data";
import type { NodeGroups } from ".";

export const LineChart: HvFlowNodeFC<NodeGroups> = (props) => {
  const { id } = props;
  const nodes = useNodes<NodeData>();
  const edges = useEdges();
  const dataNodeId = edges.find((e) => e.target === id)?.source;
  const dataNode = nodes.find((n) => n.id === dataNodeId);

  return (
    <HvFlowNode
      description="Line Chart"
      expanded
      classes={{ root: css({ width: 500 }) }}
      {...props}
    >
      {dataNode && dataNode.data && dataNode.data.country && (
        <div
          className={css({
            height: 300,
          })}
        >
          <HvLineChart
            data={data[dataNode.data.country]}
            groupBy="Month"
            measures="Precipitation"
            yAxis={{
              name: "mm",
            }}
            grid={{ bottom: 40, top: 40 }}
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
      accepts: ["data"],
    },
  ],
};
