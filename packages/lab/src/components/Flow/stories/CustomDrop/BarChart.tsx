import { css } from "@emotion/css";
import { HvDaFlowNode } from "@hitachivantara/uikit-react-lab";
import { HvBarChart } from "@hitachivantara/uikit-react-viz";
import { useStore } from "reactflow";

import { data } from "./data";

export const BarChart = (props) => {
  const { id } = props;
  const nodes = useStore((state) => state.getNodes());
  const edges = useStore((state) => state.edges);
  const dataNodeId = edges.find((e) => e.target === id)?.source;
  const dataNode = nodes.find((n) => n.id === dataNodeId);

  return (
    <HvDaFlowNode
      description="Bar Chart"
      expanded
      classes={{ root: css({ width: 500 }) }}
      {...props}
    >
      {dataNode && dataNode.data && dataNode.data.country && (
        <div>
          <HvBarChart
            data={data[dataNode.data.country]}
            groupBy="Month"
            measures="Precipitation"
            grid={{ top: 10, bottom: 40, right: 10, left: 40 }}
          />
        </div>
      )}
    </HvDaFlowNode>
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
