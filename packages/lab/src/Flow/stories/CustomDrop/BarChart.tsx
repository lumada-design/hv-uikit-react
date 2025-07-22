import { css } from "@emotion/css";
import { Node } from "@xyflow/react";
import {
  HvFlowNode,
  HvFlowNodeFC,
  useFlowInputNodes,
} from "@hitachivantara/uikit-react-lab";
import { HvBarChart } from "@hitachivantara/uikit-react-viz";

import { data, NodeData } from "./data";

export const BarChart: HvFlowNodeFC = (props) => {
  const inputNodes = useFlowInputNodes<Node<NodeData>>();
  const country = inputNodes[0]?.data.country;

  return (
    <HvFlowNode
      description="Bar Chart"
      groupId="visualizations"
      expanded
      classes={{ root: css({ width: 500 }) }}
      inputs={[
        {
          label: "Data",
          isMandatory: true,
          accepts: ["data"],
          maxConnections: 1,
        },
      ]}
      {...props}
    >
      {country && (
        <div
          className={css({
            height: 300,
          })}
        >
          <HvBarChart
            data={data[country]}
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
