import { useState } from "react";
import { HvInput, HvInputProps } from "@hitachivantara/uikit-react-core";
import { useReactFlow } from "reactflow";

import { HvFlowNodeTextParam } from "../../types";

interface TextProps {
  nodeId: string;
  param: Omit<HvFlowNodeTextParam, "type">;
  data: any;
}

const Text = ({ nodeId, param, data }: TextProps) => {
  const { id, label } = param;

  const reactFlowInstance = useReactFlow();

  const [text, setText] = useState(data[id]);

  const onTextChange: HvInputProps["onChange"] = (event, val) => {
    const nodes = reactFlowInstance.getNodes();

    const newNodes = nodes.map((node) => {
      if (node.id === nodeId) {
        node.data = { ...node.data, [id]: val };
      }
      return node;
    });

    reactFlowInstance.setNodes(newNodes);
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
