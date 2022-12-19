import { Meta, StoryObj } from "@storybook/react";

import { Typography } from "components";
import { Footer, FooterProps } from "./Footer";

const meta: Meta<typeof Footer> = {
  title: "Structure/Footer",
  component: Footer,
};
export default meta;

export const Main: StoryObj<FooterProps> = {
  args: {},
  argTypes: {
    classes: { control: { disable: true } },
  },
  render: (args) => {
    return <Footer {...args} />;
  },
};

export const CustomLabels: StoryObj<FooterProps> = {
  args: {
    name: "Hitachi Vantara",
    copyright: "© Hitachi Vantara Corporation 2022",
    links: (
      <Typography variant="label" style={{ color: "#2064B4" }}>
        <a href="https://www.hitachivantara.com" target="_blank">
          License information
        </a>
      </Typography>
    ),
  },
  argTypes: {
    classes: { control: { disable: true } },
  },
  render: (args) => {
    return <Footer {...args} />;
  },
};
