import { css } from "@emotion/css";
import { Node } from "@xyflow/react";
import {
  HvFlowNode,
  HvFlowNodeFC,
  useFlowInputNodes,
} from "@hitachivantara/uikit-react-lab";
import { HvBarChart } from "@hitachivantara/uikit-react-viz";

import type { NodeData } from "./data";

export const BarChart: HvFlowNodeFC<Node<NodeData>> = (props) => {
  const inputNodes = useFlowInputNodes<Node<NodeData>>();
  const jsonData = (inputNodes[0]?.data as NodeData)?.jsonData;

  return (
    <HvFlowNode
      description="Bar Chart description"
      groupId="visualizations"
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
          <HvBarChart
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
