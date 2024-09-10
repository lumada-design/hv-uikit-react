import { useState } from "react";
import { Decorator, Meta, StoryObj } from "@storybook/react";
import {
  HvToggleButton,
  HvToggleButtonProps,
  HvTooltip,
} from "@hitachivantara/uikit-react-core";
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
} from "@hitachivantara/uikit-react-icons";

import { ToggleEye } from "./ToggleEye";

const flexDecorator: Decorator = (Story) => (
  <div style={{ display: "flex", alignItems: "end", flexWrap: "wrap" }}>
    {Story()}
  </div>
);

const meta: Meta<typeof HvToggleButton> = {
  title: "Components/Toggle Button",
  component: HvToggleButton,
  decorators: [flexDecorator],
};
export default meta;

export const Main: StoryObj<HvToggleButtonProps> = {
  args: {
    defaultSelected: false,
    disabled: false,
    notSelectedIcon: <Favorite />,
    selectedIcon: <FavoriteSelected />,
  },
  argTypes: {
    onClick: { control: { disable: true } },
    selectedIcon: { control: { disable: true } },
    notSelectedIcon: { control: { disable: true } },
  },
  render: (args) => {
    return <HvToggleButton aria-label="Favorite" {...args} />;
  },
};

export const Multiple: StoryObj<HvToggleButtonProps> = {
  parameters: {
    docs: {
      description: {
        story: "Showcasing multiple samples of the Toggle Button.",
      },
    },
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: true },
  },
  render: () => {
    return (
      <>
        <HvToggleButton
          defaultSelected
          aria-label="Favorite"
          notSelectedIcon={<Favorite />}
          selectedIcon={<FavoriteSelected />}
          style={{ margin: "0 10px 5px 0" }}
        />
        <HvToggleButton
          aria-label="Backwards"
          notSelectedIcon={<BackwardsEmpty />}
          selectedIcon={<BackwardsSelected />}
          style={{ margin: "0 10px 5px 0" }}
        />
        <HvToggleButton
          aria-label="Up"
          notSelectedIcon={<UpEmpty />}
          selectedIcon={<UpSelected />}
          style={{ margin: "0 10px 5px 0" }}
        />
        <HvToggleButton
          disabled
          aria-label="Down"
          notSelectedIcon={<DownEmpty />}
          selectedIcon={<DownSelected />}
          style={{ margin: "0 10px 5px 0" }}
        />
        <HvToggleButton
          aria-label="Forward"
          notSelectedIcon={<ForwardsEmpty />}
          selectedIcon={<ForwardsSelected />}
          style={{ margin: "0 10px 5px 0" }}
        />
        <HvToggleButton
          aria-label="Like"
          notSelectedIcon={<Like />}
          selectedIcon={<LikeSelected />}
          style={{ margin: "0 10px 5px 0" }}
        />
        <HvToggleButton
          aria-label="Dislike"
          notSelectedIcon={<Dislike />}
          selectedIcon={<DislikeSelected />}
          style={{ margin: "0 10px 5px 0" }}
        />
        <HvToggleButton
          aria-label="Light"
          notSelectedIcon={<LightOff />}
          selectedIcon={<LightOn />}
          style={{ margin: "0 10px 5px 0" }}
        />
        <HvToggleButton
          aria-label="Lock"
          notSelectedIcon={<Unlock />}
          selectedIcon={<Lock />}
          style={{ margin: "0 10px 5px 0" }}
          disabled
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
          "A sample showcasing a disabled toggle button combined with a tooltip.",
      },
    },
  },
  render: () => {
    return (
      <HvTooltip title="Can not turn the light on">
        <HvToggleButton disabled>
          <LightOff />
        </HvToggleButton>
      </HvTooltip>
    );
  },
};

export const Tooltip: StoryObj<HvToggleButtonProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "A sample showcasing a tooltip changing its content combined with the toggle button.",
      },
    },
  },
  render: () => {
    const [selected, setSelected] = useState(false);

    return (
      <HvTooltip title={selected ? "Turn off" : "Turn on"}>
        <HvToggleButton onClick={() => setSelected(!selected)}>
          {selected ? <LightOn /> : <LightOff />}
        </HvToggleButton>
      </HvTooltip>
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
        <ToggleEye selected={select} />
      </HvToggleButton>
    );
  },
};
