import styled from "@emotion/styled";
import { Close, Edit } from "@hitachivantara/uikit-react-icons";
import { Meta, StoryObj } from "@storybook/react";
import {
  HvButton,
  HvPanel,
  HvPanelProps,
  HvTooltip,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";

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
    return (
      <HvPanel style={{ width: 400, height: 400 }}>
        <div style={{ height: 600, backgroundColor: theme.colors.atmo4 }} />
      </HvPanel>
    );
  },
};

const CornerButton = styled(HvButton)({
  position: "absolute",
  top: theme.space.sm,
  right: theme.space.sm,
});

export const FullWidth: StoryObj<HvPanelProps> = {
  render: () => {
    return (
      <HvPanel style={{ width: "100%", height: "200px" }}>
        <HvTypography>Panel Content</HvTypography>
        <HvTooltip title="Edit">
          <CornerButton icon>
            <Edit />
          </CornerButton>
        </HvTooltip>
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
          <HvTooltip title="Close">
            <CornerButton icon>
              <Close />
            </CornerButton>
          </HvTooltip>
        </HvPanel>
      </Overlay>
    );
  },
};
