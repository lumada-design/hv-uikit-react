import { Meta, StoryObj } from "@storybook/react";
import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";

import { HvButton, HvActionBar, HvActionBarProps } from "components";

// Common styles
const StyledContainer = styled("div")({
  position: "relative",
  margin: "auto",
  backgroundColor: theme.colors.atmo1,
  height: "150px",
  width: "400px",
});

const StyledSpace = styled("div")({
  flex: 1,
});

const StyledActionBar = styled(HvActionBar)({
  position: "absolute",
  bottom: "0",
});

const StyledButtonSeparator = styled(HvButton)({
  marginRight: theme.spacing(1),
});

const meta: Meta<typeof HvActionBar> = {
  title: "Structure/ActionBar",
  component: HvActionBar,
};

export default meta;

export const Main: StoryObj<HvActionBarProps> = {
  args: {},
  argTypes: {
    classes: { control: { disable: true } },
  },
  render: () => {
    return (
      <StyledContainer>
        <StyledActionBar>
          <HvButton
            variant="secondaryGhost"
            onClick={() => console.log("Help action")}
          >
            Help
          </HvButton>
          <StyledSpace aria-hidden="true">&nbsp;</StyledSpace>
          <StyledButtonSeparator
            variant="secondaryGhost"
            onClick={() => console.log("Save action")}
          >
            Save
          </StyledButtonSeparator>
          <HvButton
            variant="secondaryGhost"
            onClick={() => console.log("Cancel action")}
          >
            Cancel
          </HvButton>
        </StyledActionBar>
      </StyledContainer>
    );
  },
};

export const DualAction: StoryObj<HvActionBarProps> = {
  args: {},
  argTypes: {
    classes: { control: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: "Showcasing the action bar pattern with only two actions.",
      },
    },
  },
  render: () => {
    return (
      <StyledContainer>
        <StyledActionBar>
          <StyledButtonSeparator
            variant="secondaryGhost"
            onClick={() => console.log("Save action")}
          >
            Save
          </StyledButtonSeparator>
          <HvButton
            variant="secondaryGhost"
            onClick={() => console.log("Cancel action")}
          >
            Cancel
          </HvButton>
        </StyledActionBar>
      </StyledContainer>
    );
  },
};