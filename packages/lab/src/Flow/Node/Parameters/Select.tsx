import { useState } from "react";
import { HvDropdown, HvDropdownProps } from "@hitachivantara/uikit-react-core";

import { HvFlowNodeSelectParam } from "../../types";
import { useFlowNodeUtils } from "../../hooks";

interface SelectProps {
  param: Omit<HvFlowNodeSelectParam, "type">;
  data: any;
}

const Select = ({ param, data }: SelectProps) => {
  const { id, label, multiple = false, options } = param;
  const { setNodeData } = useFlowNodeUtils();

  const [opts, setOpts] = useState<string[] | undefined>(
    data[id] ? (Array.isArray(data[id]) ? data[id] : [data[id]]) : undefined
  );

  const onSelectChange: HvDropdownProps["onChange"] = (item) => {
    const newOpts = Array.isArray(item)
      ? item.map((x) => x.label as string)
      : (item?.label as string) ?? undefined;

    setNodeData((prev) => ({ ...prev, [id]: newOpts }));
    setOpts(
      newOpts ? (Array.isArray(newOpts) ? newOpts : [newOpts]) : undefined
    );
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