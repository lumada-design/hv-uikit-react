import type { Meta, StoryObj } from "@storybook/react";
import {
  HvIconButton,
  HvPanel,
  HvPanelProps,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";
import { Close } from "@hitachivantara/uikit-react-icons";

const meta: Meta<typeof HvPanel> = {
  title: "Components/Panel",
  component: HvPanel,
};
export default meta;

export const Main: StoryObj<HvPanelProps> = {
  argTypes: {
    classes: { control: { disable: true } },
  },
  render: () => {
    return (
      <HvPanel>
        <HvTypography>Panel Content</HvTypography>
      </HvPanel>
    );
  },
};

export const WithScroll: StoryObj<HvPanelProps> = {
  render: () => {
    const chars = "abcdefghijklmnopqrstuvwxyz";

    return (
      <HvPanel className="w-[300px] h-[300px] overflow-auto p-4" tabIndex={0}>
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i}>
            {i === 0 ? chars : `Line ${i}: ${chars[i % chars.length]}`}
          </div>
        ))}
      </HvPanel>
    );
  },
};

export const Modal: StoryObj<HvPanelProps> = {
  render: () => {
    return (
      <HvPanel
        style={{
          width: "100%",
          height: "200px",
          boxShadow: theme.colors.shadow,
        }}
      >
        <HvTypography>Panel Content</HvTypography>
        <HvIconButton
          title="Close"
          style={{
            position: "absolute",
            top: theme.space.sm,
            right: theme.space.sm,
          }}
        >
          <Close />
        </HvIconButton>
      </HvPanel>
    );
  },
};
