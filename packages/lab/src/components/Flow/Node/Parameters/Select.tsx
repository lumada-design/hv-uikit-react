import { useState } from "react";
import { HvDropdown, HvDropdownProps } from "@hitachivantara/uikit-react-core";
import { useReactFlow } from "reactflow";

import { HvFlowNodeSelectParam } from "../../types";

interface SelectProps {
  nodeId: string;
  param: Omit<HvFlowNodeSelectParam, "type">;
  data: any;
}

const Select = ({ nodeId, param, data }: SelectProps) => {
  const { id, label, multiple = false, options } = param;

  const reactFlowInstance = useReactFlow();

  const [opts, setOpts] = useState<string[] | undefined>(
    data[id] ? (Array.isArray(data[id]) ? data[id] : [data[id]]) : undefined
  );

  const onSelectChange: HvDropdownProps["onChange"] = (item) => {
    const nodes = reactFlowInstance.getNodes();

    const newOpts = Array.isArray(item)
      ? item.map((x) => x.label as string)
      : item?.label
      ? [item.label as string]
      : undefined;

    const newNodes = nodes.map((node) => {
      if (node.id === nodeId) {
        node.data = {
          ...node.data,
          [id]: newOpts,
        };
      }
      return node;
    });

    reactFlowInstance.setNodes(newNodes);
    setOpts(newOpts);
  };

  return (
    <HvDropdown
      className="nodrag" // Prevents dragging within the select field
      disablePortal
      label={label}
      values={options?.map((o) => {
        return { id: o, label: o, selected: !!opts?.find((opt) => opt === o) };
      })}
      onChange={onSelectChange}
      maxHeight={100}
      multiSelect={multiple}
    />
  );
};

export default Select;
