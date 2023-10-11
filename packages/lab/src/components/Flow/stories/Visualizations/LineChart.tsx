import { css } from "@emotion/css";
import { HvLineChart } from "@hitachivantara/uikit-react-viz";
import { useStore } from "reactflow";
import { HvFlowNode } from "../../Node/Node";

export const LineChart = (props) => {
  const { id } = props;
  const nodes = useStore((state) => state.getNodes());
  const edges = useStore((state) => state.edges);
  const dataNodeId = edges.find((e) => e.target === id)?.source;

  const dataNode = nodes.find((n) => n.id === dataNodeId);

  return (
    <HvFlowNode
      title="Line Chart"
      description="Line Chart description"
      expanded
      classes={{ root: css({ width: 500 }) }}
      {...props}
    >
      {dataNode &&
        dataNode.data &&
        dataNode.data.jsonData &&
        dataNode.data.jsonData.length > 0 && (
          <div>
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
