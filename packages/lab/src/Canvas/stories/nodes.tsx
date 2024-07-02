import { Handle, Position } from "reactflow";
import { HvFlowProps } from "@hitachivantara/uikit-react-lab";
import { theme } from "@hitachivantara/uikit-styles";

const Node = (props) => (
  <>
    <div
      style={{
        backgroundColor: theme.colors.atmo1,
        border: `1px solid ${theme.colors.atmo3}`,
        borderRadius: theme.radii.round,
        padding: theme.space.md,
      }}
    >
      {props?.data.label}
    </div>
    <Handle type="source" position={Position.Right} />
    <Handle type="target" position={Position.Left} />
  </>
);

export const nodeTypes = {
  node: Node,
} satisfies HvFlowProps["nodeTypes"];

export const nds = [
  {
    id: "1",
    type: "node",
    data: { label: "Node 1" },
    position: { x: 550, y: 250 },
  },
  {
    id: "2",
    type: "node",
    data: { label: "Node 2" },
    position: { x: 400, y: 400 },
  },
  {
    id: "3",
    type: "node",
    data: { label: "Node 3" },
    position: { x: 700, y: 400 },
  },
];

export const eds = [
  {
    id: "1-2",
    source: "1",
    sourceHandle: "0",
    target: "2",
    targetHandle: "0",
  },
  {
    id: "2-3",
    source: "2",
    sourceHandle: "0",
    target: "3",
    targetHandle: "0",
  },
];
