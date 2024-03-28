import { css } from "@emotion/css";
import {
  HvFlowNode,
  HvFlowNodeFC,
  HvFlowNodeTypeMeta,
  useFlowInputNodes,
} from "@hitachivantara/uikit-react-lab";
import { HvLineChart } from "@hitachivantara/uikit-react-viz";

import type { NodeGroup } from ".";
import { data, NodeData } from "./data";

export const LineChart: HvFlowNodeFC<NodeGroup> = (props) => {
  const inputNodes = useFlowInputNodes<NodeData>();
  const country = inputNodes[0]?.data.country;

  return (
    <HvFlowNode
      description="Line Chart"
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

LineChart.meta = {
  label: "Line Chart",
  groupId: "visualizations",
} satisfies HvFlowNodeTypeMeta<NodeGroup>;
