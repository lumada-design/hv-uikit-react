import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  HvActionBar,
  HvActionBarProps,
  HvButton,
  theme,
} from "@hitachivantara/uikit-react-core";

const meta: Meta<typeof HvActionBar> = {
  title: "Components/Action Bar",
  component: HvActionBar,
  decorators: [
    (Story) => (
      <div className="relative m-auto bg-bgContainer h-150px w-400px flex items-end">
        {Story()}
      </div>
    ),
  ],
};

export default meta;

export const Main: StoryObj<HvActionBarProps> = {
  argTypes: {
    classes: { control: { disable: true } },
  },
  render: () => (
    <HvActionBar style={{ gap: theme.space.xs }}>
      <HvButton variant="secondaryGhost">Help</HvButton>
      <div style={{ flex: 1 }} aria-hidden="true" />
      <HvButton variant="secondaryGhost">Save</HvButton>
      <HvButton variant="secondaryGhost">Cancel</HvButton>
    </HvActionBar>
  ),
};
