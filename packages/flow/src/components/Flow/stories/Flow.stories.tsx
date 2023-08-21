import { Meta, StoryObj } from "@storybook/react";
import {
  HvFlow,
  HvNode,
  HvNodeTypes,
  HvEdge,
} from "@hitachivantara/uikit-react-flow";
import { HvFlowProps } from "../Flow";
import OutputNode from "./OutputNode";
import TextNode from "./TextNode";
import ColorNode from "./ColorNode";
import VariantNode from "./VariantNode";
import AsyncNode from "./AsyncNode";

const meta: Meta<typeof HvFlow> = {
  title: "Widgets/Flow",
  component: HvFlow,
  parameters: { eyes: { include: false } },
  decorators: [
    (Story) => (
      <div
        style={{
          height: "100vh",
          padding: 0,
        }}
      >
        {Story()}
      </div>
    ),
  ],
};
export default meta;

const nodes: HvNode[] = [
  // {
  //   id: "1",
  //   width: 200,
  //   position: { x: -300, y: 50 },
  //   data: { label: "Text", status: "negative" },
  //   type: "textNode",
  // },
  // {
  //   id: "2",
  //   position: { x: 0, y: 0 },
  //   data: { label: "Text Color", status: "warning" },
  //   type: "colorNode",
  // },
  // {
  //   id: "3",
  //   position: { x: 200, y: 100 },
  //   data: { label: "Background Color", status: "warning" },
  //   type: "colorNode",
  // },
  // {
  //   id: "4",
  //   width: 200,
  //   position: { x: -20, y: 250 },
  //   data: {
  //     label: "Colored Text",
  //     acceptedNodes: ["textNode", "colorNode", "asyncNode"],
  //   },
  //   type: "outputNode",
  // },
];
const edges: HvEdge[] = [
  // {
  //   id: "e1-3",
  //   source: "1",
  //   target: "4",
  //   animated: true,
  //   targetHandle: "text",
  // },
  // {
  //   id: "e2-3",
  //   source: "2",
  //   target: "4",
  //   animated: true,
  //   targetHandle: "textColor",
  // },
];
const nodesTypes: HvNodeTypes = {
  textNode: TextNode,
  outputNode: OutputNode,
  colorNode: ColorNode,
  variantNode: VariantNode,
  asyncNode: AsyncNode,
};

export const Main: StoryObj<HvFlowProps> = {
  args: {
    nodes,
    edges,
  },
  render: (args) => <HvFlow nodesTypes={nodesTypes} {...args} />,
};
