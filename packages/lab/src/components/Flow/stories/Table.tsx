import { theme } from "@hitachivantara/uikit-styles";
import { useStore } from "reactflow";
import { HvFlowNode } from "../Node/Node";

export const Table = (props) => {
  const { id } = props;

  const nodes = useStore((state) => state.getNodes());
  const edges = useStore((state) => state.edges);

  const dataNodeId = edges.find((e) => e.target === id)?.source;
  let dataNode;
  if (dataNodeId) {
    dataNode = nodes.find((n) => n.id === dataNodeId);
    console.clear();
    console.table(dataNode?.data?.moreData);
  }

  return (
    <HvFlowNode
      title="Data Table"
      description="Data Table visualization"
      color={theme.colors.cat6_40}
      {...props}
    />
  );
};

Table.meta = {
  label: "Data Table",
  groupId: "visualizations",
  inputs: [
    {
      label: "Data",
      isMandatory: true,
      accepts: ["data"],
    },
  ],
  outputs: [],
};
