import { useState } from "react";
import { HvDropdown } from "@hitachivantara/uikit-react-core";
import { useReactFlow } from "reactflow";

const Select = ({ nodeId, param, data }) => {
  const reactFlowInstance = useReactFlow();
  const [option, setOption] = useState(data[param.id]);

  const onSelectChange = (item) => {
    const nodes = reactFlowInstance.getNodes();
    const newNodes = nodes.map((node) => {
      if (node.id === nodeId) {
        node.data = { ...node.data, [param.id]: item.label };
      }
      return node;
    });
    reactFlowInstance.setNodes(newNodes);
    setOption(item.label);
  };

  return (
    <HvDropdown
      className="nodrag" // Prevents dragging within the select field
      disablePortal
      label={param.label}
      values={param.options?.map((o) => {
        return { id: o, label: o, selected: o === option };
      })}
      onChange={(item) => onSelectChange(item)}
      maxHeight={100}
    />
  );
};

export default Select;
