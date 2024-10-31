import { Handle, Position } from "reactflow";
import { HvFlowNodeFC } from "@hitachivantara/uikit-react-lab";
import { theme } from "@hitachivantara/uikit-styles";

interface SimpleNodeData {
  nodeLabel: string;
  id: string;
  handleSource: any;
  handleTarget: any;
}

export const SimpleNode: HvFlowNodeFC<SimpleNodeData> = ({ id, data }) => {
  return (
    <>
      <div
        style={{
          width: 150,
          height: 75,
          backgroundColor:
            data.id === "parent" ? theme.colors.cat1_80 : theme.colors.cat2_80,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {id}
      </div>
      {data.id === "parent" && (
        <>
          <Handle type="source" id="top" position={Position.Top} />
          <Handle type="source" id="bottom" position={Position.Bottom} />
          <Handle type="source" id="left" position={Position.Left} />
          <Handle type="source" id="right" position={Position.Right} />
        </>
      )}
      {data.id !== "parent" && (
        <>
          <Handle type="target" id="left" position={Position.Left} />
          <Handle type="target" id="right" position={Position.Right} />
        </>
      )}
    </>
  );
};
