import { css } from "@emotion/css";
import { HvFlowNode } from "@hitachivantara/uikit-react-lab";
import { HvLineChart } from "@hitachivantara/uikit-react-viz";
import { NodeProps, useStore } from "reactflow";

import { data } from "./data";

export const LineChart = (props: NodeProps) => {
  const { id } = props;
  const nodes = useStore((state) => state.getNodes());
  const edges = useStore((state) => state.edges);
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
        <div>
          <HvLineChart
            data={data[dataNode.data.country]}
            groupBy="Month"
            measures="Precipitation"
            grid={{ top: 10, bottom: 40, right: 10, left: 40 }}
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
