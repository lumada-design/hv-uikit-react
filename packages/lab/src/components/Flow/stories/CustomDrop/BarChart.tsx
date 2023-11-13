import { css } from "@emotion/css";
import { HvFlowNode } from "@hitachivantara/uikit-react-lab";
import { HvBarChart } from "@hitachivantara/uikit-react-viz";
import { NodeProps, useStore } from "reactflow";

import { data } from "./data";

export const BarChart = (props: NodeProps) => {
  const { id } = props;
  const nodes = useStore((state) => state.getNodes());
  const edges = useStore((state) => state.edges);
  const dataNodeId = edges.find((e) => e.target === id)?.source;
  const dataNode = nodes.find((n) => n.id === dataNodeId);

  return (
    <HvFlowNode
      description="Bar Chart"
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
          <HvBarChart
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

BarChart.meta = {
  label: "Bar Chart",
  groupId: "visualizations",
  inputs: [
    {
      label: "Data",
      isMandatory: true,
      accepts: ["data"],
    },
  ],
};
