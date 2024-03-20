import { Meta, StoryObj } from "@storybook/react";
import {
  HvFooter,
  HvFooterProps,
  HvTypography,
} from "@hitachivantara/uikit-react-core";

const meta: Meta<typeof HvFooter> = {
  title: "Widgets/Footer",
  component: HvFooter,
};
export default meta;

export const Main: StoryObj<HvFooterProps> = {
  args: {
    name: "Hitachi Vantara",
    copyright: "© Hitachi Vantara Corporation 2022",
  },
  argTypes: {
    classes: { control: { disable: true } },
    links: { control: { disable: true } },
  },
  parameters: {
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
  },
  render: (args) => {
    return <HvFooter {...args} />;
  },
};

export const CustomLabels: StoryObj<HvFooterProps> = {
  args: {
    name: "Hitachi Vantara",
    copyright: "© Hitachi Vantara Corporation 2022",
    links: (
      <HvTypography
        variant="label"
        style={{ color: "#2064B4" }}
        component="a"
        href="https://www.hitachivantara.com"
        target="_blank"
        rel="noreferrer"
      >
        License information
      </HvTypography>
    ),
  },
  argTypes: {
    classes: { control: { disable: true } },
  },
  parameters: {
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
  },
  render: (args) => {
    return <HvFooter {...args} />;
  },
};
