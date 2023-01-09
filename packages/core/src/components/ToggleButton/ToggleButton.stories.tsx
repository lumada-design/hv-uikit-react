import { useState } from "react";
import styled from "@emotion/styled";
import { Meta, StoryObj } from "@storybook/react";
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
import { HvToggleButton, HvToggleButtonProps } from "components";
import { ToggleEye } from "./ToggleEye";

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

const meta: Meta<typeof HvToggleButton> = {
  title: "Inputs/ToggleButton",
  component: HvToggleButton,
  decorators: [
    (Story) => (
      <FlexDecorator>
        <Story />
      </FlexDecorator>
    ),
  ],
};
export default meta;

export const Main: StoryObj<HvToggleButtonProps> = {
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
    return <HvToggleButton {...args} />;
  },
};

export const Multiple: StoryObj<HvToggleButtonProps> = {
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
        <HvToggleButton
          defaultSelected
          aria-label="Favorite"
          notSelectedIcon={<Favorite />}
          selectedIcon={<FavoriteSelected />}
        />
        <HvToggleButton
          aria-label="Backwards"
          notSelectedIcon={<BackwardsEmpty />}
          selectedIcon={<BackwardsSelected />}
        />
        <HvToggleButton
          aria-label="Up"
          notSelectedIcon={<UpEmpty />}
          selectedIcon={<UpSelected />}
        />
        <HvToggleButton
          // @ts-ignore
          disabled
          aria-label="Down"
          notSelectedIcon={<DownEmpty />}
          selectedIcon={<DownSelected />}
        />
        <HvToggleButton
          aria-label="Forward"
          notSelectedIcon={<ForwardsEmpty />}
          selectedIcon={<ForwardsSelected />}
        />
        <HvToggleButton
          aria-label="Like"
          notSelectedIcon={<Like />}
          selectedIcon={<LikeSelected />}
        />
        <HvToggleButton
          aria-label="Dislike"
          notSelectedIcon={<Dislike />}
          selectedIcon={<DislikeSelected />}
        />
        <HvToggleButton
          aria-label="Light"
          notSelectedIcon={<LightOff />}
          selectedIcon={<LightOn />}
        />
        <HvToggleButton
          aria-label="Lock"
          notSelectedIcon={<Unlock />}
          selectedIcon={<Lock />}
        />
      </>
    );
  },
};

export const Disabled: StoryObj<HvToggleButtonProps> = {
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
        {/* @ts-ignore */}
        <HvToggleButton disabled aria-label="Light">
          <LightOff />
        </HvToggleButton>
      </>
    );
  },
};

export const Animated: StoryObj<HvToggleButtonProps> = {
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
      <HvToggleButton selected={select} onClick={toggleState} aria-label="Eye">
        <ToggleEye className={select ? "selected" : "notSelected"} />
      </HvToggleButton>
    );
  },
};
