import { css } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-react-core";
import { HvFlowNode } from "@hitachivantara/uikit-react-lab";
import { HvLineChart } from "@hitachivantara/uikit-react-viz";
import { NodeProps, useStore } from "reactflow";

export const LineChart = (props: NodeProps) => {
  const { id } = props;
  const nodes = useStore((state) => state.getNodes());
  const edges = useStore((state) => state.edges);
  const dataNodeId = edges.find((e) => e.target === id)?.source;

  const dataNode = nodes.find((n) => n.id === dataNodeId);

  return (
    <HvFlowNode
      description="Line Chart description"
      expanded
      classes={{ root: css({ width: 500 }) }}
      {...props}
    >
      {dataNode &&
        dataNode.data &&
        dataNode.data.jsonData &&
        dataNode.data.jsonData.length > 0 && (
          <div
            style={{
              padding: theme.spacing("xs", "xs", "xs", "sm"),
            }}
          >
            <HvLineChart
              data={dataNode.data.jsonData}
              splitBy="country"
              groupBy="year"
              measures="population"
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
      accepts: ["jsonData"],
    },
  ],
  outputs: [],
};
