import { memo, useState } from "react";
import { Handle, Position, useReactFlow } from "reactflow";
import { css } from "@emotion/css";
import {
  HvCard,
  HvCardContent,
  HvCardHeader,
  HvInlineEditor,
  HvInput,
} from "@hitachivantara/uikit-react-core";
import { HvNodeProps } from "../../../types";

const TextNode = ({
  id,
  data,
  isConnectable,
  sourcePosition = Position.Bottom,
}: HvNodeProps) => {
  const [inputText, setInputText] = useState("");
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

  const handleInputChange = (event, value) => {
    const newText = value;
    setInputText(newText);

    const nodes = reactFlowInstance.getNodes();
    const newNodes = nodes.map((node) => {
      if (node.id === id) {
        node.data = { ...node.data, value: newText };
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
          <HvInput
            type="text"
            label="Name"
            placeholder="Enter text"
            value={inputText}
            onChange={handleInputChange}
            style={{ width: 200 }}
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

export default memo(TextNode);
