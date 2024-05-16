import styled from "@emotion/styled";
import { Meta, StoryObj } from "@storybook/react";
import {
  HvIconButton,
  HvPanel,
  HvPanelProps,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";
import { Close, Edit } from "@hitachivantara/uikit-react-icons";

const meta: Meta<typeof HvPanel> = {
  title: "Components/Panel",
  component: HvPanel,
};
export default meta;

export const Main: StoryObj<HvPanelProps> = {
  argTypes: {
    classes: { control: { disable: true } },
  },
  parameters: {
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
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
    return (
      <HvPanel style={{ width: 400, height: 400 }}>
        <div style={{ height: 600, backgroundColor: theme.colors.atmo4 }} />
      </HvPanel>
    );
  },
};

export const FullWidth: StoryObj<HvPanelProps> = {
  parameters: {
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
  },
  render: () => {
    return (
      <HvPanel style={{ width: "100%", height: "200px" }}>
        <HvTypography>Panel Content</HvTypography>
        <HvIconButton
          title="Edit"
          style={{
            position: "absolute",
            top: theme.space.sm,
            right: theme.space.sm,
          }}
        >
          <Edit />
        </HvIconButton>
      </HvPanel>
    );
  },
};

const Overlay = styled("div")({
  backgroundColor: theme.colors.atmo3,
  opacity: 0.8,
  width: "100%",
  padding: theme.space.md,
});

export const Modal: StoryObj<HvPanelProps> = {
  render: () => {
    return (
      <Overlay>
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
      </Overlay>
    );
  },
};
