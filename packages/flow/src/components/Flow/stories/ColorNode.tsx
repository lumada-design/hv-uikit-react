import { memo, useState } from "react";
import { Handle, Position, useReactFlow } from "reactflow";
import {
  HvCard,
  HvCardContent,
  HvCardHeader,
  HvColorPicker,
  HvInlineEditor,
  useTheme,
} from "@hitachivantara/uikit-react-core";
import { css } from "@emotion/css";
import { HvNodeProps } from "../../../types";

const ColorNode = ({
  id,
  data,
  isConnectable,
  sourcePosition = Position.Bottom,
}: HvNodeProps) => {
  const { activeTheme, selectedMode } = useTheme();
  const [colorValue, setColorValue] = useState(
    activeTheme?.colors.modes[selectedMode].secondary
  );
  const [labelText, setLabelText] = useState(data.label);
  const reactFlowInstance = useReactFlow();

  const handleLabelChange = (event, value) => {
    const newText = value;
    setLabelText(newText);

    const nodes = reactFlowInstance.getNodes();
    const newNodes = nodes.map((node) => {
      if (node.id === id) {
        node.data = { ...node.data, label: newText };
      }
      return node;
    });
    reactFlowInstance.setNodes(newNodes);
  };

  const handleColorChange = (value) => {
    const newColor = value;
    setColorValue(newColor);

    const nodes = reactFlowInstance.getNodes();
    const newNodes = nodes.map((node) => {
      if (node.id === id) {
        node.data = { ...node.data, value: newColor };
      }
      return node;
    });
    reactFlowInstance.setNodes(newNodes);
  };

  return (
    <>
      <HvCard
        bgcolor="atmo1"
        statusColor={data.status ?? "neutral"}
        style={{ width: 240 }}
      >
        <HvCardHeader
          classes={{ content: css({ width: "100%" }) }}
          title={
            <HvInlineEditor
              variant="title4"
              value={labelText}
              onChange={handleLabelChange}
            />
          }
        />
        <HvCardContent>
          <HvColorPicker value={colorValue} onChange={handleColorChange} />
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

export default memo(ColorNode);
