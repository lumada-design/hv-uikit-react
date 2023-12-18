import { css } from "@emotion/css";
import { HvFlowNode, HvFlowNodeFC } from "@hitachivantara/uikit-react-lab";
import { HvBarChart } from "@hitachivantara/uikit-react-viz";
import { useEdges, useNodes } from "reactflow";

import { NodeData, data } from "./data";
import type { NodeGroups } from ".";

export const BarChart: HvFlowNodeFC<NodeGroups> = (props) => {
  const { id } = props;
  const nodes = useNodes<NodeData>();
  const edges = useEdges();
  const dataNodeId = edges.find((e) => e.target === id)?.source;
  const dataNode = nodes.find((n) => n.id === dataNodeId);

  return (
    <HvFlowNode
      description="Bar Chart"
      expanded
      classes={{ root: css({ width: 500 }) }}
      inputs={[
        {
          label: "Data",
          isMandatory: true,
          accepts: ["data"],
        },
      ]}
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
};
