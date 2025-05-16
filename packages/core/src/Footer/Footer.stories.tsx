import type { Meta, StoryObj } from "@storybook/react";
import {
  HvFooter,
  HvFooterProps,
  HvTypography,
} from "@hitachivantara/uikit-react-core";

const meta: Meta<typeof HvFooter> = {
  title: "Components/Footer",
  component: HvFooter,
};
export default meta;

export const Main: StoryObj<HvFooterProps> = {
  args: {},
  argTypes: {
    classes: { control: { disable: true } },
    links: { control: { disable: true } },
  },
  render: (args) => {
    return <HvFooter {...args} />;
  },
};

export const CustomLabels: StoryObj<HvFooterProps> = {
  args: {
    links: (
      <HvTypography
        link
        variant="label"
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
  render: (args) => {
    return <HvFooter {...args} />;
  },
};
