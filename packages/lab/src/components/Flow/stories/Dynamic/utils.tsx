import { HvDaFlowNode } from "@hitachivantara/uikit-react-lab";

export const createAsset = ({ label, description, params, data }) => {
  const Asset = (props) => {
    return (
      <HvDaFlowNode
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
