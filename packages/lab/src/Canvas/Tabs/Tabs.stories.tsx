import { Meta, StoryObj } from "@storybook/react";
import { Alert, Debug, Report } from "@hitachivantara/uikit-react-icons";
import {
  HvCanvasTabs,
  HvCanvasTabsProps,
} from "@hitachivantara/uikit-react-lab";

const meta: Meta<typeof HvCanvasTabs> = {
  title: "Lab/Canvas/Tabs",
  component: HvCanvasTabs,
};
export default meta;

const tabs = [
  {
    id: "1",
    content: (
      <>
        <Report />
        Tab 1
      </>
    ),
  },
  {
    id: "2",
    content: (
      <>
        <Alert />
        Tab 2
      </>
    ),
  },
  {
    id: "3",
    content: (
      <>
        <Debug />
        Tab 3
      </>
    ),
  },
];

export const Main: StoryObj<HvCanvasTabsProps> = {
  argTypes: {
    classes: { control: { disable: true } },
  },
  render: () => {
    return <HvCanvasTabs tabs={tabs} />;
  },
};
