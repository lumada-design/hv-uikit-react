import { memo, useState } from "react";
import { Handle, Position, useReactFlow } from "reactflow";
import {
  HvCard,
  HvCardContent,
  HvCardHeader,
  HvButton,
  HvTypography,
  HvLoading,
} from "@hitachivantara/uikit-react-core";
import { HvNodeProps } from "../../../types";

const AsyncNode = ({
  id,
  data,
  isConnectable,
  sourcePosition = Position.Bottom,
}: HvNodeProps) => {
  const reactFlowInstance = useReactFlow();
  const [isLoading, setIsLoading] = useState(false);
  const [asyncData, setAsyncData] = useState("");

  const simulateAsyncDataFetching = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Async data fetch result");
      }, 3000);
    });
  };

  const handleClick = async () => {
    setIsLoading(true);

    try {
      const simulatedData = (await simulateAsyncDataFetching()) as string;
      setAsyncData(simulatedData);

      const nodes = reactFlowInstance.getNodes();
      const newNodes = nodes.map((node) => {
        if (node.id === id) {
          node.data = { ...node.data, value: simulatedData };
        }
        return node;
      });
      reactFlowInstance.setNodes(newNodes);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <HvCard bgcolor="atmo1" statusColor={data.status ?? "neutral"}>
        <HvCardHeader title={data.label} />
        <HvCardContent>
          {!isLoading && (
            <HvButton onClick={handleClick}>Get async data</HvButton>
          )}
          {isLoading && <HvLoading label="Fetching data..." />}
          <HvTypography>{asyncData}</HvTypography>
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

export default memo(AsyncNode);
