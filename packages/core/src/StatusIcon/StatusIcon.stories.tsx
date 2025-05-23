import type { Meta, StoryObj } from "@storybook/react";
import {
  HvStatusIcon,
  HvStatusIconProps,
  theme,
} from "@hitachivantara/uikit-react-core";
import { Asterisk } from "@hitachivantara/uikit-react-icons";

const meta: Meta<typeof HvStatusIcon> = {
  title: "Components/StatusIcon",
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
  render: () => (
    <div className="flex flex-col gap-xs">
      <div style={{ display: "flex", gap: theme.space.sm }}>
        <HvStatusIcon variant="success" />
        <HvStatusIcon variant="warning" />
        <HvStatusIcon variant="error" />
        <HvStatusIcon variant="info" />
        <HvStatusIcon variant="accent" customIcon={<Asterisk />} />
        <HvStatusIcon variant="accent" />
        <HvStatusIcon variant="default" customIcon={<Asterisk />} />
        <HvStatusIcon variant="default" />
      </div>
      <div style={{ display: "flex", gap: theme.space.sm }}>
        <HvStatusIcon type="simple" variant="success" />
        <HvStatusIcon type="simple" variant="warning" />
        <HvStatusIcon type="simple" variant="error" />
        <HvStatusIcon type="simple" variant="info" />
        <HvStatusIcon
          type="simple"
          variant="accent"
          customIcon={<Asterisk />}
        />
        <HvStatusIcon type="simple" variant="accent" />
        <HvStatusIcon
          type="simple"
          variant="default"
          customIcon={<Asterisk />}
        />
        <HvStatusIcon type="simple" variant="default" />
      </div>
      <div style={{ display: "flex", gap: theme.space.sm }}>
        <HvStatusIcon variant="success" size="xs" />
        <HvStatusIcon variant="success" size="sm" />
        <HvStatusIcon variant="success" size="md" />
        <HvStatusIcon variant="success" size="lg" />
        <HvStatusIcon variant="success" size="xl" />
      </div>
    </div>
  ),
};
