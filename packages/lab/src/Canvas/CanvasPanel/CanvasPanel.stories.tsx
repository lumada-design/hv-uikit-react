import { Meta, StoryObj } from "@storybook/react";
import {
  HvCanvasPanel,
  HvCanvasPanelProps,
} from "@hitachivantara/uikit-react-lab";
import { theme } from "@hitachivantara/uikit-styles";

const meta: Meta<typeof HvCanvasPanel> = {
  title: "Lab/Canvas/Panel",
  component: HvCanvasPanel,
};
export default meta;

export const Main: StoryObj<HvCanvasPanelProps> = {
  args: {},
  argTypes: {
    classes: { control: { disable: true } },
  },
  render: (args) => {
    return (
      <div
        style={{
          width: "100vh",
          height: "100vh",
          backgroundColor: theme.palette.slate[950],
          margin: 0,
          padding: 0,
        }}
      >
        <HvCanvasPanel defaultOpened {...args}>
          Some content
        </HvCanvasPanel>
      </div>
    );
  },
};
