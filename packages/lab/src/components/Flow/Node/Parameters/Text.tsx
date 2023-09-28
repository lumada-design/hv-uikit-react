import { HvInput } from "@hitachivantara/uikit-react-core";
import { useState } from "react";
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

  return <HvInput value={text} onChange={(evt, val) => onTextChange(val)} />;
};

export default Text;
