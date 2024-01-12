import { HvInput } from "@hitachivantara/uikit-react-core";

import { HvFlowNodeTextParam } from "../../types";
import { useFlowNodeUtils } from "../../hooks";

interface TextProps {
  param: Omit<HvFlowNodeTextParam, "type">;
  data: any;
}

const Text = ({ param, data }: TextProps) => {
  const { id, label } = param;
  const { setNodeData } = useFlowNodeUtils();

  return (
    <HvInput
      className="nodrag" // Prevents dragging within the input field
      label={label}
      defaultValue={data[id]}
      onChange={(evt, val) => setNodeData((prev) => ({ ...prev, [id]: val }))}
    />
  );
};

export default Text;
