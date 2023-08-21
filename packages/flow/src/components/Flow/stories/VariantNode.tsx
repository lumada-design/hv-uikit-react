import { memo, useEffect, useState } from "react";
import { Handle, Position, useReactFlow } from "reactflow";
import {
  HvCard,
  HvCardContent,
  HvCardHeader,
  HvDropdown,
  HvListValue,
} from "@hitachivantara/uikit-react-core";
import { HvNodeProps } from "../../../types";

const options = ["body", "label", "title1"];
const VariantNode = ({
  id,
  data,
  isConnectable,
  sourcePosition = Position.Bottom,
}: HvNodeProps) => {
  const [values, setValues] = useState<HvListValue[]>([]);
  const [selected, setSelected] = useState("body");
  const reactFlowInstance = useReactFlow();

  useEffect(() => {
    const vals: HvListValue[] = [];
    options.map((o) => {
      return vals.push({
        label: o,
        selected: o === selected,
      });
    });
    setValues(vals);
  }, [selected]);

  const handleChange = (item: HvListValue) => {
    const selectedItem = item.label;
    setSelected(selectedItem as string);

    const nodes = reactFlowInstance.getNodes();
    const newNodes = nodes.map((node) => {
      if (node.id === id) {
        node.data = { ...node.data, value: selectedItem };
      }
      return node;
    });
    reactFlowInstance.setNodes(newNodes);
  };

  return (
    <>
      <HvCard bgcolor="atmo1" statusColor={data.status ?? "neutral"}>
        <HvCardHeader title={data.label} />
        <HvCardContent>
          <HvDropdown
            values={values}
            onChange={(item) => handleChange(item as HvListValue)}
          />
        </HvCardContent>
      </HvCard>

      <Handle
        type="source"
        position={sourcePosition}
        isConnectable={isConnectable}
      />
    </>
  );
};

export default memo(VariantNode);
