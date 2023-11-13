import { useState } from "react";
import { HvInput } from "@hitachivantara/uikit-react-core";
import { useReactFlow } from "reactflow";

const Text = ({ nodeId, param, data }) => {
  const reactFlowInstance = useReactFlow();
  const [text, setText] = useState(data[param.id]);

  const onTextChange = (val) => {
    const nodes = reactFlowInstance.getNodes();
    const newNodes = nodes.map((node) => {
      if (node.id === nodeId) {
        node.data = { ...node.data, [param.id]: val };
      }
      return node;
    });
    reactFlowInstance.setNodes(newNodes);
    setText(val);
  };

  return (
    <HvInput
      className="nodrag" // Prevents dragging within the input field
      label={param.label}
      value={text}
      onChange={(evt, val) => onTextChange(val)}
    />
  );
};

export default Text;
