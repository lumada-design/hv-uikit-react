import { css } from "@emotion/css";
import { Decorator, Meta, StoryObj } from "@storybook/react";
import {
  HvActionBar,
  HvActionBarProps,
  HvButton,
  theme,
} from "@hitachivantara/uikit-react-core";

const containerDecorator: Decorator = (Story) => (
  <div
    className={css({
      position: "relative",
      margin: "auto",
      backgroundColor: theme.colors.atmo1,
      height: "150px",
      width: "400px",
      display: "flex",
      alignItems: "flex-end",
    })}
  >
    {Story()}
  </div>
);

const meta: Meta<typeof HvActionBar> = {
  title: "Widgets/Action Bar",
  component: HvActionBar,
  decorators: [containerDecorator],
};

export default meta;

export const Main: StoryObj<HvActionBarProps> = {
  argTypes: {
    classes: { control: { disable: true } },
  },
  parameters: {
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: true },
  },
  render: () => {
    return (
      <HvActionBar className={css({ gap: theme.space.xs })}>
        <HvButton variant="secondaryGhost">Help</HvButton>
        <div style={{ flex: 1 }} aria-hidden="true">
          &nbsp;
        </div>
        <HvButton variant="secondaryGhost">Save</HvButton>
        <HvButton variant="secondaryGhost">Cancel</HvButton>
      </HvActionBar>
    );
  },
};

export const DualAction: StoryObj<HvActionBarProps> = {
  parameters: {
    docs: {
      description: {
        story: "Showcasing the action bar pattern with only two actions.",
      },
    },
  },
  render: () => {
    return (
      <HvActionBar className={css({ gap: theme.space.xs })}>
        <HvButton variant="secondaryGhost">Save</HvButton>
        <HvButton variant="secondaryGhost">Cancel</HvButton>
      </HvActionBar>
    );
  },
};
