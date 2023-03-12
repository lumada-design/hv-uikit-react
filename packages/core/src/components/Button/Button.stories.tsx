import { StoryObj } from "@storybook/react";
import {
  Delete,
  Favorite,
  MoreOptionsVertical,
  Pause,
  Play,
  Refresh,
  Stop,
} from "@hitachivantara/uikit-react-icons";

import { HvBox, HvButton, HvButtonProps } from "components";

export default { title: "Inputs/Button", component: HvButton };

export const Main: StoryObj<HvButtonProps> = {
  args: {
    children: "Primary",
    selected: false,
  },
  argTypes: {
    classes: { control: { disable: true } },
    sx: { control: { disable: true } },
    icon: { control: { disable: true } },
    startIcon: { control: { disable: true } },
  },
};

export const Disabled = ({ onClick }) => {
  return (
    <HvBox sx={{ display: "flex", gap: 20 }}>
      <HvButton variant="primary" onClick={onClick} disabled>
        Primary
      </HvButton>
      <HvButton variant="primarySubtle" onClick={onClick} disabled>
        Primary Subtle
      </HvButton>
      <HvButton variant="primaryGhost" onClick={onClick} disabled>
        Primary Ghost
      </HvButton>
      <HvButton variant="secondary" onClick={onClick} disabled>
        Secondary
      </HvButton>
      <HvButton variant="secondarySubtle" onClick={onClick} disabled>
        Secondary Subtle
      </HvButton>
      <HvButton variant="secondaryGhost" onClick={onClick} disabled>
        Secondary Ghost
      </HvButton>
      <HvButton variant="semantic" onClick={onClick} disabled>
        Semantic
      </HvButton>
    </HvBox>
  );
};

const clickAction = () => {
  alert("This can be triggered");
};

Disabled.args = {
  onClick: clickAction,
};

export const Icons = ({ onClick }) => {
  return (
    <>
      <HvBox sx={{ display: "flex", gap: 20 }}>
        <HvButton
          icon
          aria-label="Play"
          onClick={onClick}
          variant="secondaryGhost"
        >
          <Play />
        </HvButton>
        <HvButton
          icon
          aria-label="Pause"
          onClick={onClick}
          variant="secondaryGhost"
        >
          <Pause />
        </HvButton>
        <HvButton
          icon
          aria-label="Stop"
          onClick={onClick}
          variant="secondaryGhost"
        >
          <Stop />
        </HvButton>
      </HvBox>
      <HvBox sx={{ display: "flex", gap: 20, marginTop: 10 }}>
        <HvButton
          startIcon={<Play />}
          variant="secondaryGhost"
          aria-label="Play"
          onClick={onClick}
        >
          Play
        </HvButton>
        <HvButton
          startIcon={<Pause />}
          variant="secondaryGhost"
          aria-label="Pause"
          onClick={onClick}
        >
          Pause
        </HvButton>
        <HvButton
          startIcon={<Stop />}
          variant="secondaryGhost"
          aria-label="Stop"
          onClick={onClick}
        >
          Stop
        </HvButton>
      </HvBox>
    </>
  );
};

Icons.args = {
  onClick: clickAction,
};

export const Semantic = ({ onClick }) => {
  return (
    <HvBox
      sx={{ display: "flex", gap: 20, backgroundColor: "#D3E3F6", padding: 20 }}
    >
      <HvButton
        variant="semantic"
        onClick={onClick}
        aria-label="Favorite"
        startIcon={<Favorite />}
      >
        Favorite
      </HvButton>
      <HvButton
        variant="semantic"
        onClick={onClick}
        startIcon={<Refresh />}
        aria-label="Refresh"
      >
        Refresh
      </HvButton>
      <HvButton
        variant="semantic"
        onClick={onClick}
        startIcon={<Delete />}
        aria-label="Delete"
      >
        Delete
      </HvButton>
      <HvButton
        variant="semantic"
        onClick={onClick}
        icon
        aria-label="More options"
      >
        <MoreOptionsVertical />
      </HvButton>
    </HvBox>
  );
};

Semantic.args = {
  onClick: clickAction,
};
