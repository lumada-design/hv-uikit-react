import styled from "@emotion/styled";
import { Close, Edit } from "@hitachivantara/uikit-react-icons";
import { Meta, StoryObj } from "@storybook/react";
import {
  HvButton,
  HvPanel,
  HvPanelProps,
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
      <HvPanel style={{ width: "400px", height: "400px" }}>
        <div style={{ height: 600, backgroundColor: theme.colors.atmo4 }}>
          &nbsp;
        </div>
      </HvPanel>
    );
  },
};

const StyledButton = styled(HvButton)({
  position: "absolute",
  top: theme.space.sm,
  right: theme.space.sm,
  width: "32px",
  height: "32px",
});

export const FullWidth: StoryObj<HvPanelProps> = {
  render: () => {
    return (
      <HvPanel style={{ width: "100%", height: "200px" }}>
        <HvTypography>Panel Content</HvTypography>
        <StyledButton icon aria-label="Edit" variant="secondaryGhost">
          <Edit />
        </StyledButton>
      </HvPanel>
    );
  },
};

const CloseButton = styled(HvButton)({
  position: "absolute",
  top: theme.space.sm,
  right: theme.space.sm,
  width: "32px",
  height: "32px",
});

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
          <CloseButton icon aria-label="Close" variant="secondaryGhost">
            <Close />
          </CloseButton>
        </HvPanel>
      </Overlay>
    );
  },
};
