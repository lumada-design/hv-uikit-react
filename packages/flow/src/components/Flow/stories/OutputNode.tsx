import { memo, useEffect } from "react";
import { Handle, Position, useStore } from "reactflow";
import {
  HvCard,
  HvCardContent,
  HvCardHeader,
  HvPanel,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import { HvNode, HvEdge, HvNodeProps } from "../../../types";
import {
  getNodesByType,
  getParentNodes,
  getIncomingEdgesCount,
} from "../utils";

const OutputNode = ({
  id,
  data,
  isConnectable,
  targetPosition = Position.Top,
}: HvNodeProps) => {
  const nodes: HvNode[] = useStore((state) => state.getNodes());
  const edges: HvEdge[] = useStore((state) => state.edges);

  useEffect(() => {
    data.acceptedNodes = ["textNode", "colorNode", "asyncNode"];
  }, [data]);

  const parentNodes = getParentNodes(nodes, edges, id);
  const connections = getIncomingEdgesCount(edges, id);

  let textNode;
  let colorNode;
  let backgroundColorNode;
  let asyncNode;

  if (parentNodes && parentNodes.length > 0) {
    [textNode] = getNodesByType(parentNodes, "textNode");
    [colorNode, backgroundColorNode] = getNodesByType(parentNodes, "colorNode");
    [asyncNode] = getNodesByType(parentNodes, "asyncNode");
  }

  const statusColor =
    connections === 0 ? "neutral" : connections === 3 ? "positive" : "negative";

  return (
    <>
      <Handle
        type="target"
        id="text"
        position={targetPosition}
        isConnectable={isConnectable}
        style={{ left: 40, right: "auto" }}
      />
      <Handle
        type="target"
        id="textColor"
        position={targetPosition}
        isConnectable={isConnectable}
        style={{ right: 100 }}
      />
      <Handle
        type="target"
        id="backgroundColor"
        position={targetPosition}
        isConnectable={isConnectable}
        style={{ left: 160 }}
      />
      <HvCard bgcolor="atmo1" statusColor={statusColor} style={{ width: 200 }}>
        <HvCardHeader title="Result" />
        <HvCardContent>
          <HvPanel
            style={{
              padding: 10,
              backgroundColor: backgroundColorNode?.data.value,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <div style={{ display: "flex", gap: 10 }}>
              <HvTypography variant="label">Name: </HvTypography>
              <span style={{ color: colorNode?.data.value }}>
                {textNode?.data?.value}
              </span>
            </div>
            <p>Async Data: {asyncNode?.data.value}</p>
          </HvPanel>
        </HvCardContent>
      </HvCard>
    </>
  );
};

export default memo(OutputNode);
