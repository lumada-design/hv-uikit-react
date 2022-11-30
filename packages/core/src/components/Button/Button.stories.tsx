import { StoryObj } from "@storybook/react";
import { HvBox } from "../..";
import { Button, ButtonProps } from "./Button";
import {
  Favorite,
  Refresh,
  Delete,
  MoreOptionsVertical,
  Play,
  Pause,
  Stop,
} from "@hitachivantara/uikit-icons";

export default { title: "Inputs/Button", component: Button };

export const AMain: StoryObj<ButtonProps> = {
  args: {
    children: "Button",
  },
};

export const Disabled = ({ onClick }) => {
  return (
    <HvBox sx={{ display: "flex", gap: 20 }}>
      <Button variant="primary" onClick={onClick} disabled>
        Primary
      </Button>
      <Button variant="primarySubtle" onClick={onClick} disabled>
        Primary Subtle
      </Button>
      <Button variant="primaryGhost" onClick={onClick} disabled>
        Primary Ghost
      </Button>
      <Button variant="secondary" onClick={onClick} disabled>
        Secondary
      </Button>
      <Button variant="secondarySubtle" onClick={onClick} disabled>
        Secondary Subtle
      </Button>
      <Button variant="secondaryGhost" onClick={onClick} disabled>
        Secondary Ghost
      </Button>
      <Button variant="semantic" onClick={onClick} disabled>
        Semantic
      </Button>
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
        <Button
          icon
          aria-label="Play"
          onClick={onClick}
          variant="secondaryGhost"
        >
          <Play />
        </Button>
        <Button
          icon
          aria-label="Pause"
          onClick={onClick}
          variant="secondaryGhost"
        >
          <Pause />
        </Button>
        <Button
          icon
          aria-label="Stop"
          onClick={onClick}
          variant="secondaryGhost"
        >
          <Stop />
        </Button>
      </HvBox>
      <HvBox sx={{ display: "flex", gap: 20, marginTop: 10 }}>
        <Button
          startIcon={<Play />}
          variant="secondaryGhost"
          aria-label="Play"
          onClick={onClick}
        >
          Play
        </Button>
        <Button
          startIcon={<Pause />}
          variant="secondaryGhost"
          aria-label="Pause"
          onClick={onClick}
        >
          Pause
        </Button>
        <Button
          startIcon={<Stop />}
          variant="secondaryGhost"
          aria-label="Stop"
          onClick={onClick}
        >
          Stop
        </Button>
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
      <Button
        variant="semantic"
        onClick={onClick}
        aria-label="Favorite"
        startIcon={<Favorite />}
      >
        Favorite
      </Button>
      <Button
        variant="semantic"
        onClick={onClick}
        startIcon={<Refresh />}
        aria-label="Refresh"
      >
        Refresh
      </Button>
      <Button
        variant="semantic"
        onClick={onClick}
        startIcon={<Delete />}
        aria-label="Delete"
      >
        Delete
      </Button>
      <Button
        variant="semantic"
        onClick={onClick}
        icon
        aria-label="More options"
      >
        <MoreOptionsVertical />
      </Button>
    </HvBox>
  );
};

Semantic.args = {
  onClick: clickAction,
};
