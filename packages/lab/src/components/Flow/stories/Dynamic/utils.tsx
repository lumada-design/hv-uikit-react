import { HvFlowNode } from "@hitachivantara/uikit-react-lab";
import { NodeProps } from "reactflow";

export const createAsset = ({ label, description, params, data }) => {
  const Asset = (props: NodeProps) => {
    return (
      <HvFlowNode
        description={description}
        expanded
        params={params}
        {...props}
      />
    );
  };

  Asset.meta = {
    label,
    groupId: "assets",
    data,
  };

  return Asset;
};
