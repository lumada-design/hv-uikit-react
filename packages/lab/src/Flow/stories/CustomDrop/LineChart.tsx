import { css } from "@emotion/css";
import { Node } from "@xyflow/react";
import {
  HvFlowNode,
  HvFlowNodeFC,
  useFlowInputNodes,
} from "@hitachivantara/uikit-react-lab";
import { HvLineChart } from "@hitachivantara/uikit-react-viz";

import { data, NodeData } from "./data";

export const LineChart: HvFlowNodeFC = (props) => {
  const inputNodes = useFlowInputNodes<Node<NodeData>>();
  const country = inputNodes[0]?.data.country;

  return (
    <HvFlowNode
      description="Line Chart"
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
          <HvLineChart
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
