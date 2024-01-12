import { useState } from "react";
import { HvInput, HvInputProps } from "@hitachivantara/uikit-react-core";
import { useNodeId, useReactFlow } from "reactflow";

import { HvFlowNodeTextParam } from "../../types";

interface TextProps {
  param: Omit<HvFlowNodeTextParam, "type">;
  data: any;
}

const Text = ({ param, data }: TextProps) => {
  const { id, label } = param;
  const nodeId = useNodeId();

  const reactFlowInstance = useReactFlow();

  const [text, setText] = useState(data[id]);

  const onTextChange: HvInputProps["onChange"] = (event, val) => {
    reactFlowInstance.setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, [id]: val };
        }
        return node;
      })
    );
    setText(val);
  };

  return (
    <HvInput
      className="nodrag" // Prevents dragging within the input field
      label={label}
      value={text}
      onChange={onTextChange}
    />
  );
};

export default Text;
