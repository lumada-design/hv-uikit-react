import { css } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-react-core";
import { HvFlowNode } from "@hitachivantara/uikit-react-lab";
import { HvBarChart } from "@hitachivantara/uikit-react-viz";
import { NodeProps, useStore } from "reactflow";

export const BarChart = (props: NodeProps) => {
  const { id } = props;
  const nodes = useStore((state) => state.getNodes());
  const edges = useStore((state) => state.edges);
  const dataNodeId = edges.find((e) => e.target === id)?.source;

  const dataNode = nodes.find((n) => n.id === dataNodeId);

  return (
    <HvFlowNode
      description="Bar Chart description"
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
            <HvBarChart
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

BarChart.meta = {
  label: "Bar Chart",
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
