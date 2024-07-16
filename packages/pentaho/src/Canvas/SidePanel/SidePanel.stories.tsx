import { Meta, StoryObj } from "@storybook/react";
import {
  HvCanvasSidePanel,
  HvCanvasSidePanelProps,
} from "@hitachivantara/uikit-react-pentaho";
import { theme } from "@hitachivantara/uikit-styles";

const meta: Meta<typeof HvCanvasSidePanel> = {
  title: "Pentaho/Canvas/Side Panel",
  component: HvCanvasSidePanel,
};
export default meta;

export const Main: StoryObj<HvCanvasSidePanelProps> = {
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
  render: (args) => (
    <HvCanvasSidePanel {...args}>Some content</HvCanvasSidePanel>
  ),
};
