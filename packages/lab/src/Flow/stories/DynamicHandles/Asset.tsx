import { useEffect, useMemo, useRef } from "react";
import {
  HvFlowNode,
  HvFlowNodeFC,
  HvFlowNodeInput,
  HvFlowNodeOutput,
  HvFlowNodeTypeMeta,
  useFlowInstance,
  useFlowNodeUtils,
} from "@hitachivantara/uikit-react-lab";

import type { NodeGroup } from ".";

// Inputs and outputs info
export const types = {
  type1: {
    label: "Type 1",
    inputs: [
      {
        label: "Data",
        isMandatory: true,
        accepts: ["data1", "data2", "data3"],
        maxConnections: 1,
      },
    ],
    outputs: [],
  },
  type2: {
    label: "Type 2",
    outputs: [
      {
        label: "Data 3",
        provides: "data3",
      },
    ],
    inputs: [],
  },
  type3: {
    label: "Type 3",
    outputs: [
      {
        label: "Data 1",
        provides: "data1",
      },
      {
        label: "Data 2",
        provides: "data2",
      },
    ],
    inputs: [],
  },
};

// Node data type
export interface NodeData {
  type?: string;
  inputs?: HvFlowNodeInput[];
  outputs?: HvFlowNodeOutput[];
}

export const Asset: HvFlowNodeFC<NodeGroup, NodeData> = (props) => {
  const { data, id } = props;

  const curType = useRef(data.type);

  const reactFlowInstance = useFlowInstance();

  const { setNodeData } = useFlowNodeUtils();

  useEffect(() => {
    if (data.type !== curType.current) {
      // Update type
      curType.current = data.type;

      // Update inputs and outputs for the node
      setNodeData((prev) => ({ ...prev, ...types[prev.type] }));

      // Clean up the edges for this node since the inputs and outputs changed
      reactFlowInstance?.setEdges((eds) =>
        eds.filter((ed) => ed.source !== id && ed.target !== id),
      );
    }
  }, [data.type, id, reactFlowInstance, setNodeData]);

  const inputs = useMemo(() => data.inputs, [data.inputs]);

  const outputs = useMemo(() => data.outputs, [data.outputs]);

  return (
    <HvFlowNode
      params={[
        {
          id: "type",
          label: "Type",
          type: "select",
          options: Object.entries(types).map(([key, { label }]) => ({
            id: key,
            label,
          })),
        },
      ]}
      inputs={inputs}
      outputs={outputs}
      expanded
      {...props}
    />
  );
};

Asset.meta = {
  label: "Asset",
  groupId: "assets",
} satisfies HvFlowNodeTypeMeta<NodeGroup>;
