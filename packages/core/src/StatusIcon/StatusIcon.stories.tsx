import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  HvStatusIcon,
  HvStatusIconProps,
} from "@hitachivantara/uikit-react-core";

const meta: Meta<typeof HvStatusIcon> = {
  title: "Components/Status Icon",
  component: HvStatusIcon,
};
export default meta;

export const Main: StoryObj<HvStatusIconProps> = {
  args: {
    variant: "info",
    size: "sm",
    type: "full",
  },
  argTypes: {
    classes: { control: { disable: true } },
  },
};

export const Test: StoryObj = {
  decorators: [
    (Story) => <div className="flex flex-col gap-xs">{Story()}</div>,
  ],
  render: () => (
    <>
      <div className="flex items-start gap-sm">
        <HvStatusIcon variant="success" />
        <HvStatusIcon variant="warning" />
        <HvStatusIcon variant="error" />
        <HvStatusIcon variant="info" />
        <HvStatusIcon
          variant="accent"
          customIcon={<div className="i-ph-tree-structure" />}
        />
        <HvStatusIcon variant="accent" />
        <HvStatusIcon
          variant="default"
          customIcon={<div className="i-ph-tree-structure" />}
        />
        <HvStatusIcon variant="default" />
        <HvStatusIcon type="simple" variant="success" />
      </div>
      <div className="flex items-start gap-sm">
        <HvStatusIcon variant="success" size="xs" />
        <HvStatusIcon variant="success" size="sm" />
        <HvStatusIcon variant="success" size="md" />
        <HvStatusIcon variant="success" size="lg" />
        <HvStatusIcon variant="success" size="xl" />
      </div>
    </>
  ),
};
