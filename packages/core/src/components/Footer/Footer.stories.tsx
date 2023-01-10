import { Meta, StoryObj } from "@storybook/react";
import { HvTypography, HvFooter, HvFooterProps } from "components";

const meta: Meta<typeof HvFooter> = {
  title: "Structure/Footer",
  component: HvFooter,
};
export default meta;

export const Main: StoryObj<HvFooterProps> = {
  args: {},
  argTypes: {
    classes: { control: { disable: true } },
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
      <HvTypography variant="label" style={{ color: "#2064B4" }}>
        <a href="https://www.hitachivantara.com" target="_blank">
          License information
        </a>
      </HvTypography>
    ),
  },
  argTypes: {
    classes: { control: { disable: true } },
  },
  render: (args) => {
    return <HvFooter {...args} />;
  },
};
