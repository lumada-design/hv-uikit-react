import { css } from "@emotion/css";
import {
  HvFlowNode,
  HvFlowNodeFC,
  HvFlowNodeTypeMeta,
  useFlowInputNodes,
} from "@hitachivantara/uikit-react-lab";
import { HvLineChart } from "@hitachivantara/uikit-react-viz";

import type { NodeGroup } from ".";
import { NodeData } from "./data";

export const LineChart: HvFlowNodeFC<NodeGroup> = (props) => {
  const inputNodes = useFlowInputNodes<NodeData>();
  const jsonData = inputNodes[0]?.data.jsonData;

  return (
    <HvFlowNode
      description="Line Chart description"
      expanded
      classes={{ root: css({ width: 500 }) }}
      inputs={[
        {
          label: "Data",
          isMandatory: true,
          accepts: ["jsonData"],
          maxConnections: 1,
        },
      ]}
      {...props}
    >
      {jsonData && jsonData.length > 0 && (
        <div className={css({ height: 300 })}>
          <HvLineChart
            data={jsonData}
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
} satisfies HvFlowNodeTypeMeta<NodeGroup>;
