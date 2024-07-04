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
  args: { defaultOpen: true },
  argTypes: {
    classes: { control: { disable: true } },
    tabs: { control: { disable: true } },
    tab: { control: { disable: true } },
    labels: { control: { disable: true } },
    children: { control: { disable: true } },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: "100%",
          height: "100vh",
          backgroundColor: theme.colors.atmo2,
          margin: 0,
          padding: 0,
        }}
      >
        {Story()}
      </div>
    ),
  ],
  render: (args) => <HvCanvasPanel {...args}>Some content</HvCanvasPanel>,
};
