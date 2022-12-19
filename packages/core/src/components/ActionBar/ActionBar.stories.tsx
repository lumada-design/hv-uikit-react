import { Meta, StoryObj } from "@storybook/react";
import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";

import { Button } from "components";
import { ActionBar, ActionBarProps } from "./ActionBar";

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

const StyledActionBar = styled(ActionBar)({
  position: "absolute",
  bottom: "0",
});

const StyledButtonSeparator = styled(Button)({
  marginRight: theme.spacing(1),
});

const meta: Meta<typeof ActionBar> = {
  title: "Structure/ActionBar",
  component: ActionBar,
};

export default meta;

export const Main: StoryObj<ActionBarProps> = {
  args: {},
  argTypes: {
    classes: { control: { disable: true } },
  },
  render: () => {
    return (
      <StyledContainer>
        <StyledActionBar>
          <Button
            variant="secondaryGhost"
            onClick={() => console.log("Help action")}
          >
            Help
          </Button>
          <StyledSpace aria-hidden="true">&nbsp;</StyledSpace>
          <StyledButtonSeparator
            variant="secondaryGhost"
            onClick={() => console.log("Save action")}
          >
            Save
          </StyledButtonSeparator>
          <Button
            variant="secondaryGhost"
            onClick={() => console.log("Cancel action")}
          >
            Cancel
          </Button>
        </StyledActionBar>
      </StyledContainer>
    );
  },
};

export const DualAction: StoryObj<ActionBarProps> = {
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
          <Button
            variant="secondaryGhost"
            onClick={() => console.log("Cancel action")}
          >
            Cancel
          </Button>
        </StyledActionBar>
      </StyledContainer>
    );
  },
};
