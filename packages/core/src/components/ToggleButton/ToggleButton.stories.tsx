import styled from "@emotion/styled";
import {
  BackwardsEmpty,
  BackwardsSelected,
  Dislike,
  DislikeSelected,
  DownEmpty,
  DownSelected,
  Favorite,
  FavoriteSelected,
  ForwardsEmpty,
  ForwardsSelected,
  LightOff,
  LightOn,
  Like,
  LikeSelected,
  Lock,
  Unlock,
  UpEmpty,
  UpSelected,
} from "@hitachivantara/uikit-icons";
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Eye from "./Eye";
import { ToggleButton, ToggleButtonProps } from "./ToggleButton";

const FlexDecorator = ({ children }) => {
  const StyledRoot = styled("div")({
    display: "flex",
    alignItems: "end",
    flexWrap: "wrap",
    "& > *": {
      margin: "0 10px 5px 0",
    },
  });

  return <StyledRoot>{children}</StyledRoot>;
};

const meta: Meta<typeof ToggleButton> = {
  title: "Inputs/ToggleButton",
  component: ToggleButton,
  decorators: [
    (Story) => (
      <FlexDecorator>
        <Story />
      </FlexDecorator>
    ),
  ],
};
export default meta;

export const Main: StoryObj<ToggleButtonProps> = {
  args: {
    defaultSelected: false,
    selected: false,
    notSelectedIcon: <Favorite />,
    selectedIcon: <FavoriteSelected />,
  },
  argTypes: {
    onClick: { control: { disable: true } },
    selectedIcon: { control: { disable: true } },
    notSelectedIcon: { control: { disable: true } },
  },
  decorators: [
    (Story) => (
      <FlexDecorator>
        <Story />
      </FlexDecorator>
    ),
  ],
  render: (args) => {
    return <ToggleButton {...args} />;
  },
};

export const Multiple: StoryObj<ToggleButtonProps> = {
  parameters: {
    docs: {
      description: {
        story: "Showcasing multiple samples of the Toggle Button.",
      },
    },
  },
  render: () => {
    return (
      <>
        <ToggleButton
          defaultSelected
          aria-label="Favorite"
          notSelectedIcon={<Favorite />}
          selectedIcon={<FavoriteSelected />}
        />
        <ToggleButton
          aria-label="Backwards"
          notSelectedIcon={<BackwardsEmpty />}
          selectedIcon={<BackwardsSelected />}
        />
        <ToggleButton
          aria-label="Up"
          notSelectedIcon={<UpEmpty />}
          selectedIcon={<UpSelected />}
        />
        <ToggleButton
          disabled
          aria-label="Down"
          notSelectedIcon={<DownEmpty />}
          selectedIcon={<DownSelected />}
        />
        <ToggleButton
          aria-label="Forward"
          notSelectedIcon={<ForwardsEmpty />}
          selectedIcon={<ForwardsSelected />}
        />
        <ToggleButton
          aria-label="Like"
          notSelectedIcon={<Like />}
          selectedIcon={<LikeSelected />}
        />
        <ToggleButton
          aria-label="Dislike"
          notSelectedIcon={<Dislike />}
          selectedIcon={<DislikeSelected />}
        />
        <ToggleButton
          aria-label="Light"
          notSelectedIcon={<LightOff />}
          selectedIcon={<LightOn />}
        />
        <ToggleButton
          aria-label="Lock"
          notSelectedIcon={<Unlock />}
          selectedIcon={<Lock />}
        />
      </>
    );
  },
};

export const Disabled: StoryObj<ToggleButtonProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "A sample showcasing a disabled toggle button combined with a tooltip. There is a known limitation with the Button Forward ref, but adding a div around the Tooltip fixes it temporarily.",
      },
    },
  },
  render: () => {
    // TODO: Add Tooltip
    return (
      <>
        <ToggleButton disabled aria-label="Light">
          <LightOff />
        </ToggleButton>
      </>
    );
  },
};

export const Animated: StoryObj<ToggleButtonProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "A sample showcasing a toggle button with a custom animated icon.",
      },
    },
  },
  render: () => {
    const [select, setSelect] = useState(true);

    const toggleState = () => setSelect(!select);

    return (
      <ToggleButton selected={select} onClick={toggleState} aria-label="Eye">
        <Eye className={select ? "selected" : "notSelected"} />
      </ToggleButton>
    );
  },
};
